# =========================================================
# Whisper Tiny Fine-Tuning (Low-Memory Adaptive Version)
# Works even on RTX 3050 (4 GB) or CPU-only systems
# =========================================================

# !pip install -q --upgrade transformers datasets accelerate evaluate jiwer tensorboard

import os, gc, torch
from transformers import (
    WhisperFeatureExtractor, WhisperTokenizer, WhisperProcessor,
    WhisperForConditionalGeneration, Seq2SeqTrainer, Seq2SeqTrainingArguments
)
from datasets import load_dataset, Audio
from dataclasses import dataclass
from typing import Any, Dict, List, Union
import evaluate

# -----------------------------
# 1. Detect Device and VRAM
# -----------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"
if device == "cuda":
    gpu_props = torch.cuda.get_device_properties(0)
    total_vram_gb = gpu_props.total_memory / 1024**3
    print(f"🟢 GPU: {torch.cuda.get_device_name(0)} | {total_vram_gb:.2f} GB")
else:
    total_vram_gb = 0
    print("🟡 Using CPU")

# Adaptive parameters
if total_vram_gb <= 4:
    max_samples = 2       # keep tiny subset
    batch_size = 1
    grad_accum = 1
    max_steps = 10
elif total_vram_gb <= 8:
    max_samples = 50
    batch_size = 2
    grad_accum = 4
    max_steps = 100
else:
    max_samples = 200
    batch_size = 4
    grad_accum = 8
    max_steps = 500

print(f"🔧 Config -> samples={max_samples}, batch={batch_size}, grad_accum={grad_accum}, steps={max_steps}")

# -----------------------------
# 2. Load Dataset (subset)
# -----------------------------
print("📥 Loading dataset...")
ds = load_dataset("ekacare/eka-medical-asr-evaluation-dataset", "hi", split="test")
ds = ds.select(range(min(max_samples, len(ds))))
dataset = ds.train_test_split(test_size=0.5, seed=42)
dataset = dataset.cast_column("audio", Audio(sampling_rate=16000))

# Find transcription column
transcription_col = None
for c in ['text', 'transcription', 'sentence', 'transcript', 'question']:
    if c in dataset['train'].column_names:
        transcription_col = c
        break
if transcription_col is None:
    raise ValueError(f"Could not find transcription column; available: {dataset['train'].column_names}")
print(f"✅ Transcription column: {transcription_col}")

# -----------------------------
# 3. Load Model + Processor
# -----------------------------
model_name = "openai/whisper-tiny"
print(f"🔍 Loading model: {model_name}")
feature_extractor = WhisperFeatureExtractor.from_pretrained(model_name)
tokenizer = WhisperTokenizer.from_pretrained(model_name, language="Hindi", task="transcribe")
processor = WhisperProcessor.from_pretrained(model_name, language="Hindi", task="transcribe")
model = WhisperForConditionalGeneration.from_pretrained(model_name)
model.config.forced_decoder_ids = None
model.config.suppress_tokens = []
model.config.use_cache = False
model.gradient_checkpointing_enable()

# -----------------------------
# 4. Tokenize Text Labels
# -----------------------------
def tokenize_labels(batch):
    texts = batch[transcription_col]
    enc = tokenizer(texts, padding=False, truncation=True)
    batch["labels"] = enc["input_ids"]
    return batch

dataset = dataset.map(tokenize_labels, batched=True, remove_columns=[transcription_col])
print("✅ Tokenized labels, columns now:", dataset['train'].column_names)

# -----------------------------
# 5. Data Collator (compute audio on-the-fly)
# -----------------------------
@dataclass
class WhisperCollator:
    processor: Any
    def __call__(self, features: List[Dict[str, Any]]) -> Dict[str, torch.Tensor]:
        arrays = [f["audio"]["array"] for f in features]
        srs = [f["audio"]["sampling_rate"] for f in features]
        inputs = self.processor.feature_extractor(arrays, sampling_rate=srs[0], return_tensors="pt", padding=True)
        label_features = [{"input_ids": f["labels"]} for f in features]
        labels_batch = self.processor.tokenizer.pad(label_features, return_tensors="pt")
        labels = labels_batch["input_ids"].masked_fill(labels_batch["input_ids"] == tokenizer.pad_token_id, -100)
        return {"input_features": inputs["input_features"], "labels": labels}

collator = WhisperCollator(processor)

# -----------------------------
# 6. Metrics
# -----------------------------
wer_metric = evaluate.load("wer")
def compute_metrics(pred):
    ids = pred.predictions
    lbl = pred.label_ids
    lbl[lbl == -100] = tokenizer.pad_token_id
    pred_str = processor.tokenizer.batch_decode(ids, skip_special_tokens=True)
    lbl_str  = processor.tokenizer.batch_decode(lbl, skip_special_tokens=True)
    return {"wer": wer_metric.compute(predictions=pred_str, references=lbl_str) * 100}

# -----------------------------
# 7. Training Arguments
# -----------------------------
args = Seq2SeqTrainingArguments(
    output_dir="./whisper-tiny-test",
    per_device_train_batch_size=batch_size,
    gradient_accumulation_steps=grad_accum,
    per_device_eval_batch_size=1,
    fp16=(device=="cuda"),
    learning_rate=1e-5,
    max_steps=max_steps,
    logging_steps=1,
    eval_steps=max_steps//2,
    save_steps=max_steps//2,
    save_total_limit=1,
    eval_strategy="steps",
    predict_with_generate=True,
    dataloader_num_workers=0,
    remove_unused_columns=False,
    report_to=[],
)

# -----------------------------
# 8. Trainer
# -----------------------------
trainer = Seq2SeqTrainer(
    model=model,
    args=args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    data_collator=collator,
    compute_metrics=compute_metrics,
    tokenizer=processor.tokenizer,
)

# -----------------------------
# 9. Clear Memory & Train
# -----------------------------
gc.collect()
if device == "cuda": torch.cuda.empty_cache()
model.to(device)

print("🚀 Starting training ...")
trainer.train()

# -----------------------------
# 10. Save & Evaluate
# -----------------------------
trainer.save_model("./whisper-tiny-test-final")
processor.save_pretrained("./whisper-tiny-test-final")

print("🔎 Evaluating ...")
res = trainer.evaluate()
print("✅ Final eval WER:", res.get("eval_wer", res.get("wer", "N/A")))

# -----------------------------
# 11. Quick Inference Check
# -----------------------------
sample = dataset["test"][0]
inp = processor.feature_extractor(sample["audio"]["array"],
                                  sampling_rate=sample["audio"]["sampling_rate"],
                                  return_tensors="pt").input_features
inp = inp.to(device)
with torch.no_grad():
    gen_ids = model.generate(inp)
decoded = processor.tokenizer.batch_decode(gen_ids, skip_special_tokens=True)[0]
print("\n🎙️  Sample transcription:", decoded)
print("\n✅ Training pipeline complete.")

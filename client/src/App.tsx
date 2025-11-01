import { InteractiveGridPattern } from "./components/ui/interactive-grid-pattern";
import { cn } from "./utils/index";
import { Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <main className="relative min-h-screen overflow-y-auto">
      {/* Background grid */}
      <InteractiveGridPattern
        className={cn(
          // make sure it covers the entire viewport regardless of content
          "fixed inset-0 h-screen w-screen border-0 select-none",
          // subtle mask to fade at edges
          // make sure it covers the entire viewport regardless of content
          "fixed inset-0 h-screen w-screen border-0 select-none",
          // subtle mask to fade at edges
          "[mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]",
        )}
        squaresClassName="hover:fill-gray-400/40"
        squaresClassName="hover:fill-gray-400/40"
        width={60}
        height={42}
        squares={[26, 26]}
      />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-400/40 bg-white/60 px-3 py-1 text-xs backdrop-blur-sm dark:bg-black/30">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Doctor is now LIVE
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Get quick patient checkups using CuralynX
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-400/40 bg-white/60 px-3 py-1 text-xs backdrop-blur-sm dark:bg-black/30">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Doctor is now LIVE
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Get quick patient checkups using CuralynX
          </h1>
          <p className="mt-4 text-pretty text-base text-gray-600 sm:mt-6 sm:text-lg dark:text-gray-300">
            Curalynx listens, understands, and writes patient notes automatically—so doctors can focus on medicine, not paperwork.
          <p className="mt-4 text-pretty text-base text-gray-600 sm:mt-6 sm:text-lg dark:text-gray-300">
            Curalynx listens, understands, and writes patient notes automatically—so doctors can focus on medicine, not paperwork.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/get-started"
              className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Get Started
              Get Started
            </Link>
            <Link
              to="/learn-more"
              className="rounded-md border border-gray-400/40 bg-white/60 px-5 py-2.5 text-sm font-medium text-gray-900 backdrop-blur-sm transition hover:bg-white/80 dark:bg-black/30 dark:text-white dark:hover:bg-black/50"
              className="rounded-md border border-gray-400/40 bg-white/60 px-5 py-2.5 text-sm font-medium text-gray-900 backdrop-blur-sm transition hover:bg-white/80 dark:bg-black/30 dark:text-white dark:hover:bg-black/50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Why we stand out */}
      <section id="why" className="relative z-10 min-h-screen px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Why we stand out
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-700">
            Built for real clinical conversations in India—accurate, natural, and context-aware.
          </p>

          <div className="mt-10 grid gap-20  sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-xl border border-white/10 bg-gray-100/80 p-5 text-gray-900 shadow-sm backdrop-blur-sm">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/0">
                {/* microphone with people icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-900">
                  <path d="M12 1.5a3 3 0 00-3 3v6a3 3 0 006 0v-6a3 3 0 00-3-3z" />
                  <path d="M5.25 10.5a.75.75 0 01.75.75 6 6 0 0012 0 .75.75 0 011.5 0 7.5 7.5 0 01-6.75 7.464V21h2.25a.75.75 0 010 1.5h-6a.75.75 0 010-1.5H11.25v-2.286A7.5 7.5 0 014.5 11.25a.75.75 0 01.75-.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Listens Naturally</h3>
              <p className="mt-2 text-sm text-gray-700">
                Most transcription tools need users to pause, dictate, or speak robotically. Curalynx captures live doctor–patient conversations in a natural flow, distinguishing speakers and background noise automatically. Doctors can focus entirely on diagnosis and patient interaction instead of worrying about manual entry or voice commands.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-white/10 bg-gray-100/80 p-5 text-gray-900 shadow-sm backdrop-blur-sm">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/0">
                {/* document-text icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-900">
                  <path d="M19.5 2.25h-9A2.25 2.25 0 008.25 4.5v15A2.25 2.25 0 0010.5 21.75h9A2.25 2.25 0 0021.75 19.5v-15A2.25 2.25 0 0019.5 2.25zM6.75 6A.75.75 0 017.5 6.75v10.5a.75.75 0 01-1.5 0V6.75A.75.75 0 016.75 6z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Indic Fine-tuned</h3>
              <p className="mt-2 text-sm text-gray-700">
                Our models are fine-tuned on real Indic clinical dialogues — including English, Hindi, and mixed-language conversations. This means the system understands regional accents, medical terms pronounced in Indian ways, and context-specific phrases doctors actually use. The result is smoother, more accurate transcription for Indian healthcare settings.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-white/10 bg-gray-100/80 p-5 text-gray-900 shadow-sm backdrop-blur-sm">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/0">
                {/* brain icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-900">
                  <path fillRule="evenodd" d="M7.5 3.75A3.75 3.75 0 004.5 7.5v4.125a4.125 4.125 0 108.25 0V5.25a1.5 1.5 0 00-3 0v8.25a.75.75 0 11-1.5 0V3.75zM13.25 5.25a1.5 1.5 0 013 0v8.25a.75.75 0 001.5 0V7.5a3.75 3.75 0 10-3.75 3.75V7.5a2.25 2.25 0 112.25 2.25v3.75a4.125 4.125 0 11-3-3.945V5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Understands Context</h3>
              <p className="mt-2 text-sm text-gray-700">
                Instead of just converting speech to text, Curalynx interprets what’s being said. The model identifies symptoms, prescriptions, and clinical insights in real time, helping summarize the visit intelligently. This contextual awareness leads to structured, actionable notes rather than raw transcripts — making it genuinely useful for medical professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-white/60 backdrop-blur-sm dark:bg-black/30">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} Team BODMAS</p>
          <div className="mt-3 flex items-center justify-center gap-5 sm:mt-0">
            <a href="#" className="text-sm text-gray-600 underline-offset-4 hover:underline dark:text-gray-300">Privacy</a>
            <a href="#" className="text-sm text-gray-600 underline-offset-4 hover:underline dark:text-gray-300">Terms</a>
            <a href="#" className="text-sm text-gray-600 underline-offset-4 hover:underline dark:text-gray-300">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
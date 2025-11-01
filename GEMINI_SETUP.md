# Gemini AI Integration Setup

## Real-time Medication & Test Recommendations

This application uses Google's Gemini AI to analyze patient-doctor conversations in real-time and recommend appropriate medications and diagnostic tests.

### How It Works

1. **Live Transcription**: The system captures the doctor-patient conversation using Web Speech API
2. **Intelligent Processing**: Every 8 seconds, the transcript is sent to Gemini AI
3. **Smart Recommendations**: Gemini analyzes the conversation along with patient vitals and history
4. **Real-time Display**: Recommendations appear automatically in the Medications and Tests sections with AI badges

### Setup Instructions

1. **Get Your Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Configure Environment Variables**
   ```bash
   cd client
   cp .env.example .env
   ```

3. **Add Your API Key**
   - Open `client/.env`
   - Replace `your_actual_gemini_api_key_here` with your actual key:
     ```
     VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     ```

4. **Restart Development Server**
   ```bash
   npm run dev
   ```

### Features

- ✨ **AI-Powered Recommendations**: Gemini analyzes symptoms and suggests medications
- 🎯 **Context-Aware**: Uses patient age, medical history, and vitals
- ⏱️ **Real-time**: Processes conversation every 8 seconds
- 🔒 **Smart Deduplication**: Avoids recommending the same medication twice
- 📊 **Reason Display**: Shows why each medication/test is recommended
- 🎨 **Visual Indicators**: AI recommendations have special badges and styling

### Recommendation Format

**Medications include:**
- Name (e.g., "Paracetamol")
- Dosage (e.g., "500mg")
- Frequency (e.g., "twice-daily")
- Reason (brief explanation)

**Tests include:**
- Name (e.g., "Complete Blood Count")
- Reason (brief explanation)

### API Response Example

```json
{
  "medications": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "twice-daily",
      "reason": "For fever and headache relief"
    }
  ],
  "tests": [
    {
      "name": "Complete Blood Count",
      "reason": "To check for infection"
    }
  ]
}
```

### Troubleshooting

**No recommendations appearing?**
- Check if your API key is correctly set in `.env`
- Restart the dev server after adding the API key
- Check browser console for errors
- Ensure you're speaking into the microphone and transcription is working

**API errors?**
- Verify your API key is valid
- Check your Gemini API quota/limits
- Ensure you have internet connection

**Processing too slow/fast?**
- Adjust the timeout in `SessionContext.tsx` (currently 8000ms)
- Balance between frequent updates and API rate limits

### Privacy & Security

- API key is stored in `.env` (never committed to git)
- Add `.env` to `.gitignore`
- Patient data is only sent during active sessions
- No data is permanently stored by Gemini

### Notes

- The system waits 8 seconds between API calls to allow for natural conversation flow
- Recommendations are merged (not replaced) to build a comprehensive treatment plan
- The AI is conservative - it only recommends when symptoms clearly indicate a need

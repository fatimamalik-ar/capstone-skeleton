# Study Notes Summarizer

**Live demo:** https://capstone-skeleton-v2pk.vercel.app

## What it does
Students paste messy study notes and get back a short summary, 5 key points, and a 3-question quiz. It saves time when revising before exams.

## Setup (under 5 minutes)
1. Clone the repo: `git clone https://github.com/fatimamalik-ar/capstone-skeleton.git`
2. Get a free Gemini API key at https://aistudio.google.com/apikey
3. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY=your-key`
4. Run: `npm install && npm run dev`
5. Open http://localhost:3000

## Architecture
- `app/page.tsx`: Home page (client component). Holds the notes textarea, the loading and error states, and renders the results.
- `app/api/summarize/route.ts`: Server-side API route. Validates the input, calls the Gemini API, and returns structured JSON. The API key stays on the server and is never sent to the browser.
- `app/layout.tsx`: Shared layout and navigation.

## AI integration
The app uses Google Gemini (`gemini-flash-latest`) through the `@google/genai` SDK.
- **Prompt:** a system instruction tells the model to act as a study helper and reply only with JSON: `{summary, keyPoints[], quiz[{question, answer}]}`.
- **Why:** structured JSON output lets the UI show each part separately (summary, bullet list, quiz with hidden answers) instead of one block of text, so the AI solves a real problem rather than just echoing text.
- **Safety:** input is limited to 8000 characters and must be at least 20 characters.

## Error handling
If the AI call fails or returns invalid JSON, the user sees a clear message ("Could not summarize right now") instead of a crash. Empty or too-short input is rejected with a helpful message.

## Known limitations and future improvements
- No user accounts or saved history yet.
- Very long notes are truncated to 8000 characters.
- Possible next steps: PDF upload, flashcard mode, rate limiting.
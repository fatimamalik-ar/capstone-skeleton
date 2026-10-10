"use client";
import { useState } from "react";

type Result = {
  summary: string;
  keyPoints: string[];
  quiz: { question: string; answer: string }[];
};

export default function Home() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Study Notes Summarizer</h1>
      <p className="mt-2 text-gray-700">
        Paste your messy notes. Get a summary, key points, and a quick quiz.
      </p>

      <label htmlFor="notes" className="mt-6 block font-semibold">
        Your notes
      </label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={8}
        className="mt-2 w-full rounded border border-gray-500 p-3"
        placeholder="Paste your notes here..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-3 rounded bg-blue-700 px-5 py-2 font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      <div aria-live="polite">
        {error && (
          <p role="alert" className="mt-4 rounded bg-red-100 p-3 text-red-900">
            {error}
          </p>
        )}
        {result && (
          <section className="mt-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold">Summary</h2>
              <p>{result.summary}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">Key points</h2>
              <ul className="list-disc pl-6">
                {result.keyPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">Quiz</h2>
              <ol className="list-decimal pl-6">
                {result.quiz.map((q, i) => (
                  <li key={i}>
                    <p>{q.question}</p>
                    <details>
                      <summary className="cursor-pointer text-blue-800">
                        Show answer
                      </summary>
                      <p>{q.answer}</p>
                    </details>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
import Summarizer from "./Summarizer";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Study Notes Summarizer</h1>
      <p className="mt-2 text-gray-700">
        Paste your messy notes. Get a summary, key points, and a quick quiz.
      </p>
      <Summarizer />
    </main>
  );
}
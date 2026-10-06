type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default async function Health() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch health check data.");
  }

  const todo = (await response.json()) as Todo;

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Health</h1>
      <p className="mt-3 text-slate-600">Live server-fetched health check data.</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border-l-2 border-teal-700 pl-4">
          <dt className="text-sm font-medium text-slate-500">ID</dt>
          <dd className="mt-1 text-lg font-semibold">{todo.id}</dd>
        </div>
        <div className="border-l-2 border-teal-700 pl-4">
          <dt className="text-sm font-medium text-slate-500">Title</dt>
          <dd className="mt-1 break-words text-lg font-semibold">{todo.title}</dd>
        </div>
        <div className="border-l-2 border-teal-700 pl-4">
          <dt className="text-sm font-medium text-slate-500">Completed</dt>
          <dd className="mt-1 text-lg font-semibold">{todo.completed ? "Yes" : "No"}</dd>
        </div>
      </dl>
    </section>
  );
}
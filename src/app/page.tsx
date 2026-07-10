import { createUser } from "@/actions/action";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Welcome To My Page
        </h1>

        <form action={createUser} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full rounded border p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
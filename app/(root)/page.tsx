import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore our collection of innovative projects and discover what we've
          been working on. From cutting-edge technologies to creative solutions,
          find everything you need to know about our work.
        </p>
        <Link
          href="/projects"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          View Projects
        </Link>
      </div>
    </main>
  );
}

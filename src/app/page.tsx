import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Mi blog</h1>
        <p className="mt-4 text-gray-600">
          Frontend conectado a la API de 0xPhantom
        </p>

        <Link
          href="/blog"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Ir al blog
        </Link>
      </div>
    </main>
  )
}

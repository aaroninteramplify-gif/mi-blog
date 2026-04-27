import Link from "next/link"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Recetillas
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Inicio
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Blog
          </Link>
<Link
  href="/sobre-nosotros"
  className="text-sm font-medium text-zinc-300 transition hover:text-white"
>
  Sobre nosotros
</Link>

<Link
  href="/contacto"
  className="text-sm font-medium text-zinc-300 transition hover:text-white"
>
  Contacto
</Link>
        </nav>

        <Link
          href="/blog"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Ver recetas
        </Link>
      </div>
    </header>
  )
}

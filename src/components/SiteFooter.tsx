import Link from "next/link"

const categories = [
  "Recetas de ensaladas",
  "Recetas de pasta",
  "Recetas de arroz",
  "Recetas de carne",
  "Recetas de pescado",
  "Recetas de postres",
]

export default function SiteFooter() {
  return (
    <footer
      id="contacto"
      className="mt-20 border-t border-zinc-800 bg-zinc-950 text-zinc-300"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-white">Recetillas</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Tu rincón de cocina casera: recetas fáciles, paso a paso y con
            ingredientes cotidianos.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Navegación
          </h4>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="/" className="block hover:text-white">
              Inicio
            </Link>
            <Link href="/blog" className="block hover:text-white">
              Blog
            </Link>
            <a href="#sobre" className="block hover:text-white">
              Sobre nosotros
            </a>
            <a href="#contacto" className="block hover:text-white">
              Contacto
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Categorías
          </h4>
          <div className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <p key={category}>{category}</p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Legal
          </h4>
          <div className="mt-4 space-y-2 text-sm">
            <p>Política de privacidad</p>
            <p>Cookies</p>
            <p>Aviso legal</p>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 px-4 py-4 text-center text-sm text-zinc-500">
        © 2026 Recetillas. Todos los derechos reservados.
      </div>
    </footer>
  )
}

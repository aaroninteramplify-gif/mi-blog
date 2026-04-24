import Link from "next/link"
import PostCard from "@/components/PostCard"
import { getPosts } from "@/lib/phantom"

export const revalidate = 60

const advantages = [
  {
    title: "Recetas fáciles",
    text: "Platos pensados para cocinar sin complicaciones, con pasos claros y resultados reales.",
  },
  {
    title: "Ingredientes sencillos",
    text: "Nada raro ni imposible de encontrar: cocina práctica para el día a día.",
  },
  {
    title: "Inspiración constante",
    text: "Nuevas ideas para comidas, cenas, postres y recetas caseras que siempre funcionan.",
  },
]

const tips = [
  "Lee la receta completa antes de empezar.",
  "Prepara todos los ingredientes antes de cocinar.",
  "Da tu toque personal sin miedo.",
  "Cocina con calma: el proceso también importa.",
]

export default async function HomePage() {
  const result = await getPosts(1).catch(() => ({
    data: [],
    meta: { current_page: 1, total_pages: 1, total: 0, per_page: 12 },
  }))

  const featuredPosts = result.data.slice(0, 3)

  return (
    <main>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Cocina real, sin dramas
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
              Recetas fáciles para disfrutar cocinando en casa
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Descubre platos caseros, rápidos y explicados paso a paso. Una web
              pensada para ayudarte a cocinar mejor, con ideas sencillas y
              recetas que sí apetece repetir.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Explorar recetas
              </Link>
              <a
                href="#sobre"
                className="rounded-full border border-zinc-700 px-6 py-3 font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
              >
                Saber más
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/20">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-zinc-950 p-5">
                <p className="text-sm text-zinc-500">Contenido</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Recetas paso a paso
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-950 p-5">
                <p className="text-sm text-zinc-500">Enfoque</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Cocina sencilla
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-950 p-5 sm:col-span-2">
                <p className="text-sm text-zinc-500">Objetivo</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Convertir cada comida en una idea clara, práctica y apetecible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-zinc-950 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Sobre la web
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Una web pensada para cocinar mejor cada día
            </h2>
            <p className="mt-4 text-zinc-400">
              Igual que en una web editorial de recetas, la idea no es solo
              listar posts, sino ofrecer una experiencia clara, útil y
              presentable para un cliente final.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Destacadas
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Algunas recetas para empezar
              </h2>
            </div>

            <Link
              href="/blog"
              className="text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Ver todas →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Tips rápidos
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Pequeños trucos para que todo salga mejor
            </h2>
        <p className="mt-4 text-zinc-400">
         Inspirado en una web editorial de recetas como{" "}
         <a
          href="https://recetillas.app/"
          target="_blank"
          rel="noreferrer"
         className="text-blue-400 underline"
          >
         Recetillas
         </a>
         , este bloque ayuda a que la home se sienta editorial y útil, no solo promocional.
          </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <ul className="space-y-4">
              {tips.map((tip) => (
                <li
                  key={tip}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 text-zinc-300"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Empieza hoy
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white">
            Explora nuevas recetas y empieza a cocinar mejor
          </h2>
          <p className="mt-4 text-zinc-400">
            Encuentra inspiración, guarda ideas y descubre platos fáciles con un
            diseño más cuidado y presentable.
          </p>

          <Link
            href="/blog"
            className="mt-8 inline-flex rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Ir al blog
          </Link>
        </div>
      </section>
    </main>
  )
}

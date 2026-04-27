import { getPage } from "@/lib/phantom"
import { notFound } from "next/navigation"
import EditorJsRenderer from "@/components/EditorJsRenderer"

export const revalidate = 60

export default async function ContactoPage() {
  const page = await getPage("contacto").catch(() => null)

  if (!page) notFound()

  return (
    <main className="bg-zinc-950">
      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Contacto
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white">
            {page.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-2xl bg-white p-6 text-zinc-900 shadow-sm md:p-8">
          <EditorJsRenderer content={page.content_html} />
        </article>
      </section>
    </main>
  )
}

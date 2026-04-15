import { getPost, getPosts } from "@/lib/phantom"
import { notFound } from "next/navigation"
import EditorJsRenderer from "@/components/EditorJsRenderer"

export const revalidate = 60

export async function generateStaticParams() {
  const result = await getPosts().catch(() => ({ data: [] }))
  return result.data.slice(0, 100).map((p) => ({ slug: p.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  const post = await getPost(slug).catch(() => null)

  if (!post) notFound()

  return (
    <main className="min-h-screen w-full bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {post.featured_image_url && (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="mb-8 aspect-video w-full rounded-2xl object-cover"
          />
        )}

        <h1 className="mb-4 text-4xl font-bold leading-tight text-white">
          {post.title}
        </h1>

        <p className="mb-8 text-sm text-zinc-400">
          {post.author?.name && <span>{post.author.name} · </span>}
          {new Date(post.published_at).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <EditorJsRenderer content={post.content_html} />
        </section>
      </div>
    </main>
  )
}

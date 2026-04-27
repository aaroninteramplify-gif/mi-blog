import Link from "next/link"
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/phantom"
import { notFound } from "next/navigation"
import EditorJsRenderer from "@/components/EditorJsRenderer"
import PostCard from "@/components/PostCard"

export const revalidate = 60

export async function generateStaticParams() {
  const result = await getAllPosts().catch(() => [])
  return result.slice(0, 100).map((post) => ({ slug: post.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  const post = await getPost(slug).catch(() => null)
  const allPosts = await getAllPosts().catch(() => [])
  const relatedPosts = await getRelatedPosts(slug).catch(() => [])

  if (!post) notFound()


  return (
    <main className="bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex text-sm font-medium text-zinc-400 transition hover:text-white"
        >
          ← Volver al blog
        </Link>

        {post.featured_image_url && (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="mb-8 aspect-video w-full rounded-2xl object-cover"
          />
        )}

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Receta destacada
        </p>

        <h1 className="mt-3 text-4xl font-bold leading-tight text-white">
          {post.title}
        </h1>

        <p className="mt-4 text-sm text-zinc-400">
          {post.author?.name && <span>{post.author.name} · </span>}
          {new Date(post.published_at).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <EditorJsRenderer content={post.content_html} />
        </section>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 border-t border-zinc-800 pt-6">
            <p className="mb-3 text-sm text-zinc-400">Tags:</p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className="border-t border-zinc-800 bg-zinc-900 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Artículos relacionados
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  Recetas similares
                </h2>
              </div>

              <Link
                href="/blog"
                className="text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                Ver más →
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

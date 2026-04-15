import Link from "next/link"
import PostCard from "@/components/PostCard"
import { getPosts } from "@/lib/phantom"

export const revalidate = 60

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page ?? "1")

  const result = await getPosts(currentPage).catch(() => ({
    data: [],
    meta: { current_page: 1, total_pages: 1, total: 0, per_page: 12 },
  }))

  const totalPages = result.meta.total_pages

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">Blog</h1>

      {result.data.length === 0 && (
        <p className="text-zinc-400">No hay artículos disponibles.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
            >
              ←
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              className={`rounded-md px-3 py-2 text-sm transition ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {page}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
            >
              →
            </Link>
          )}
        </nav>
      )}
    </main>
  )
}

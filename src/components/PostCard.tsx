import Link from "next/link"
import type { PostSummary } from "@/lib/phantom"

interface Props {
  post: PostSummary
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-zinc-700 bg-black transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
    >
      <div className="overflow-hidden">
        {post.featured_image_url && (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-4">
        <h2 className="line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-500">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
            {post.excerpt}
          </p>
        )}

        <p className="mt-3 text-xs text-zinc-500">
          {new Date(post.published_at).toLocaleDateString("es-ES")}
        </p>

        <p className="mt-4 text-sm font-medium text-blue-500 opacity-0 transition duration-300 group-hover:opacity-100">
          Saber más →
        </p>
      </div>
    </Link>
  )
}

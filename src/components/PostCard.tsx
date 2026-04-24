import Link from "next/link"
import type { PostSummary } from "@/lib/phantom"

interface Props {
  post: PostSummary
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-black transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/30"
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

      <div className="p-5">
        <h2 className="line-clamp-2 text-xl font-semibold leading-snug text-white transition-colors group-hover:text-blue-400">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-400">
            {post.excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            {new Date(post.published_at).toLocaleDateString("es-ES")}
          </p>

          <p className="text-sm font-medium text-blue-400 opacity-0 transition duration-300 group-hover:opacity-100">
            Saber más →
          </p>
        </div>
      </div>
    </Link>
  )
}

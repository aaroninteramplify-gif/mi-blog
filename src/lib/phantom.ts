const BASE = process.env.PHANTOM_API_URL!
const TOKEN = process.env.PHANTOM_API_TOKEN!

export interface PostSummary {
  id: string
  slug: string
  title: string
  excerpt?: string
  featured_image_url?: string
  published_at: string
  author?: {
    name?: string
  }
}

export interface PostDetail extends PostSummary {
  content_html: string
}

export interface PostDetailResponse {
  data: PostDetail
}

export interface PostsResponse {
  data: PostSummary[]
  meta: {
    current_page: number
    total_pages: number
    total: number
    per_page: number
  }
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status} — ${path}`)
  }

  return res.json() as Promise<T>
}

export function getPosts(page: number = 1): Promise<PostsResponse> {
  return apiFetch<PostsResponse>(`/posts?page=${page}`)
}

export async function getPost(slug: string): Promise<PostDetail> {
  const result = await apiFetch<PostDetailResponse>(`/posts/${slug}`)
  return result.data
}

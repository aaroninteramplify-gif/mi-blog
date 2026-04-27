const BASE = process.env.PHANTOM_API_URL!
const TOKEN = process.env.PHANTOM_API_TOKEN!

export interface RelatedPostsResponse {
  data: PostSummary[]
}

export async function getRelatedPosts(slug: string): Promise<PostSummary[]> {
  const result = await apiFetch<RelatedPostsResponse>(`/posts/${slug}/related`)
  return result.data
}

export interface PostAuthor {
  name: string
  slug?: string
  avatar_url?: string
}

export interface Category {
  id: number
  slug: string
  name: string
}

export interface Tag {
  name: string
  slug: string
}

export interface PostSummary {
  id: number
  slug: string
  title: string
  excerpt?: string
  featured_image_url?: string
  published_at: string
  author?: PostAuthor
  categories?: Category[]
  tags?: Tag[]
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

export async function getAllPosts(): Promise<PostSummary[]> {
  const firstPage = await getPosts(1)

  const remainingPages = Array.from(
    { length: firstPage.meta.total_pages - 1 },
    (_, index) => index + 2
  )

  const remainingResults = await Promise.all(
    remainingPages.map((page) => getPosts(page))
  )

  return [
    ...firstPage.data,
    ...remainingResults.flatMap((result) => result.data),
  ]
}

export interface CmsPage {
  title: string
  slug: string
  content_html: string
  content_format?: "html" | "editorjs"
  meta_title?: string
  meta_description?: string
}

export interface CmsPageResponse {
  data: CmsPage
}

export function getPage(slug: string): Promise<CmsPage> {
  return apiFetch<CmsPageResponse>(`/pages/${slug}`).then((res) => res.data)
}

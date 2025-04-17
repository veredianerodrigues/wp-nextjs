// src/app/page.js
import { fetcher } from '@/api'

export default async function HomePage() {
  const posts = await fetcher(`${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`)

  return (
    <div>
      <h2>Posts Recentes</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`}>{post.title.rendered}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

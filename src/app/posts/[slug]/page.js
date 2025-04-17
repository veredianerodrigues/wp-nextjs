import { fetcher } from '@/api';

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.WP_API_URL}/posts`)
    .then((r) => r.json());
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const post = await fetcher(`${process.env.WP_API_URL}/posts?slug=${params.slug}&_embed`)
    .then((data) => data[0]);

  return (
    <article>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}

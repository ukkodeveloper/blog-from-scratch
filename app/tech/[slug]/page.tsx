import { allTechPosts } from '@/.contentlayer/generated';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  console.log(allTechPosts);
  return allTechPosts.map((post) => post.slug);
}

export default function Page({ params: { slug } }: PageProps) {
  return <div>{slug}</div>;
}

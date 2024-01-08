import { allTechPosts } from '@/.contentlayer/generated';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allTechPosts.map((post) => post.title);
}

export default function Page({ params: { slug } }: PageProps) {
  return <div>{slug}</div>;
}

import { allTechPosts } from '@/.contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

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
  const post = allTechPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  const mdxComponents: MDXComponents = {
    a: ({ href, children }) => (
      <Link className="text-red-700" href={href ?? ''}>
        {children}
      </Link>
    ),
  };

  return <MDXContent components={mdxComponents} />;
}

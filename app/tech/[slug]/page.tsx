import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { getPostBySlug, sortedPosts } from '@/lib/posts';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return sortedPosts.map((post) => post.slug);
}

export default function Page({ params: { slug } }: PageProps) {
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  const mdxComponents: MDXComponents = {
    a: ({ href, children }) => <Link href={href ?? ''}>{children}</Link>,
  };

  return <MDXContent components={mdxComponents} />;
}

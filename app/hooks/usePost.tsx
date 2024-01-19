import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { getPostBySlug, getPostsBySeries } from '@/lib/utils/posts';
import { notFound } from 'next/navigation';
import useMDX from '@/app/hooks/useMDX';

const usePost = (slugRaw: string) => {
  const slug = decodeURI(slugRaw);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { MDXComponent } = useMDX(post.body.code);

  const { series } = post;

  const postsInSeries = getPostsBySeries(series);
  const currentIndex = postsInSeries.findIndex(
    (postItem) => post.slug == postItem.slug
  );

  const nextPost = postsInSeries[currentIndex + 1];
  const prevPost = postsInSeries[currentIndex - 1];

  const seriesImg = `/images/series/${series}.png`;

  return {
    MDXComponent,
    post,
    prevPost,
    nextPost,
    seriesImg,
  };
};

export default usePost;

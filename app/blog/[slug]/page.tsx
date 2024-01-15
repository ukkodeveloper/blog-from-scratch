import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

import { getPostBySlug, getPostsBySeries, sortedPosts } from '@/lib/posts';
import Txt from '@/components/Txt';
import Tag from '@/components/Tag';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

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

  // todo: Refactor
  const tags = post.tags;
  const series = post.series;
  const posts = getPostsBySeries(series);
  const currentIndex = posts.findIndex(
    (postItem) => post.slug == postItem.slug
  );
  const nextPost = posts[currentIndex + 1];
  const prevPost = posts[currentIndex - 1];

  const nextIdx = currentIndex + 1;
  const prevIndex = currentIndex - 1;

  const seriesImage = '/images/image_life.png';
  const author = '우코';
  const githubLink = 'https://github.com/ukkodeveloper';
  const mailLink = 'mailto:ukkodeveloper@gmail.com';

  return (
    <div className="md:grid md:grid-cols-4 xl:grid-cols-4">
      <section className="prose pr-6 md:col-span-3 xl:col-span-3">
        <MDXContent components={mdxComponents} />
      </section>
      <div className="md:min-h-screen">
        <aside className="top-10 flex p-2 md:sticky md:top-14 md:col-span-1 md:block md:space-y-4">
          <Box title="AUTHOR">
            <div className="flex items-end space-x-2 ">
              <div className="h-8 w-8 rounded-full bg-neutral-800 " />
              <div className="h-8 w-8 rounded-full bg-neutral-800 " />
              <div className="h-8 w-8 rounded-full bg-neutral-800 " />
            </div>
            <a href={githubLink}>{`@ ${author}`}</a>
          </Box>
          <Box title="TAGS">
            <div className="flex flex-wrap ">
              {tags.map((tag) => (
                <Tag key={tag} name={tag} link={`/tags/${tag}`} />
              ))}
            </div>
          </Box>
          <Box title="PREV/NEXT">
            <div className="relative w-full pb-[40%]">
              <Image
                src={seriesImage}
                alt="series"
                layout="fill"
                objectFit="cover"
                className="rounded-md opacity-80"
              />
              <Txt
                color="white"
                fontSize="md"
                className="spacing absolute inset-0 flex items-center justify-center tracking-wider"
              >
                안녕하세요
              </Txt>
            </div>
            <div className="flex min-h-16 flex-col items-start justify-center  rounded-sm bg-neutral-100 p-2">
              {prevPost ? (
                <Link href="/" className="space-y-2">
                  <ArrowLeftIcon className="h-5 w-5 rounded-sm border border-black bg-white p-0.5 " />
                  <Txt fontSize="sm">{prevPost.title}</Txt>
                </Link>
              ) : (
                <Txt fontSize="sm">이전 페이지가 없습니다.</Txt>
              )}
            </div>
            <div className="flex min-h-16 flex-col items-end justify-center space-y-2 rounded-sm bg-neutral-100 p-2">
              {nextPost ? (
                <Link href="/" className="space-y-2">
                  <ArrowRightIcon className="ml-auto h-5 w-5 rounded-sm border border-black bg-white p-0.5" />
                  <Txt fontSize="sm">{nextPost.title}</Txt>
                </Link>
              ) : (
                <Txt fontSize="sm">이전 페이지가 없습니다.</Txt>
              )}
            </div>
            <Link href="/"></Link>
          </Box>
        </aside>
      </div>
    </div>
  );
}

const Box = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="m-2 flex flex-1 flex-col space-y-2 rounded-md bg-neutral-200 p-2">
      <p className="border border-b-neutral-400 text-xs text-neutral-400">
        {title}
      </p>
      {children}
    </div>
  );
};

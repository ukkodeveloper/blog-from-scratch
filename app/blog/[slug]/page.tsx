import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

import ImageMDX from '@/components/Image';

import { getPostBySlug, getPostsBySeries, postList } from '@/lib/posts';
import Txt from '@/components/Txt';
import Tag from '@/components/Tag';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return postList.map(({ slug }) => ({
    slug,
  }));
}

export default function Page({ params: { slug } }: PageProps) {
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  const mdxComponents: MDXComponents = {
    img: ({ src, ...rest }) => {
      if (!src) return;
      const srcWithSlash = src.startsWith('/') ? src : `\/${src}`;

      return <img src={srcWithSlash} {...rest} />;
    },
    a: ({ href, children }) => <Link href={href ?? ''}>{children}</Link>,
  };
  // todo: Refactor
  const { tags, series, image } = post;

  const postsInSeries = getPostsBySeries(series);
  const currentIndex = postsInSeries.findIndex(
    (postItem) => post.slug == postItem.slug
  );

  const nextPost = postsInSeries[currentIndex + 1];
  const prevPost = postsInSeries[currentIndex - 1];

  const author = '우코';
  const githubLink = 'https://github.com/ukkodeveloper';

  const seriesImg = `/images/series/${series.toLowerCase()}.png`;

  return (
    <div className="divide divide-y-2">
      <aside className="relative mb-20 mt-10 animate-slideDown p-10 pb-0 md:grid md:grid-cols-4">
        <Image
          src={image}
          alt="post image"
          fill
          className="-z-10 rounded-md object-cover opacity-50 backdrop-brightness-50"
        />
        <div className="md:col-span-3">
          <Txt fontSize="2xl" as="h1" className="tracking-wider">
            {post.title}
          </Txt>
          <Txt
            fontSize="md"
            className="my-8 inline-block rounded-md border-2 border-black px-2 py-1"
          >
            {post.date.split('T')[0]}
          </Txt>
        </div>
      </aside>

      <div className="py-12 md:grid md:grid-cols-4 xl:grid-cols-4">
        <section className="prose md:col-span-3 md:pr-4 xl:col-span-3">
          <MDXContent components={mdxComponents} />
        </section>

        <div className="animate-slideDown md:min-h-screen md:pl-4">
          <aside className="top-10 mt-20 flex flex-col space-y-4 py-2 md:sticky md:top-14 md:col-span-1 md:mt-0 md:block ">
            <Box title="TAGS">
              <div className="flex flex-wrap ">
                {tags.map((tag) => (
                  <Tag key={tag} name={tag} link={`/tags/${tag}`} />
                ))}
              </div>
            </Box>
            <Box title="PREV/NEXT">
              <div className="relative hidden w-full pb-[40%] md:block">
                <Image
                  src={seriesImg}
                  alt="series"
                  fill
                  className="rounded-md object-cover opacity-80"
                />
                <Link href={`/series/${series.toLowerCase()}`}>
                  <Txt
                    color="white"
                    fontSize="md"
                    className="spacing absolute inset-0 flex items-center justify-center tracking-wider backdrop-brightness-75"
                  >
                    {series}
                  </Txt>
                </Link>
              </div>
              <div className="flex min-h-16 flex-col items-center justify-center rounded-sm bg-neutral-200 p-2">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="flex gap-2">
                    <ArrowLeftIcon className="aboslute h-5 w-5 rounded-sm border border-black bg-white" />
                    <Txt fontSize="sm" className="flex-1">
                      {prevPost.title}
                    </Txt>
                  </Link>
                ) : (
                  <Txt fontSize="sm">이전 글이 없습니다.</Txt>
                )}
              </div>
              <div className="flex min-h-16 items-center justify-center rounded-sm bg-neutral-200 p-2">
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="flex items-center gap-2"
                  >
                    <Txt fontSize="sm" className="flex-1">
                      {nextPost.title}
                    </Txt>
                    <ArrowRightIcon className="aboslute h-5 w-5 rounded-sm border border-black bg-white" />
                  </Link>
                ) : (
                  <Txt fontSize="sm">다음 글이 없습니다.</Txt>
                )}
              </div>
              <Link href="/"></Link>
            </Box>
          </aside>
        </div>
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
    <div className="flex flex-1 flex-col space-y-2 rounded-md bg-neutral-100 p-2 shadow-md md:m-0 md:my-2">
      <p className="border-b-neutral-400 text-xs text-neutral-400">{title}</p>
      {children}
    </div>
  );
};

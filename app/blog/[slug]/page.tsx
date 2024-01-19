import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { getPostBySlug, getPostsBySeries, postList } from '@/lib/utils/posts';
import Txt from '@/components/Txt';
import Badge from '@/components/Badge';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import BadgesContainer from '@/components/BadgesContainer';
import Box from '@/components/Box';
import usePost from '@/app/hooks/usePost';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return postList.map(({ slug }) => slug);
}

export default function Page({ params }: PageProps) {
  const { MDXComponent, post, seriesImg, prevPost, nextPost } = usePost(
    params.slug
  );

  const { tags, image, series } = post;

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
          <MDXComponent />
        </section>

        <div className="animate-slideDown md:min-h-screen md:pl-4">
          <aside className="top-10 mt-20 flex flex-col space-y-4 py-2 md:sticky md:top-14 md:col-span-1 md:mt-0 md:block ">
            <Box title="TAGS">
              <BadgesContainer>
                {tags.map((tag) => (
                  <Badge key={tag} variant="TAG" name={tag} />
                ))}
              </BadgesContainer>
            </Box>
            <Box title="PREV/NEXT">
              <div className="relative hidden w-full rounded-md pb-[40%]">
                <Image
                  src={seriesImg}
                  alt="series"
                  fill
                  className="object-cover opacity-80"
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
              <div className="group  flex min-h-16 flex-col items-center justify-center rounded-sm bg-neutral-200 p-2 hover:bg-neutral-300">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeftIcon className="aboslute group-hover:bg-neutral- h-5 w-5 rounded-full border border-black bg-neutral-100" />
                    <Txt fontSize="sm" className="flex-1">
                      {prevPost.title}
                    </Txt>
                  </Link>
                ) : (
                  <Txt fontSize="sm">이전 글이 없습니다.</Txt>
                )}
              </div>
              <div className="group flex min-h-16 items-center justify-center rounded-sm bg-neutral-200 p-2 hover:bg-neutral-300">
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="flex items-center gap-2"
                  >
                    <Txt fontSize="sm" className="flex-1">
                      {nextPost.title}
                    </Txt>
                    <ArrowRightIcon className="aboslute h-5 w-5 rounded-full border border-black bg-neutral-100" />
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

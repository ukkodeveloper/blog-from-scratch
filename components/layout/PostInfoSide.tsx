import Box from '@/components/Box';
import BadgesContainer from '@/components/BadgesContainer';
import Badge from '@/components/Badge';
import Image from 'next/image';
import Link from 'next/link';
import Txt from '@/components/Txt';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import type { Post } from '@/.contentlayer/generated';

interface PostInfoSideProps {
  prevPost: Post;
  nextPost: Post;
  tags: string[];
  series: string;
  seriesImg: string;
}

const PostInfoSide = ({
  prevPost,
  nextPost,
  tags,
  series,
  seriesImg,
}: PostInfoSideProps) => {
  return (
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
              fontSize="md"
              className="spacing absolute inset-0 flex items-center justify-center tracking-wider backdrop-brightness-75"
            >
              {series}
            </Txt>
          </Link>
        </div>
        <div className="group flex min-h-16 flex-col items-center justify-center rounded-sm bg-neutral-200 p-2 hover:bg-neutral-300">
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
  );
};

export default PostInfoSide;

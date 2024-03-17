import BadgesContainer from '@/components/BadgesContainer';
import Badge from '@/components/Badge';
import Link from 'next/link';
import Txt from '@/components/Txt';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import type { Post } from '@/.contentlayer/generated';
import type { ReactNode } from 'react';

interface PostInfoSideProps {
  prevPost: Post;
  nextPost: Post;
  tags: string[];
  series: string;
}

const PostInfoSide = ({
  prevPost,
  nextPost,
  tags,
  series,
}: PostInfoSideProps) => {
  return (
    <aside className="top-10 flex animate-slideDown flex-col space-y-8 rounded-xl bg-neutral-100 p-4">
      <section className="space-y-2">
        <SubTitle>Tags</SubTitle>
        <BadgesContainer>
          {tags.map((tag) => (
            <Badge key={tag} variant="TAG" name={tag} />
          ))}
        </BadgesContainer>
      </section>

      <section className="space-y-2">
        <SubTitle>Series</SubTitle>
        <BadgesContainer>
          <Badge variant="SERIES" name={series} />
        </BadgesContainer>
      </section>

      <section className="space-y-2">
        <SubTitle>이어지는 글</SubTitle>
        <div className="flex w-full space-x-4">
          <div className="flex min-h-16 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl bg-neutral-200 px-4 py-2 text-sm hover:bg-neutral-300">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <Txt className="flex-1">{prevPost.title}</Txt>
              </Link>
            ) : (
              <Txt color="neutral">이전 글이 없습니다.</Txt>
            )}
          </div>
          <div className="flex min-h-16 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl bg-neutral-200 px-4 py-2 text-sm hover:bg-neutral-300">
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="flex items-center gap-2 "
              >
                <Txt className="flex-1">{nextPost.title}</Txt>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            ) : (
              <Txt color="neutral">다음 글이 없습니다.</Txt>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default PostInfoSide;

function SubTitle({ children }: { children: ReactNode }) {
  return <p className="text-sm text-neutral-500">{children}</p>;
}

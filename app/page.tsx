import Txt from '@/components/Txt';
import { postList, seriesList, tagList } from '@/lib/utils/posts';
import PlainPostList from '@/components/PlainPostList';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';

import Badge from '@/components/Badge';
import BadgesContainer from '@/components/BadgesContainer';
import Profile from '@/components/Profile';

export default function Home() {
  const recentPosts = postList.slice(0, 3);

  return (
    <div className="relative mb-10 mt-4 space-y-6">
      <section className="space-y-2">
        <Txt fontSize="xl" as="h1">
          쉽게 쓰여진 글
        </Txt>
        <Txt color="neutral">
          머릿 속에 나부끼는 코드와 고민을 정리하는 공간입니다.
        </Txt>
      </section>

      <Profile />

      <section className="space-y-4 rounded-xl bg-neutral-100 p-4">
        <Txt>Latest</Txt>
        <PlainPostList posts={recentPosts} />
        <div className="flex w-full justify-end">
          <Link
            href={'/series'}
            className="flex justify-center rounded-2xl bg-neutral-200 px-2 py-2 pl-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
          >
            <span className="flex-1">더 보기</span>
            <ChevronRightIcon width="18" className="ml-1" />
          </Link>
        </div>
      </section>

      <section className="space-y-4 rounded-xl bg-neutral-100 p-4">
        <Txt>Series</Txt>
        <BadgesContainer>
          {seriesList.map((curSeries) => (
            <Badge key={curSeries} name={curSeries} variant="SERIES" />
          ))}
        </BadgesContainer>
        <br />
        <Txt>Tags</Txt>
        <BadgesContainer>
          {tagList.map((curSeries) => (
            <Badge key={curSeries} name={curSeries} variant="TAG" />
          ))}
        </BadgesContainer>
      </section>
    </div>
  );
}

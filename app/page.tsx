import PostCard from '@/components/PostCard';
import Image from 'next/image';
import hero from '../public/static/hero.png';
import heroHovered from '../public/static/hero-hovered.png';
import Txt from '@/components/Txt';
import SeriesCard from '@/components/SeriesCard';
import { postList, seriesList, tagList } from '@/lib/utils/posts';
import Title from '@/components/Title';
import PlainPostList from '@/components/PlainPostList';
import Link from 'next/link';
import { LinkIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import BadgeListLayout from '@/components/layout/BadgeListLayout';
import Badge from '@/components/Badge';
import BadgesContainer from '@/components/BadgesContainer';

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

      <section className="mb-16 space-y-4 rounded-xl bg-neutral-100 p-4">
        <Txt>Profile</Txt>
        <div className="flex w-full space-x-6 ">
          <Image
            src="/static/avatar.jpg"
            alt="profile avatar"
            width="140"
            height="140"
            className="hidden rounded-xl bg-red-300 sm:block"
          />

          <div className="flex w-full flex-col">
            <Txt className="text-xl font-bold">김유권</Txt>
            <Txt>프론트엔드 개발자</Txt>
            <Txt color="neutral" className="mt-2 italic">
              Success is walking from failure to failure with no loss of
              enthusiasm.
            </Txt>
            <div className="mt-4 flex w-full justify-end space-x-2 sm:mt-auto">
              <a
                href="https://github.com/ukkodeveloper"
                target="_blank"
                className="align-center flex w-fit justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
              >
                <ChevronLeftIcon width="18" className="mr-1" />
                쉽게 빚어낸 코드
              </a>
              <a
                href="https://www.instagram.com/kimupic"
                target="_blank"
                className="align-center flex w-fit justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
              >
                <ChevronLeftIcon width="18" className="mr-1" />
                쉽게 담아낸 빛
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl bg-neutral-100 p-4">
        <Txt>Series</Txt>
        <BadgesContainer>
          {seriesList.map((curSeries) => (
            <Badge key={curSeries} name={curSeries} variant="SERIES" />
          ))}
        </BadgesContainer>
        <Txt>Tags</Txt>
        <BadgesContainer>
          {tagList.map((curSeries) => (
            <Badge key={curSeries} name={curSeries} variant="TAG" />
          ))}
        </BadgesContainer>
      </section>

      <section className="space-y-4 rounded-xl bg-neutral-100 p-4">
        <Txt>Latest</Txt>
        <PlainPostList posts={recentPosts} />
        <div className="flex w-full justify-end">
          <Link
            href={'/series'}
            className="rounded-md bg-neutral-800 px-3 py-1.5 text-sm text-neutral-100 hover:bg-neutral-700 md:text-lg "
          >
            더 보기
          </Link>
        </div>
      </section>
    </div>
  );
}

import Txt from '@/components/Txt';
import { postKorList, seriesList, tagList } from '@/lib/utils/posts';
import PlainPostList from '@/components/PlainPostList';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';

import Badge from '@/components/Badge';
import BadgesContainer from '@/components/BadgesContainer';
import Profile from '@/components/Profile';
import Box from '@/components/Box';
import React from 'react';
import siteMetadata from '@/app/siteMetadata';
import BlogPageContainer from '@/components/BlogPageContainer';

export default function Home() {
  return (
    <BlogPageContainer>
      <div className="space-y-6">
        <Foreword />
        <Profile />
        <RecentPosts />
        <TagSeriesList />
        <br />
      </div>
    </BlogPageContainer>
  );
}

function RecentPosts() {
  const recentPosts = postKorList.slice(0, 3);

  return (
    <Box as="section">
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
    </Box>
  );
}

function TagSeriesList() {
  return (
    <Box as="section" className="mb-10">
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
    </Box>
  );
}

function Foreword() {
  return (
    <section className="space-y-2 ">
      <Txt fontSize="xl" as="h1">
        {siteMetadata.title}
      </Txt>
      <Txt color="neutral">
        머릿 속에 나부끼는 코드와 고민을 정리하는 공간입니다.
      </Txt>
    </section>
  );
}

'use client';

import Txt from '@/components/Txt';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/16/solid';
import { type ReactNode, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Box from '@/components/Box';
import siteMetadata from '@/app/siteMetadata';

interface ProfileProps {
  excluded?: boolean;
}

export function Profile({ excluded }: ProfileProps) {
  const [isOpened, setIsOpened] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative">
      <div className="relative -top-6" ref={profileRef}></div>
      <Box className={excluded ? 'rounded-b-xl pb-6' : 'rounded-b-none pb-6'}>
        <div className="flex w-full sm:space-x-6 ">
          <div>
            <Image
              src="/static/avatar.jpg"
              alt="profile avatar"
              width="140"
              height="140"
              className="hidden rounded-xl sm:block"
            />
          </div>
          <div className="flex w-full flex-1 flex-col">
            <Txt className="text-xl font-bold">{siteMetadata.author}</Txt>
            <Txt>프론트엔드 개발자</Txt>
            <Txt color="neutral" className="mt-2 italic">
              Success is walking from failure to failure with no loss of
              enthusiasm.
            </Txt>
            <div className="flex w-full justify-end space-x-2 pt-3 sm:mt-auto">
              <Link
                href={siteMetadata.github}
                target="_blank"
                className="align-center flex max-w-40 flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
              >
                <ChevronLeftIcon width="18" className="mr-1" />
                <span className="flex-1">깃허브</span>
              </Link>
              <Link
                href={siteMetadata.instagram}
                target="_blank"
                className="align-center flex max-w-40 flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
              >
                <ChevronLeftIcon width="18" className="mr-1" />
                <span className="flex-1">사진</span>
              </Link>
            </div>
          </div>
        </div>
        {isOpened && !excluded && (
          <article className="animate-slideDown space-y-6 py-4">
            {ProfileContents.map((props) => (
              <ProfileSection key={props.title} {...props} />
            ))}
            {/*<div className="flex w-full justify-end space-x-2">*/}
            {/*  <button className="flex flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-3 text-center text-sm text-neutral-700 hover:bg-neutral-300">*/}
            {/*    <DocumentArrowDownIcon width="20" className="m-auto mr-1" />*/}
            {/*    <span className="m-auto flex-1">이력서 다운로드</span>*/}
            {/*  </button>*/}
            {/*  <button className="flex flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-3 text-center text-sm text-neutral-700 hover:bg-neutral-300">*/}
            {/*    <DocumentArrowDownIcon width="20" className="m-auto mr-1" />*/}
            {/*    <span className="m-auto flex-1">포트폴리오 다운로드</span>*/}
            {/*  </button>*/}
            {/*</div>*/}
          </article>
        )}
      </Box>
      {excluded ? (
        <div></div>
      ) : (
        <button
          type="button"
          className="relative bottom-1 z-10 h-8 w-[100%] rounded-b-xl bg-neutral-200 hover:bg-neutral-300"
          onClick={() => {
            setIsOpened((prev) => !prev);
            profileRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
        >
          {isOpened ? (
            <ChevronUpIcon width="26" className="m-auto text-neutral-500 " />
          ) : (
            <ChevronDownIcon width="26" className="m-auto text-neutral-500" />
          )}
        </button>
      )}
    </section>
  );
}

export default Profile;

interface ProfileSectionProps {
  title: string;
  content: ReactNode;
}

function ProfileSection({ title, content }: ProfileSectionProps) {
  return (
    <article className="space-y-2">
      <Txt fontSize="md" className="ml-1 text-neutral-600">
        {title}
      </Txt>
      <div className="rounded-xl bg-white p-3 text-neutral-600">{content}</div>
    </article>
  );
}

const ProfileContents = [
  {
    title: '소개',
    content: <div>준비 중...</div>,
  },
  {
    title: '개발 경험',
    content: <div>준비 중...</div>,
  },
];

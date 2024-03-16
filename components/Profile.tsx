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

export function Profile() {
  const [isOpened, setIsOpened] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative">
      <div className="relative -top-6" ref={profileRef}></div>
      <div className=" space-y-4 rounded-t-xl bg-neutral-100 p-4 pb-8">
        <div className="flex w-full sm:space-x-6 ">
          <div>
            <Image
              src="/static/avatar.jpg"
              alt="profile avatar"
              width="140"
              height="140"
              className="hidden rounded-xl bg-red-300 sm:block"
            />
          </div>

          <div className="flex w-full flex-1 flex-col">
            <Txt className="text-xl font-bold">김유권</Txt>
            <Txt>프론트엔드 개발자</Txt>
            <Txt color="neutral" className="mt-2 italic">
              Success is walking from failure to failure with no loss of
              enthusiasm.
            </Txt>
            <div className="flex w-full justify-end space-x-2 pt-3 sm:mt-auto">
              <Link
                href="https://github.com/ukkodeveloper"
                target="_blank"
                className="align-center flex flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
              >
                <ChevronLeftIcon width="18" className="mr-1" />
                <span className="flex-1">쉽게 빚어낸 코드</span>
              </Link>
              <Link
                href="https://www.instagram.com/kimupic"
                target="_blank"
                className="align-center flex flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
              >
                <ChevronLeftIcon width="18" className="mr-1" />
                <span className="flex-1">쉽게 담아낸 빛</span>
              </Link>
            </div>
          </div>
        </div>
        {isOpened && (
          <article className="animate-slideDown space-y-6 py-4">
            {ProfileContents.map((props) => (
              <ProfileSection key={props.title} {...props} />
            ))}
            <div className="flex w-full justify-end space-x-2">
              <button className="flex flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-3 text-center text-sm text-neutral-700 hover:bg-neutral-300">
                <DocumentArrowDownIcon width="20" className="m-auto mr-1" />
                <span className="m-auto flex-1">이력서 다운로드</span>
              </button>
              <button className="flex flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-3 text-center text-sm text-neutral-700 hover:bg-neutral-300">
                <DocumentArrowDownIcon width="20" className="m-auto mr-1" />
                <span className="m-auto flex-1">포트폴리오 다운로드</span>
              </button>
            </div>
          </article>
        )}
      </div>

      <button
        type="button"
        className="relative bottom-1 z-10 h-6 w-[100%] rounded-b-xl bg-neutral-200 hover:bg-neutral-300"
        onClick={() => {
          setIsOpened((prev) => !prev);
          profileRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
      >
        {isOpened ? (
          <ChevronUpIcon width="24" className="m-auto text-neutral-500 " />
        ) : (
          <ChevronDownIcon width="24" className="m-auto text-neutral-500" />
        )}
      </button>
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
      <div className="rounded-xl bg-neutral-200 p-3 text-neutral-600">
        {content}
      </div>
    </article>
  );
}

const ProfileContents = [
  {
    title: '개발자가 된 이유',
    content: (
      <div>
        <p>문제의 원인을 파악하고 여러 해결 방안을 고려할 수 있습니다.</p>
        <p>사용자와 동료에게 편리함을 줄 수 있는 개발을 지향합니다.</p>
        <p>타인과 소통하고 의견을 공유하며 발전시키는 것에 자신 있습니다.</p>
        <p>
          일만시간의 법칙처럼, 긴 시간동안 고민해야 얻을 수 있는 가치가 있다고
          믿습니다.
        </p>
      </div>
    ),
  },
  {
    title: '개발 경험',
    content: (
      <ul>
        <li>프로젝트 환경 구축</li>
        <li>슬라이더 UX 개선</li>
        <li>무한스크롤 동적 API 호출 최적화</li>
        <li>Oauth를 통한 로그인 협업</li>
      </ul>
    ),
  },
  {
    title: '우아한테크코스 ',
    content: (
      <div>
        <p>페어프로그래밍 8회를 진행하면서 함께 자라는 방법을 터득했습니다.</p>
        <p>
          테코톡뿐만 아니라 글쓰기, 스터디 등을 통해 소프트스킬을 증진했습니다.
        </p>
        <p>
          작은 것부터 구현하여 디테일한 부분까지 단계적으로 발전시키는 경험을
          했습니다.
        </p>
        <p>
          4개월 간 팀 프로젝트를 통해 기획부터 개발, 서비스 운영까지
          경험하였습니다.
        </p>
      </div>
    ),
  },
];

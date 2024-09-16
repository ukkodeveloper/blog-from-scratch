'use client';

import Txt from '@/components/Txt';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from '@heroicons/react/16/solid';
import { type ReactNode, useRef, useState } from 'react';
import Box from '@/components/Box';
import siteMetadata from '@/app/siteMetadata';
import { CameraIcon } from '@heroicons/react/24/solid';
import { Github } from './SocialIcons';

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
              width="120"
              height="120"
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
                <Github width="18" className="mr-1" />
                <span className="flex-1">GitHub</span>
              </Link>
              <Link
                href={siteMetadata.photograph}
                className="align-center flex max-w-40 flex-1 justify-center rounded-2xl bg-neutral-200 px-2 py-2 pr-4 text-center text-sm text-neutral-700 hover:bg-neutral-300"
              >
                <CameraIcon width="18" className="mr-1" />
                <span className="flex-1">_wrks</span>
              </Link>
            </div>
          </div>
        </div>
        {isOpened && !excluded && (
          <article className="animate-slideDown space-y-6 py-4">
            {ProfileContents.map((props) => (
              <ProfileSection key={props.title} {...props} />
            ))}
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
    content: (
      <div>
        <p>프론트엔드 개발자입니다.</p>
        경제학을 전공하였지만 빠르게 무언가를 만들어서 가치를 전달하는 일에
        매료되어 개발자의 길을 걷고 있습니다. 일상에서 당연하게 누려왔던
        서비스에 녹아진 노력과 기술을 점차 알아가고 있습니다. 그리고 기술을 통해
        사용자에게 편리하고 새로운 경험을 줄 수 있다는 것에 성취를 느낍니다.
      </div>
    ),
  },
  {
    title: '블로그 운영 이유',
    content: (
      <div className="flex flex-col justify-evenly space-y-2 divide-y-2">
        개발을 시작하고 상당히 많은 분들에게 도움을 많이 받았습니다. 우테코
        코치뿐만 아니라 함께 공부하던 크루들, 특히 S-HOOK 프로젝트에 함께 했던
        팀원들로부터 지식뿐만 아니라 마음가짐 등 다양한 부분에서 제게 도움이
        되었습니다. 심지어 전혀 몰랐던 분과 커피챗으로 도움을 받기도 했습니다.
        그때의 기억을 토대로 저 역시 다른 사람에게 도움이 되는 사람이 될 수
        있도록 블로그를 만들었습니다. 아직 부족하지만, 누군가에게는 제 글이
        도움이 되길 바라며 글을 작성하고 있습니다.
      </div>
    ),
  },
];

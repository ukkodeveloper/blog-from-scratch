import PostCard from '@/components/PostCard';
import Image from 'next/image';
import hero from '../public/static/hero.png';
import heroHovered from '../public/static/hero-hovered.png';
import Txt from '@/components/Txt';
import SeriesCard from '@/components/SeriesCard';
import { postList, seriesList } from '@/lib/utils/posts';
import Title from '@/components/Title';

export default function Home() {
  const recentPosts = postList.slice(0, 6);

  return (
    <div className="relative mt-4 space-y-8">
      <section>
        <Txt fontSize="xl" as="h1">
          쉽게 쓰여진 글
        </Txt>
        <Txt color="neutral">
          머릿 속에 나부끼는 코드와 고민을 정리하는 일을 합니다.
        </Txt>
      </section>
      <section className="mb-16 rounded-lg bg-gray-100">
        <div className="flex w-full space-x-6 p-4">
          <div>
            <Image
              src="/static/avatar.jpg"
              alt="profile avatar"
              width="100"
              height="100"
              className="rounded-xl bg-red-300"
            />
          </div>
          <div className="flex flex-col">
            <Txt className="text-xl font-bold">김유권</Txt>
            <Txt color="neutral">
              머릿 속에 나부끼는 코드와 고민을 정리하는 일을 합니다.
            </Txt>
            <div className="space-y-4 text-neutral-500">
              <p className="w-fit rounded-2xl bg-neutral-200 px-2 py-1.5 text-center text-sm">
                쉽게 쓰여진 빛
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-16 space-y-6">
        <Title>series</Title>
        <div className="grid animate-slideDown grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {seriesList.map((series) => (
            <SeriesCard key={series} series={series} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <Title>articles</Title>
        <div className="mt-6 flex animate-slideDown flex-col md:grid md:grid-cols-2 md:gap-10 xl:grid-cols-3 xl:gap-14">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

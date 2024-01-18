import PostCard from '@/components/PostCard';
import Image from 'next/image';
import hero from '../public/static/hero.png';
import heroHovered from '../public/static/hero-hovered.png';
import Txt from '@/components/Txt';
import SeriesCard from '@/components/SeriesCard';
import { sortedPosts, seriesList } from '@/lib/posts';
import Title from '@/components/Title';

export default function Home() {
  const recentPosts = sortedPosts.slice(0, 6);

  return (
    <div className="relative mt-4 space-y-12">
      <section>
        <div className="group">
          <Image
            src={hero}
            alt="메인 이미지"
            className="rounded-xl duration-100 group-hover:opacity-75"
          />
          <div className="absolute left-0 top-0 ">
            <Image
              src={heroHovered}
              className="rounded-xl opacity-0 transition-opacity delay-100 duration-1000 group-hover:opacity-100"
              alt="메인 이미지"
            />
            <div className="absolute left-0 top-0 flex h-full w-full -translate-y-5 transform items-center justify-center opacity-0 transition duration-1000 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <Txt
                as="h1"
                fontSize="2xl"
                color="white"
                className="absolute right-8"
              >
                안녕하세요,
                <span className="text-neutral-700"> 우코의 블로그</span>
                입니다.
              </Txt>
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

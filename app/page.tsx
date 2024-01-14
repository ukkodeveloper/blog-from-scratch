import Postcard from '@/components/PostCard';
import tech from '../public/images/image_tech.png';
import Image from 'next/image';
import hero from '../public/images/hero.png';
import heroHovered from '../public/images/hero-hovered.png';
import Txt from '@/components/Txt';

export default function Home() {
  return (
    <div className="relative mt-4 space-y-6">
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

      <section className="space-y-6">
        <div className="space-x-4 space-y-6 md:grid md:grid-cols-3 xl:grid-cols-4">
          <Txt fontSize="xl" as="h3">
            SERIES
          </Txt>
          <div className="flex flex-nowrap space-x-4 overflow-x-auto md:col-span-2 xl:col-span-3">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-40 w-56 flex-shrink-0 bg-primary-200"
              >
                안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <Txt fontSize="xl">ARTICLES</Txt>
        <div className="grid grid-cols-3 gap-6">
          <Postcard
            imgSrc={tech}
            title="리액트 부서붜리기"
            date="2019-01-14"
            description=""
            series="Insights"
            tags={['Design', 'UI/UX']}
          />
          <Postcard
            imgSrc={tech}
            title="Are designers happy? Our new “State of the Designer” report aims to find out"
            date="2019-01-14"
            description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
            series="Insights"
            tags={['Design', 'UI/UX']}
          />
          <Postcard
            imgSrc={tech}
            title="Are designers happy? Our new “State of the Designer” report aims to find out"
            date="2019-01-14"
            description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
            series="Insights"
            tags={['Design', 'UI/UX']}
          />
          <Postcard
            imgSrc={tech}
            title="Are designers happy? Our new “State of the Designer” report aims to find out"
            date="2019-01-14"
            description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
            series="Insights"
            tags={['Design', 'UI/UX']}
          />
          <Postcard
            imgSrc={tech}
            title="Are designers happy? Our new “State of the Designer” report aims to find out"
            date="2019-01-14"
            description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
            series="TIL"
            tags={['Design', 'UI/UX', 'BLOG', 'REACT']}
          />
        </div>
      </section>
    </div>
  );
}

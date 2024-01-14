import Postcard from '@/components/PostCard';
import tech from '../public/images/image_tech.png';
import Image from 'next/image';
import hero from '../public/images/hero.png';
import heroHovered from '../public/images/hero-hovered.png';

export default function Home() {
  return (
    <>
      <section className="relative my-6 space-y-6">
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
              <h1 className="absolute right-16 px-2 text-3xl font-extrabold text-neutral-50">
                안녕하세요,
                <span className="text-neutral-700"> 우코의 블로그</span>입니다.
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 space-x-4">
          <div className="h-24  bg-primary-200">안녕</div>
          <div className=" col-span-3 flex space-x-4">
            <div className="h-24 flex-1 bg-primary-200">안녕</div>
            <div className="h-24 flex-1 bg-primary-200">안녕</div>
            <div className="h-24 flex-1 bg-primary-200">안녕</div>
          </div>
        </div>
      </section>

      <section>
        <h1></h1>
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
    </>
  );
}

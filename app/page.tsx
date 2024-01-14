import Postcard from '@/components/PostCard';
import hero from '../public/images/hero.png';
import tech from '../public/images/image_tech.png';

export default function Home() {
  return (
    <div>
      <h1>Front-End Developer</h1>
      <h2>Front-End Developer</h2>
      <h3>Hello</h3>

      <div className="grid grid-cols-3 gap-6">
        <Postcard
          imgSrc={hero.src}
          title="리액트 부서붜리기"
          date="2019-01-14"
          description=""
          series="Insights"
          tags={['Design', 'UI/UX']}
        />
        <Postcard
          imgSrc={tech.src}
          title="Are designers happy? Our new “State of the Designer” report aims to find out"
          date="2019-01-14"
          description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
          series="Insights"
          tags={['Design', 'UI/UX']}
        />
        <Postcard
          imgSrc={hero.src}
          title="Are designers happy? Our new “State of the Designer” report aims to find out"
          date="2019-01-14"
          description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
          series="Insights"
          tags={['Design', 'UI/UX']}
        />
        <Postcard
          imgSrc={tech.src}
          title="Are designers happy? Our new “State of the Designer” report aims to find out"
          date="2019-01-14"
          description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
          series="Insights"
          tags={['Design', 'UI/UX']}
        />
        <Postcard
          imgSrc={hero.src}
          title="Are designers happy? Our new “State of the Designer” report aims to find out"
          date="2019-01-14"
          description="Our new report examines what it takes for designers to feel fulfilled and satisfied in their roles now that work has radically changed."
          series="TIL"
          tags={['Design', 'UI/UX', 'BLOG', 'REACT']}
        />
      </div>
    </div>
  );
}

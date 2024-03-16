import Image from 'next/image';
import Txt from '@/components/Txt';

interface PostTitleSideProps {
  image: string;
  title: string;
  date: string;
}

const PostTitleSide = ({ image, title, date }: PostTitleSideProps) => {
  return (
    <aside className="relative mb-10 aspect-square max-h-[400px] w-full  animate-slideDown snap-center pb-0">
      <Image
        src={image}
        alt="post image"
        fill
        className="-z-10 animate-pulse rounded-xl bg-neutral-300 object-cover opacity-50 brightness-[40%]"
      />
      <Txt
        fontSize="xl"
        as="h1"
        className="absolute top-[20%] mx-8 translate-y-[-50%] tracking-wider text-white"
      >
        {title}
      </Txt>
      <Txt
        fontSize="lg"
        className="absolute bottom-[10%] right-8 inline-block  text-white"
      >
        {date.split('T')[0]}
      </Txt>
    </aside>
  );
};

export default PostTitleSide;

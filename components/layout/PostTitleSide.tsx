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
        className="-z-10 rounded-xl object-cover opacity-50 brightness-[40%]"
      />
      <Txt
        fontSize="lg"
        as="h1"
        className="absolute top-[10%] mx-8 translate-y-[-50%] font-medium tracking-wider text-white"
      >
        {title}
      </Txt>
      <Txt
        fontSize="md"
        className="absolute bottom-0 right-8 my-8 inline-block px-2 py-1 font-medium text-white"
      >
        {date.split('T')[0]}
      </Txt>
    </aside>
  );
};

export default PostTitleSide;

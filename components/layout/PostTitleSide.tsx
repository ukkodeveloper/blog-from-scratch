import Image from 'next/image';
import Txt from '@/components/Txt';

interface PostTitleSideProps {
  image: string;
  title: string;
  date: string;
}

const PostTitleSide = ({ image, title, date }: PostTitleSideProps) => {
  return (
    <aside className="relative h-72 animate-slideDown  pb-0">
      <Image
        src={image}
        alt="post image"
        fill
        className="-z-10 rounded-md object-cover opacity-50 backdrop-brightness-50"
      />
      <Txt
        fontSize="md"
        className="absolute bottom-0 right-4 my-8 inline-block rounded-md border-2 border-black px-2 py-1"
      >
        {date.split('T')[0]}
      </Txt>
      <Txt
        fontSize="xl"
        as="h1"
        className="absolute top-[50%] mx-8 translate-y-[-50%] tracking-wider"
      >
        {title}
      </Txt>
    </aside>
  );
};

export default PostTitleSide;

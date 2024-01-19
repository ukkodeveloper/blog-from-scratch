import Image from 'next/image';
import Txt from '@/components/Txt';

interface PostTitleSideProps {
  image: string;
  title: string;
  date: string;
}

const PostTitleSide = ({ image, title, date }: PostTitleSideProps) => {
  return (
    <aside className="relative mb-20 mt-10 animate-slideDown p-10 pb-0 md:grid md:grid-cols-4">
      <Image
        src={image}
        alt="post image"
        fill
        className="-z-10 rounded-md object-cover opacity-50 backdrop-brightness-50"
      />
      <div className="md:col-span-3">
        <Txt fontSize="2xl" as="h1" className="tracking-wider">
          {title}
        </Txt>
        <Txt
          fontSize="md"
          className="my-8 inline-block rounded-md border-2 border-black px-2 py-1"
        >
          {date.split('T')[0]}
        </Txt>
      </div>
    </aside>
  );
};

export default PostTitleSide;

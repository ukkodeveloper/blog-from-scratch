import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/Tag';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

type PostCardProps = {
  imgSrc: StaticImport;
  title: string;
  date: string;
  description: string;
  series: string;
  tags: string[];
};

const PostCard = ({
  imgSrc,
  title,
  date,
  description,
  series,
  tags,
}: PostCardProps) => {
  return (
    <article className="flex flex-col">
      <Link href="/">
        <Image className="w-full" src={imgSrc} alt="Article image" />
        <div className="py-4">
          <div className="mb-2 text-xl font-bold ">{title}</div>
          <p className="mb-2 text-base">{date}</p>
          <p className="text-base text-gray-700">{description}</p>
        </div>
      </Link>
      <div className="flex flex-wrap gap-2">
        <Tag name={series} link="/" shape="SQUARE" />
        {tags.map((tag) => (
          <Tag key={tag} name={tag} link="/" shape="FULL" />
        ))}
      </div>
    </article>
  );
};

export default PostCard;

import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/Tag';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Txt from '@/components/Txt';

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
    <article className="mb-16 flex flex-col space-y-4">
      <Link href="/" className="space-y-4">
        <Image
          className="hidden w-full md:block"
          src={imgSrc}
          alt="Article image"
        />
        <div className="space-y-4">
          <Txt as="h3" fontSize="lg">
            {title}
          </Txt>
          <Txt>{description}</Txt>
          <Txt color="neutral">{date}</Txt>
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

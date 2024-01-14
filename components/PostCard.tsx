import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/Tag';

type PostcardProps = {
  imgSrc: string;
  title: string;
  date: string;
  description: string;
  series: string;
  tags: string[];
};

const Postcard: React.FC<PostcardProps> = ({
  imgSrc,
  title,
  date,
  description,
  series,
  tags,
}) => {
  return (
    <article className="flex flex-col">
      <Link href="/">
        <Image
          className="w-full"
          src={imgSrc}
          width={300}
          height={300}
          alt="Article image"
        />
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

export default Postcard;

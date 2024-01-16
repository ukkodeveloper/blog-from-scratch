import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/Tag';
import Txt from '@/components/Txt';
import type { Post } from '@/.contentlayer/generated';

type PostCardProps = {
  post: Post;
};

const PostCard = ({
  post: { image, title, date, summary, series, tags, slug },
}: PostCardProps) => {
  return (
    <article className="mb-16 flex flex-col space-y-4">
      <Link href={`/blog/${slug}`} className="space-y-4">
        <div className="hidden w-full md:relative md:block md:h-48">
          <Image
            src={image}
            alt={title}
            fill
            objectFit="cover"
            className="rounded-md border-2 shadow-sm"
          />
        </div>
        <div className="space-y-4">
          <Txt as="h3" fontSize="lg">
            {title}
          </Txt>
          <Txt>{summary}</Txt>
          <Txt color="neutral">{date}</Txt>
        </div>
      </Link>
      <div className="flex flex-wrap gap-2">
        <Tag name={series} link={`/series/${series}`} shape="SQUARE" />
        {tags.map((tag) => (
          <Tag key={tag} name={tag} link={`/tags/${tag}`} shape="FULL" />
        ))}
      </div>
    </article>
  );
};

export default PostCard;

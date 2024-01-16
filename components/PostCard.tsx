import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/Tag';
import Txt from '@/components/Txt';
import type { Post } from '@/.contentlayer/generated';

type PostCardProps = {
  post: Post;
};

const PostCard = ({
  post: { image, title, date, summary, series, tags },
}: PostCardProps) => {
  return (
    <article className="mb-16 flex flex-col space-y-4">
      <Link href="/" className="space-y-4">
        <Image
          className="hidden w-full md:block"
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
        />
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

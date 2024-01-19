import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/Badge';
import Txt from '@/components/Txt';
import type { Post } from '@/.contentlayer/generated';
import slugger from '@/lib/utils/slugger';
import BadgesContainer from '@/components/BadgesContainer';

type PostCardProps = {
  post: Post;
};

const PostCard = ({
  post: { image, title, date, summary, series, tags, slug },
}: PostCardProps) => {
  console.log('[image]', image);

  return (
    <article className="mb-16 flex flex-col space-y-4">
      <Link href={`/blog/${slug}`} className="space-y-4">
        <Image
          src={image}
          alt={title}
          className="hidden object-cover md:block"
          width={1000}
          height={1000}
        />
        <div className="space-y-4">
          <Txt as="h3" fontSize="lg">
            {title}
          </Txt>
          <Txt>{summary}</Txt>
          <Txt color="neutral">{date}</Txt>
        </div>
      </Link>
      <BadgesContainer>
        <Badge name={series} variant="SERIES" />
        {tags.map((tag) => (
          <Badge key={tag} name={tag} variant="TAG" />
        ))}
      </BadgesContainer>
    </article>
  );
};

export default PostCard;

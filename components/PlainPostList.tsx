import type { Post } from '@/.contentlayer/generated';
import Link from 'next/link';
import Txt from '@/components/Txt';
import Badge from '@/components/Badge';

interface PlainPostListProps {
  posts: Post[];
}

const PlainPostList = ({ posts }: PlainPostListProps) => {
  return (
    <ul className="m-auto max-w-xl">
      {posts.map(({ slug, title, summary, date, series, tags }) => (
        <li key={slug} className="mb-16 space-y-4">
          <Link href={`/blog/${slug}`} className="space-y-4">
            <div className="space-y-4">
              <Txt as="h3" fontSize="lg">
                {title}
              </Txt>
              <Txt>{summary}</Txt>
              <Txt color="neutral">{date}</Txt>
            </div>
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge name={series} variant="SERIES" />
            {tags.map((tag) => (
              <Badge key={tag} name={tag} variant="TAG" />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlainPostList;

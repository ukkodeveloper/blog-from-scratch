import type { Post } from '@/.contentlayer/generated';
import Link from 'next/link';
import Txt from '@/components/Txt';
import Badge from '@/components/Badge';
import BadgesContainer from '@/components/BadgesContainer';

interface PlainPostListProps {
  posts: Post[];
}

const PlainPostList = ({ posts }: PlainPostListProps) => {
  return (
    <ul className="border-t-2 py-16">
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
          <BadgesContainer>
            <Badge name={series} variant="SERIES" />
            {tags.map((tag) => (
              <Badge key={tag} name={tag} variant="TAG" />
            ))}
          </BadgesContainer>
        </li>
      ))}
    </ul>
  );
};

export default PlainPostList;

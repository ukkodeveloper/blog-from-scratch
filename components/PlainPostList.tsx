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
    <ul>
      {posts.map(({ slug, title, summary, date, series, tags }) => (
        <li
          key={slug}
          className="space-y-2 rounded-md p-2 py-4 hover:bg-neutral-200"
        >
          <Link href={`/blog/${slug}`} className="space-y-2 ">
            <Txt as="h2" fontSize="lg">
              {title}
            </Txt>
            <Txt color="neutral">{summary}</Txt>

            <Txt>{date}</Txt>
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

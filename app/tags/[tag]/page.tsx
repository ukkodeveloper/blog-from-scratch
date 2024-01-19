import { getPostsByTag, tagList } from '@/lib/utils/posts';
import Badge from '@/components/Badge';
import Txt from '@/components/Txt';
import Link from 'next/link';

interface PageParams {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  return tagList.map(encodeURI);
}

const Page = ({ params }: PageParams) => {
  const tag = decodeURI(params.tag);
  const posts = getPostsByTag(tag);
  return (
    <>
      <section className="m-auto my-10 flex max-w-xl animate-slideDown flex-col items-center space-y-10 border-b-2">
        <Txt fontSize="sm">tags</Txt>
        <Txt fontSize="2xl" as="h1">
          {tag}
        </Txt>
        <div className="flex flex-wrap gap-1 py-6">
          {tagList.map((curTag) => (
            <Badge
              key={curTag}
              name={curTag}
              variant="TAG"
              selected={curTag === tag}
            />
          ))}
        </div>
      </section>
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
    </>
  );
};

export default Page;

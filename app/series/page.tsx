import { seriesList, sortedPosts } from '@/lib/posts';
import Tag from '@/components/Tag';
import Txt from '@/components/Txt';
import Link from 'next/link';

const Page = () => {
  console.log('[series]', seriesList);
  return (
    <>
      <section className="my-10 flex animate-slideDown flex-col items-center space-y-10">
        <Txt fontSize="sm">series</Txt>
        <Txt fontSize="2xl" as="h1">
          ALL
        </Txt>
        <div className="flex flex-wrap gap-1 xl:max-w-xl">
          {seriesList.map((series) => (
            <Tag
              key={series}
              name={series}
              link={`/series/${series}`}
              shape="SQUARE"
            />
          ))}
        </div>
      </section>
      <ul className="m-auto max-w-xl">
        {sortedPosts
          .slice(0, 10)
          .map(({ slug, title, summary, date, series, tags }) => (
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
                <Tag name={series} link={`/series/${series}`} shape="SQUARE" />
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    name={tag}
                    link={`/tags/${tag}`}
                    shape="FULL"
                  />
                ))}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Page;

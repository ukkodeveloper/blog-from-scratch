import { getPostsBySeries, seriesList } from '@/lib/utils/posts';
import Badge from '@/components/Badge';
import Txt from '@/components/Txt';
import Link from 'next/link';
import BadgeListLayout from '@/components/layout/BadgeListLayout';

interface PageParams {
  params: {
    series: string;
  };
}

export async function generateStaticParams() {
  return seriesList;
}

const Page = ({ params: { series } }: PageParams) => {
  const posts = getPostsBySeries(series);
  return (
    <>
      <BadgeListLayout category="series" currentValue={series}>
        {seriesList.map((curSeries) => (
          <Badge
            key={curSeries}
            name={curSeries}
            selected={curSeries === series}
            variant="SERIES"
          />
        ))}
      </BadgeListLayout>

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

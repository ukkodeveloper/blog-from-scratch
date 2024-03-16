import { getPostsBySeries, seriesList } from '@/lib/utils/posts';
import Badge from '@/components/Badge';
import BadgeListLayout from '@/components/layout/BadgeListLayout';
import PlainPostList from '@/components/PlainPostList';

interface PageParams {
  params: {
    series: string;
  };
}

export async function generateStaticParams() {
  return seriesList;
}

const Page = ({ params }: PageParams) => {
  const series = decodeURI(params.series);
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
            replaced={true}
          />
        ))}
      </BadgeListLayout>
      <PlainPostList posts={posts} />
    </>
  );
};

export default Page;

import { seriesList, postList } from '@/lib/utils/posts';
import Badge from '@/components/Badge';
import BadgeListLayout from '@/components/layout/BadgeListLayout';
import PlainPostList from '@/components/PlainPostList';

const Page = () => {
  return (
    <>
      <BadgeListLayout category="series" currentValue="all">
        {seriesList.map((series) => (
          <Badge key={series} name={series} variant="SERIES" />
        ))}
      </BadgeListLayout>
      <PlainPostList posts={postList.slice(0, 12)} />
    </>
  );
};

export default Page;

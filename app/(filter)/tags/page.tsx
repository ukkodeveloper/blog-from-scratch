import { postList, tagList } from '@/lib/utils/posts';
import Badge from '@/components/Badge';
import BadgeListLayout from '@/components/BadgeListLayout';
import PlainPostList from '@/components/PlainPostList';

const Page = () => {
  return (
    <>
      <BadgeListLayout category="tags" currentValue="all">
        {tagList.map((tag) => (
          <Badge key={tag} name={tag} variant="TAG" />
        ))}
      </BadgeListLayout>
      <PlainPostList posts={postList.slice(0, 12)} />
    </>
  );
};

export default Page;

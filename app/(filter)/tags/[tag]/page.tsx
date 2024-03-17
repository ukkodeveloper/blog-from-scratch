import { getPostsByTag, tagList } from '@/lib/utils/posts';
import Badge from '@/components/Badge';
import BadgeListLayout from '@/components/BadgeListLayout';
import PlainPostList from '@/components/PlainPostList';

interface PageParams {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  return tagList;
}

const Page = ({ params }: PageParams) => {
  const tag = decodeURI(params.tag);

  const posts = getPostsByTag(tag);
  return (
    <>
      <BadgeListLayout category="tags" currentValue={tag}>
        {tagList.map((curTag) => (
          <Badge
            key={curTag}
            name={curTag}
            variant="TAG"
            selected={curTag === tag}
            replaced={true}
          />
        ))}
      </BadgeListLayout>
      <PlainPostList posts={posts} />
    </>
  );
};

export default Page;

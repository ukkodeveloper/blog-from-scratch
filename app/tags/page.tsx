import { tags } from '@/lib/posts';
import Tag from '@/components/Tag';
import Txt from '@/components/Txt';

const Page = () => {
  return (
    <section className="my-10 flex animate-slideDown flex-col items-center space-y-10">
      <Txt fontSize="sm">tags</Txt>
      <Txt fontSize="2xl" as="h1">
        ALL
      </Txt>
      <div className="flex flex-wrap gap-1 xl:max-w-xl">
        {tags.map((tag) => (
          <Tag key={tag} name={tag} link={`/tags/${tag}`} shape="FULL" />
        ))}
      </div>
    </section>
  );
};

export default Page;

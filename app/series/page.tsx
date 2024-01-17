import { seriesList } from '@/lib/posts';
import Tag from '@/components/Tag';
import Txt from '@/components/Txt';

const Page = () => {
  return (
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
  );
};

export default Page;

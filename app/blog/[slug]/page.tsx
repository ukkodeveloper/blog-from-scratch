import { postList } from '@/lib/utils/posts';
import usePost from '@/app/hooks/usePost';
import PostTitleSide from '@/components/layout/PostTitleSide';
import PostInfoSide from '@/components/layout/PostInfoSide';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return postList.map(({ slug }) => slug);
}

export default function Page({ params }: PageProps) {
  const { MDXComponent, post, seriesImg, prevPost, nextPost } = usePost(
    params.slug
  );

  const { tags, image, series, title, date } = post;

  return (
    <>
      <PostTitleSide title={title} image={image} date={date} />

      <div className="py-12 md:grid md:grid-cols-4 xl:grid-cols-4">
        <section className="prose md:col-span-3 md:pr-4 xl:col-span-3">
          <MDXComponent />
        </section>

        <section className="animate-slideDown md:min-h-screen md:pl-4">
          <PostInfoSide
            prevPost={prevPost}
            nextPost={nextPost}
            series={series}
            tags={tags}
            seriesImg={seriesImg}
          />
        </section>
      </div>
    </>
  );
}

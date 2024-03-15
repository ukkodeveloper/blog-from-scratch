import { postList } from '@/lib/utils/posts';
import usePost from '@/app/hooks/usePost';
import PostTitleSide from '@/components/layout/PostTitleSide';
import PostInfoSide from '@/components/layout/PostInfoSide';
import Badge from '@/components/Badge';

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
    <div className="space-y-4">
      <PostTitleSide title={title} image={image} date={date} />
      <div className="py-4">
        <section className="prose animate-slideDown">
          <MDXComponent />
        </section>
      </div>
      <PostInfoSide
        tags={tags}
        series={series}
        nextPost={nextPost}
        prevPost={prevPost}
      />
    </div>
  );
}

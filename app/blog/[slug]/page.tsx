import { getPostBySlug, postList } from '@/lib/utils/posts';
import usePost from '@/app/hooks/usePost';
import PostTitleSide from '@/components/layout/PostTitleSide';
import PostInfoSide from '@/components/layout/PostInfoSide';
import Badge from '@/components/Badge';
import type { Metadata } from 'next';
import siteMetadata from '@/app/siteMetadata';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug);
  const post = getPostBySlug(slug);

  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const author = siteMetadata.author;
  let imageList = [siteMetadata.socialBanner];

  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'ko-KR',
      type: 'article',
      publishedTime: publishedAt,
      url: './',
      images: ogImages,
      authors: author,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
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

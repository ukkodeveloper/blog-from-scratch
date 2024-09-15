import { getPostBySlug, postList } from '@/lib/utils/posts';
import usePost from '@/app/hooks/usePost';
import PostTitleSide from '@/components/PostTitleSide';
import PostInfoSide from '@/components/PostInfoSide';
import type { Metadata } from 'next';
import siteMetadata from '@/app/siteMetadata';
import Profile from '@/components/Profile';

import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import Callout from '@/components/Callout';
import Button from '@/components/Button';
import { LanguageIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
  const imageList = [siteMetadata.socialBanner];

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
  const slug = params.slug;
  const slugKor = slug.replace(/-eng$/, '');

  const { MDXComponent, post } = usePost(params.slug);
  const { prevPost, nextPost, post: postKor } = usePost(slugKor);

  const { image, title, date, summary } = post;
  const { tags, series } = postKor;

  const isPostEnglish = slug.endsWith('-eng');
  const href = isPostEnglish
    ? `/blog/${slug.replace(/-eng$/, '')}`
    : `/blog/${slug}-eng`;

  return (
    <div className="animate-slideDown space-y-6">
      <PostTitleSide title={title} image={image} date={date} />

      <Callout
        icon={
          <ChatBubbleLeftIcon
            width={24}
            height={24}
            className="text-neutral-700"
          />
        }
        title="이 글의 요약"
        content={summary}
      />

      <div className="ml-auto flex justify-end">
        <Link href={href}>
          <Button variant="outline" name="English" className="text-xs">
            <LanguageIcon className="h-4 w-4" />
            {isPostEnglish ? '한국어로 보기' : 'to English'}
          </Button>
        </Link>
      </div>

      <section className="prose">
        <MDXComponent />
      </section>

      <Profile excluded />

      <PostInfoSide
        tags={tags}
        series={series}
        nextPost={nextPost}
        prevPost={prevPost}
      />
    </div>
  );
}

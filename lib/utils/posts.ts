import { allPosts, type Post } from '@/.contentlayer/generated';
import slugger from '@/lib/utils/slugger';

// sort posts
const postList = allPosts
  .filter((post) => post.published)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => ({
    ...post,
    tags: post.tags.map(slugger),
    series: slugger(post.series),
    slug: slugger(post.slug),
  }));

const getUniqueSortedArray = (arr: string[]) => {
  return [...new Set(arr)].sort((a, b) => a.localeCompare(b));
};

const tagList = getUniqueSortedArray(
  postList.reduce<string[]>((acc, { tags }) => [...acc, ...tags], [])
);

const seriesList = getUniqueSortedArray(postList.map(({ series }) => series));

const seriesMap = postList.reduce<
  Record<string, { tags: string[]; posts: Post[] }>
>((acc, post) => {
  const { series, tags } = post;
  if (!acc[series]) {
    acc[series] = {
      posts: [],
      tags: [],
    };
  }

  acc[series].posts.push(post);
  acc[series].tags.push(...tags);
  return acc;
}, {});

for (const series in seriesMap) {
  const tags = seriesMap?.[series].tags;

  seriesMap[series]!.tags = getUniqueSortedArray(tags);
}

const getPostsBySeries = (series: string) => {
  const seriesToFind = slugger(series);
  const Posts = seriesMap[seriesToFind];

  return Posts?.posts || [];
};

const getPostBySlug = (slug: string) => {
  const slugToFind = slugger(slug);

  return postList.find((post) => post.slug === slugToFind);
};

const getPostsByTag = (tag: string) => {
  const tagToFind = slugger(tag);

  return postList.filter((post) => post.tags.includes(tagToFind)) || [];
};

export {
  postList,
  tagList,
  seriesList,
  seriesMap,
  getPostsByTag,
  getPostBySlug,
  getPostsBySeries,
};

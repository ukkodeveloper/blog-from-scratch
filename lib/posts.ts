import { allPosts, type Post } from '@/.contentlayer/generated';
import slugger from '@/lib/utils/slugger';

// sort posts
const sortedPosts = allPosts
  .filter((post) => post.published)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => ({
    ...post,
    tags: post.tags.map(slugger),
    series: slugger(post.series),
    slug: slugger(post.slug),
  }));

let tagList: string[] = [];
sortedPosts.forEach(({ tags }) => {
  tags.forEach((tag) => {
    tagList.push(tag);
  });
});

const tags = [...new Set(tagList)].sort((a, b) => a.localeCompare(b));

// seriesMap
let seriesTempt: Record<string, { tags: Set<string>; posts: Post[] }> = {};

sortedPosts.forEach((post) => {
  if (!seriesTempt[post.series]) {
    seriesTempt[post.series] = {
      tags: new Set(),
      posts: [],
    };
  }

  seriesTempt[post.series].posts.push(post);
  post.tags.forEach((tag) => seriesTempt[post.series].tags.add(tag));
});

let seriesMap: Record<string, { tags: string[]; posts: Post[] }> = {};

for (const series in seriesTempt) {
  seriesMap[series] = {
    ...seriesTempt[series],
    tags: [...seriesTempt[series].tags],
  };
}

const getPostsBySeries = (series: string) => {
  const seriesToFind = series.toUpperCase();
  const Posts = seriesMap[seriesToFind];

  return Posts?.posts || [];
};

const seriesList = Object.keys(seriesTempt).sort((a, b) => a.localeCompare(b));

const getPostBySlug = (slug: string) => {
  return sortedPosts.find((post) => post.slug === slug);
};

const getPostsByTag = (tag: string) => {
  return sortedPosts.filter((post) => post.tags.includes(tag));
};

export {
  sortedPosts,
  tags,
  seriesMap,
  seriesList,
  getPostsByTag,
  getPostBySlug,
  getPostsBySeries,
};

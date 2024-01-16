import {
  ComputedFields,
  FieldDefs,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

const fields: FieldDefs = {
  title: { type: 'string', required: true },
  date: { type: 'date', required: true },
  tags: { type: 'list', of: { type: 'string' }, required: true },
  image: {
    type: 'string',
    required: true,
  },
  published: { type: 'boolean', required: false, default: false },
  summary: { type: 'string', required: false },
};

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').pop(),
  },
  series: {
    type: 'string',
    resolve: (doc) => {
      const segments = doc._raw.flattenedPath.split('/');
      return segments[segments.length - 2];
    },
  },
};

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'blog/**/*.{mdx,md}',
  contentType: 'mdx',
  fields,
  computedFields,
}));

export default makeSource({
  contentDirPath: 'public',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeCodeTitles,
      [rehypePrismPlus, { defaultLanguage: 'tsx' }],
    ],
  },
});

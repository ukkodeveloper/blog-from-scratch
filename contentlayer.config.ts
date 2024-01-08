import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const TechPost = defineDocumentType(() => ({
  name: 'TechPost',
  filePathPattern: 'tech/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    published: { type: 'boolean', required: false, default: false },
    summary: { type: 'string', required: false },
    images: {
      type: 'list',
      of: {
        type: 'string',
      },
      default: [],
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
  },
}));

const LifePost = defineDocumentType(() => ({
  name: 'LifePost',
  filePathPattern: 'life/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    published: { type: 'boolean', required: false, default: false },
    summary: { type: 'string', required: false },
    images: {
      type: 'list',
      of: {
        type: 'string',
      },
      default: [],
      required: false,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [TechPost, LifePost],
});

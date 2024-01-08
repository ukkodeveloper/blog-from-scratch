import {
  ComputedFields,
  FieldDefs,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';

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
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
};

const TechPost = defineDocumentType(() => ({
  name: 'TechPost',
  filePathPattern: 'tech/**/*.mdx',
  contentType: 'mdx',
  fields,
  computedFields,
}));

const LifePost = defineDocumentType(() => ({
  name: 'LifePost',
  filePathPattern: 'life/**/*.mdx',
  contentType: 'mdx',
  fields,
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [TechPost, LifePost],
});

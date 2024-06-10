import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePresetMinify from "rehype-preset-minify";
import { getTableOfContents } from "./utils/mdx-utils";
import { rehypeMdxCodeMeta } from "./utils/rehype-code-meta";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  blobUrl: {
    type: "string",
    resolve: (doc) =>
      `broken/${doc._raw.flattenedPath.replace(/^.+?(\/)/, "")}`,
  },
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    categories: { type: "list", of: { type: "string" } },
    authors: { type: "list", of: { type: "string" } },
    date: { type: "string" },
    description: { type: "string" },
    referenceHref: { type: "list", of: { type: "string" } },
    reprintedHref: { type: "string" },
  },
  computedFields: {
    ...computedFields,
    frontMatter: {
      type: "json",
      resolve: (doc) => ({
        date: doc.date,
        authors: doc.authors,
        title: doc.title,
        tags: doc.tags,
        categories: doc.categories,
        description: doc.description,
        slug: doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
        path: `/${doc._raw.flattenedPath}`,
        headings: getTableOfContents(doc.body.raw), // 生成的内容目录
        referenceHref: doc.referenceHref, // 参考连接
        reprintedHref: doc.reprintedHref, // 转载连接
      }),
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog],
  mdx: {
    cwd: process.cwd(),
    rehypePlugins: [rehypeMdxCodeMeta, rehypeKatex, rehypePresetMinify],
    remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji, remarkMath],
  },
});

export default contentLayerConfig;

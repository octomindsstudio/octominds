import { z } from "zod";
import {
  defineDocs,
  frontmatterSchema,
  defineConfig,
  defineCollections,
} from "fumadocs-mdx/config";
import remarkAttributes from "remark-attributes";
import type { Pluggable } from "unified";
import { pageSchema } from "fumadocs-core/source/schema";

export const blog = defineDocs({
  dir: "content/blogs",
  docs: {
    schema: pageSchema.extend({
      updatedAt: z.string(),
      createdAt: z.string(),
      tags: z.array(z.string()).optional(),
      thumbnail: z.string().optional(),
      banner: z.string().optional(),
      views: z.number().optional(),
    }),
  },
});

export const project = defineCollections({
  dir: "content/projects",
  type: "doc",
  schema: frontmatterSchema.extend({
    updatedAt: z.string(),
    createdAt: z.string(),
    thumbnail: z.string().optional(),
    banner: z.string().optional(),
    links: z.record(z.string(), z.string()).optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    views: z.number().optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAttributes as unknown as Pluggable],
  },
});

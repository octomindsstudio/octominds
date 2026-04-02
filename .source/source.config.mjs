// source.config.ts
import { z } from "zod";
import {
  defineDocs,
  frontmatterSchema,
  defineConfig,
  defineCollections
} from "fumadocs-mdx/config";
import remarkAttributes from "remark-attributes";
import { pageSchema } from "fumadocs-core/source/schema";
var blog = defineDocs({
  dir: "content/blogs",
  docs: {
    schema: pageSchema.extend({
      updatedAt: z.string(),
      createdAt: z.string(),
      tags: z.array(z.string()).optional(),
      thumbnail: z.string().optional(),
      banner: z.string().optional(),
      views: z.number().optional()
    })
  }
});
var project = defineCollections({
  dir: "content/projects",
  type: "doc",
  schema: frontmatterSchema.extend({
    shortDescription: z.string().optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
    thumbnail: z.string().optional(),
    banner: z.string().optional(),
    links: z.record(z.string(), z.string()).optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    views: z.number().optional()
  })
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAttributes]
  }
});
export {
  blog,
  source_config_default as default,
  project
};

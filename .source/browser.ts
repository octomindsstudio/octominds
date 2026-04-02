// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blog: create.doc("blog", {"index.mdx": () => import("../content/blogs/index.mdx?collection=blog"), }),
  project: create.doc("project", {"index.mdx": () => import("../content/projects/index.mdx?collection=project"), "teppantora.mdx": () => import("../content/projects/teppantora.mdx?collection=project"), }),
};
export default browserCollections;
// @ts-nocheck
import * as __fd_glob_2 from "../content/projects/teppantora.mdx?collection=project"
import * as __fd_glob_1 from "../content/projects/index.mdx?collection=project"
import * as __fd_glob_0 from "../content/blogs/index.mdx?collection=blog"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blog = await create.docs("blog", "content/blogs", {}, {"index.mdx": __fd_glob_0, });

export const project = await create.doc("project", "content/projects", {"index.mdx": __fd_glob_1, "teppantora.mdx": __fd_glob_2, });
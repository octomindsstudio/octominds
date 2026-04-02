import { blog, project } from "~/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";

export const source = loader({
  baseUrl: "/blogs",
  source: blog.toFumadocsSource(),
});

export const projectSource = loader({
  baseUrl: "/projects",
  source: toFumadocsSource(project, []),
});

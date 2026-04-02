
import { projectSource } from "@/lib/source";

type GetProjectsParams = {
  page?: number;
  limit?: number | "all";
  search?: string;
  sortBy?: "views" | "created_at" | string;
  order?: "asc" | "desc";
};

export interface QueryProjects {
  projects: (Record<string, any> & {
    tools?: string[];
    title: string;
    description?: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
    views?: number;
    slug?: string;
  })[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export async function getProjects({
  page: pageParam = 1,
  limit: limitParam = 20,
  search: searchParam = "",
  sortBy = "created_at",
  order = "desc",
}: GetProjectsParams) {
  const page = Math.max(1, pageParam);
  const limit =
    limitParam === "all" ? Infinity : Math.min(100, Math.max(1, limitParam));
  const search = searchParam.toLowerCase();

  const allPages = projectSource
    .getPages()
    .filter((p) => p.slugs.join("/") !== "");

  // Filter by search
  const filtered = allPages.filter((entry) => {
    if (!search) return true;
    const inTitle = entry.data.title?.toLowerCase().includes(search);
    const inDesc = entry.data.description?.toLowerCase().includes(search);
    return inTitle || inDesc;
  });

  // Combine metadata + stats
  const projectsWithViews = filtered.map((entry) => {
    return {
      title: entry.data.title,
      description: entry.data.description,
      updatedAt: entry.data.updatedAt,
      createdAt: entry.data.createdAt,
      thumbnail: entry.data.thumbnail,
      links: entry.data.links,
      category: entry.data.category,
      slug: entry.slugs.join("/"),
      banner: entry.data.banner,
      tools: entry.data.tools,
      tags: entry.data.tags,
      url: entry.url,
    };
  });

  // Stable sort
  const sorted = projectsWithViews.sort((a, b) => {
    let aKey: string | number;
    let bKey: string | number;

    switch (sortBy) {
      case "created_at":
        aKey = Math.max(
          new Date(a.createdAt ?? 0).getTime(),
          new Date(a.updatedAt ?? 0).getTime()
        );
        bKey = Math.max(
          new Date(b.createdAt ?? 0).getTime(),
          new Date(b.updatedAt ?? 0).getTime()
        );
        break;
      default: // title
        aKey = a.title ?? "";
        bKey = b.title ?? "";
        break;
    }

    if (aKey < bKey) return order === "asc" ? -1 : 1;
    if (aKey > bKey) return order === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination slice
  const start = (page - 1) * limit;
  const pagedprojects = sorted.slice(
    start,
    limit === Infinity ? undefined : start + limit
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);

  return {
    projects: pagedprojects,
    page,
    limit,
    total,
    totalPages,
  };
}

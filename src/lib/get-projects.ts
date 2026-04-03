import { projectSource } from "@/lib/source";

type GetProjectsParams = {
  page?: number;
  limit?: number | "all";
  search?: string;
  sortBy?: "views" | "created_at" | string;
  order?: "asc" | "desc";
  cursor?: string; // New cursor parameter
};

export interface QueryProjects {
  projects: (Record<string, any> & {
    tools?: string[];
    title: string;
    description?: string;
    shortDescription?: string;
    thumbnail?: string;
    banner?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    views?: number;
    slug?: string;
  })[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  nextCursor?: string; // Next cursor for the client
}

export function getProjects({
  page: pageParam = 1,
  limit: limitParam = 20,
  search: searchParam = "",
  sortBy = "created_at",
  order = "desc",
  cursor,
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
    const thumbnail = entry.data.thumbnail;
    const banner = entry.data.banner;
    return {
      title: entry.data.title,
      description: entry.data.description,
      shortDescription: entry.data.shortDescription,
      updatedAt: entry.data.updatedAt,
      createdAt: entry.data.createdAt,
      thumbnail,
      links: entry.data.links,
      category: entry.data.category,
      slug: entry.slugs.join("/"),
      banner,
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
          new Date(a.updatedAt ?? 0).getTime(),
        );
        bKey = Math.max(
          new Date(b.createdAt ?? 0).getTime(),
          new Date(b.updatedAt ?? 0).getTime(),
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

  // Pagination logic: either via page or via cursor
  let pagedprojects;
  let nextCursor;

  if (cursor) {
    const cursorIndex = sorted.findIndex((p) => p.slug === cursor);
    const start = cursorIndex !== -1 ? cursorIndex + 1 : 0;
    pagedprojects = sorted.slice(start, start + limit);
  } else {
    const start = (page - 1) * limit;
    pagedprojects = sorted.slice(
      start,
      limit === Infinity ? undefined : start + limit,
    );
  }

  // Determine next cursor
  if (pagedprojects.length > 0) {
    const lastProject = pagedprojects[pagedprojects.length - 1];
    const lastIndex = sorted.findIndex((p) => p.slug === lastProject.slug);
    if (lastIndex < sorted.length - 1) {
      nextCursor = lastProject.slug;
    }
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);

  return {
    projects: pagedprojects,
    page,
    limit,
    total,
    totalPages,
    nextCursor,
  };
}

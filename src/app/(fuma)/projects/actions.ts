"use server";

import { getProjects, QueryProjects } from "@/lib/get-projects";

export async function fetchProjectsAction({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "created_at",
  order = "desc",
  cursor,
}: {
  page?: number;
  limit?: number | "all";
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  cursor?: string;
}): Promise<{
  projects: QueryProjects["projects"];
  totalPages: number;
  nextCursor?: string;
}> {
  const data = getProjects({
    page,
    limit,
    search,
    sortBy,
    order,
    cursor,
  });

  return {
    projects: data.projects,
    totalPages: data.totalPages || 0,
    nextCursor: data.nextCursor,
  };
}

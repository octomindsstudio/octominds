"use client";
import { QueryProjects } from "@/lib/get-projects";

const LIMIT = 20;

const ProjectsView = ({
  totalPages,
  initialProjects,
}: {
  initialProjects: QueryProjects["projects"];
  totalPages: number;
}) => {
  return (
    null
  );
};

ProjectsView.displayName = "ProjectsView";

export default ProjectsView;

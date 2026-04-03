import { getProjects } from "@/lib/get-projects";
import ProjectsView from "./view";

const ProjectsIndexPage = async () => {
  const projectsData = getProjects({ page: 1, limit: 10 });

  return (
    <ProjectsView
      initialProjects={projectsData.projects}
      nextCursor={projectsData.nextCursor}
    />
  );
};

export default ProjectsIndexPage;

import { ProjectBoard } from "@/components/project/project-board";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectBoard projectId={id} />;
}

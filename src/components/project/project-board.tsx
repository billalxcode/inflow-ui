// src/components/project/project-board.tsx
"use client";

import { AlertCircle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "@/store/use-projects";

export function ProjectBoard({ projectId }: { projectId: string }) {
  const { getProject } = useProjects();
  const project = getProject(projectId);

  if (!project) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <CardTitle>Project Not Found</CardTitle>
            <CardDescription>
              The project you are looking for does not exist or has been
              deleted.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Board Section - 80% height */}
      <div className="flex-[8] border-b p-4">
        <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">
            React Flow board area (Step 2+)
          </p>
        </div>
      </div>
      {/* Components Section - 20% height */}
      <div className="flex-[2] p-4">
        <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">
            Drag-and-drop components panel (Step 2+)
          </p>
        </div>
      </div>
    </div>
  );
}

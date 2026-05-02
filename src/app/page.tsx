// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutDashboard, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <LayoutDashboard className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to InFlow</CardTitle>
          <CardDescription>
            Network simulation made simple. Create nodes, connect devices, and
            visualize your network topology.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/project" className="w-full">
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Create New Project
            </Button>
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            Select an existing project from the sidebar to continue.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

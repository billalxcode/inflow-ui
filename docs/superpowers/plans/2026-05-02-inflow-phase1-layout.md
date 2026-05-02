# InFlow Phase 1: Layout Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Setup layout shell dengan AppShell, AppSidebar, AppHeader, CreateProjectDialog, dan routing pages untuk InFlow network simulation app.

**Architecture:** Layout menggunakan flexbox dengan fixed sidebar di kiri (~250px) dan content area flex-1 di kanan. Sidebar berisi branding, Projects list dengan navigasi, dan account card footer. Header menampilkan breadcrumb. Semua menggunakan shadcn components.

**Tech Stack:** Next.js 16, React 19, shadcn/ui components, Tailwind CSS v4, @xyflow/react (sudah terinstall)

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              (MODIFY)
│   ├── page.tsx               (MODIFY - welcome)
│   ├── project/
│   │   └── page.tsx           (CREATE - /project)
│   └── project/[id]/
│       └── page.tsx            (CREATE - /project/:id)
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx       (CREATE)
│   │   ├── app-sidebar.tsx     (CREATE)
│   │   └── app-header.tsx      (CREATE)
│   └── project/
│       ├── project-board.tsx   (CREATE - placeholder)
│       └── create-project-dialog.tsx (CREATE)
```

---

## Tasks

### Task 1: Create AppShell Component

**Files:**
- Create: `src/components/layout/app-shell.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create AppShell component**

```tsx
// src/components/layout/app-shell.tsx
"use client";

import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update root layout to use AppShell**

```tsx
// src/app/layout.tsx - replace body content
import { AppShell } from "@/components/layout/app-shell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/app-shell.tsx src/app/layout.tsx
git commit -m "feat: add AppShell layout wrapper"
```

---

### Task 2: Create AppSidebar Component

**Files:**
- Create: `src/components/layout/app-sidebar.tsx`

- [ ] **Step 1: Create AppSidebar component**

```tsx
// src/components/layout/app-sidebar.tsx
"use client";

import Link from "next/link";
import { useProjects } from "@/store/use-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreateProjectDialog } from "@/components/project/create-project-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard } from "lucide-react";

// Static account data (future: from auth)
const account = {
  name: "User",
  email: "user@example.com",
  avatar: "/placeholder-avatar.png",
};

export function AppSidebar() {
  const { projects } = useProjects();

  return (
    <Sidebar className="w-[250px]">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="font-semibold text-lg">InFlow</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/project/${project.id}`}>
                      {project.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <CreateProjectDialog />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={account.avatar} />
                <AvatarFallback>{account.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">{account.name}</span>
                <span className="text-xs text-muted-foreground">
                  {account.email}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/app-sidebar.tsx
git commit -m "feat: add AppSidebar with Projects list and account card"
```

---

### Task 3: Create AppHeader Component

**Files:**
- Create: `src/components/layout/app-header.tsx`

- [ ] **Step 1: Create AppHeader component with breadcrumb**

```tsx
// src/components/layout/app-header.tsx
"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Home", href: "/" }];

  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    const isDynamic = segment.length > 20 || segment.includes("-") && segment.length > 15;

    if (path === "/project") {
      breadcrumbs.push({ label: "Create Project", href: path });
    } else if (path.startsWith("/project/") && path !== "/project") {
      breadcrumbs.push({ label: "Project Board", href: path });
    } else if (path !== "/project") {
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: path,
      });
    }
  }

  return breadcrumbs;
}

export function AppHeader() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header className="flex h-14 items-center border-b px-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={crumb.href}>
              {index < breadcrumbs.length - 1 ? (
                <>
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/app-header.tsx
git commit -m "feat: add AppHeader with breadcrumb navigation"
```

---

### Task 4: Create CreateProjectDialog Component

**Files:**
- Create: `src/components/project/create-project-dialog.tsx`
- Uses: `src/store/use-projects.ts`

- [ ] **Step 1: Create CreateProjectDialog component**

```tsx
// src/components/project/create-project-dialog.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/store/use-projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { addProject } = useProjects();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const project = addProject(name.trim());
    setName("");
    setOpen(false);
    router.push(`/project/${project.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter a name for your network simulation project.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Network Project"
              className="mt-2"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project/create-project-dialog.tsx
git commit -m "feat: add CreateProjectDialog with form and navigation"
```

---

### Task 5: Create Welcome Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace welcome page content**

```tsx
// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
            Network simulation made simple. Create nodes, connect devices, and visualize your network topology.
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: update welcome page with InFlow branding"
```

---

### Task 6: Create /project Page (Create Project Form)

**Files:**
- Create: `src/app/project/page.tsx`

- [ ] **Step 1: Create /project page with form**

```tsx
// src/app/project/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/store/use-projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addProject } = useProjects();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const project = addProject(name.trim(), description.trim() || undefined);
    router.push(`/project/${project.id}`);
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>
            Set up your network simulation project. You can add devices and connections after creation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Network Project"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your network"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" disabled={!name.trim()} className="flex-1">
                Create Project
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/project/page.tsx
git commit -m "feat: add /project create project page"
```

---

### Task 7: Create /project/[id] Page (Project Board)

**Files:**
- Create: `src/app/project/[id]/page.tsx`
- Create: `src/components/project/project-board.tsx`

- [ ] **Step 1: Create ProjectBoard placeholder component**

```tsx
// src/components/project/project-board.tsx
"use client";

import { useParams } from "next/navigation";
import { useProjects } from "@/store/use-projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ProjectBoard() {
  const params = useParams();
  const { getProject } = useProjects();
  const projectId = params.id as string;
  const project = getProject(projectId);

  if (!project) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <CardTitle>Project Not Found</CardTitle>
            <CardDescription>
              The project you are looking for does not exist or has been deleted.
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
```

- [ ] **Step 2: Create /project/[id] page**

```tsx
// src/app/project/[id]/page.tsx
import { ProjectBoard } from "@/components/project/project-board";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  return <ProjectBoard />;
}
```

- [ ] **Step 3: Update ProjectBoard to use async params (Next.js 15+)**

```tsx
// src/components/project/project-board.tsx - update to handle async params
"use client";

import { use } from "react";
// ... keep rest of imports

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
              The project you are looking for does not exist or has been deleted.
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
```

- [ ] **Step 4: Update /project/[id]/page.tsx**

```tsx
// src/app/project/[id]/page.tsx
import { ProjectBoard } from "@/components/project/project-board";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectBoard projectId={id} />;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/project/[id]/page.tsx src/components/project/project-board.tsx
git commit -m "feat: add /project/[id] page with placeholder board"
```

---

### Task 8: Build and Verify

**Files:**
- All modified/created files

- [ ] **Step 1: Run build to check for errors**

```bash
cd /Users/billlaxcode/Projects/ProjectReal/react-flow-next/internet-react-flow
npm run build
```

Expected: Build completes without errors

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```

Verify:
- `/` shows welcome page
- `/project` shows create project form
- Sidebar shows Projects list
- Create Project dialog works
- Account card dropdown works
- Breadcrumb shows correct path

- [ ] **Step 3: Commit remaining changes if any**

```bash
git status
git add -A
git commit -m "feat: complete InFlow Phase 1 layout shell"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - [x] AppShell dengan sidebar + content flex-1
   - [x] Sidebar dengan Projects list dan navigasi
   - [x] Sidebar dengan Create Project dialog
   - [x] Sidebar footer dengan account card
   - [x] Header dengan breadcrumb
   - [x] Welcome page di `/`
   - [x] Create project page di `/project`
   - [x] Project board page di `/project/:id`

2. **Placeholder scan:** Tidak ada TBD/TODO. Semua steps lengkap.

3. **Type consistency:** Semua imports dan component names konsisten.

---

## Plan Complete

**Saved to:** `docs/superpowers/plans/2026-05-02-inflow-phase1-layout.md`

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**

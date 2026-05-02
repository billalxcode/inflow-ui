# InFlow - Layout & Routing Design

## Overview

InFlow adalah aplikasi simulasi jaringan berbasis Next.js dengan React Flow. Phase 1 ini fokus pada setup layout shell, sidebar, routing, dan struktur dasar tanpa interaksi React Flow.

## Arsitektur Folder

```
src/
├── app/
│   ├── layout.tsx              (root layout dengan AppShell)
│   ├── page.tsx               (welcome page - /)
│   ├── project/
│   │   └── page.tsx           (create project - /project)
│   └── project/[id]/
│       └── page.tsx            (project board - /project/:id)
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx       (wrapper: sidebar + content)
│   │   ├── app-sidebar.tsx     (sidebar dengan Projects menu + account card)
│   │   └── app-header.tsx      (breadcrumb header)
│   └── project/
│       ├── project-board.tsx   (React Flow board - placeholder)
│       └── create-project-dialog.tsx (modal untuk create project)
```

## Layout Structure

### AppShell
- Fixed sidebar di kiri dengan lebar ~250px
- Main content area dengan `flex-1` di kanan
- Menggunakan CSS flexbox untuk layout

### Sidebar Structure
1. **Sidebar Header** — branding (logo + title "InFlow")
2. **Sidebar Main Content** — Projects group
   - Tombol "Create Project" di atas list
   - List project dengan nama, klik navigasi ke `/project/:id`
3. **Sidebar Footer** — Account card
   - Avatar + username
   - Click untuk dropdown (future: settings, logout)

### Header
- Breadcrumb navigation
- Menggunakan shadcn Breadcrumb component

## Routing

| Path | Halaman | Fungsi |
|------|---------|--------|
| `/` | Welcome Page | Landing page dengan pesan selamat datang |
| `/project` | Create Project | Form untuk membuat project baru |
| `/project/:id` | Project Board | Board React Flow (placeholder untuk step 2+) |

## Create Project Flow

1. User klik "Create Project" di sidebar footer atau sidebar main
2. Muncul modal/dialog (CreateProjectDialog)
3. User input nama project
4. Submit → project dibuat via `useProjects` store
5. Redirect ke `/project/:id`

## Step-by-Step Plan

### Step 1 (Current) — Layout Shell + Routing
- [x] Setup folder structure
- [ ] Implement AppShell component
- [ ] Implement AppSidebar component
- [ ] Implement AppHeader component
- [ ] Implement CreateProjectDialog
- [ ] Setup routing pages
- [ ] Welcome page

### Step 2 — React Flow Board
- [ ] Setup React Flow provider
- [ ] Basic node types (router, switch, access-point, etc.)
- [ ] ProjectBoard component dengan placeholder

### Step 3 — Drag & Drop Interactions
- [ ] Implement drag-drop dari component panel ke board
- [ ] Node connections

## Technical Notes

- Menggunakan shadcn components yang sudah ada (sidebar, breadcrumb, button, dialog, card, avatar)
- Zustand store untuk project management sudah ada (`useProjects`)
- React Flow (`@xyflow/react`) sudah terinstall
- Tailwind CSS v4 dengan shadcn theme

## Dependencies

- shadcn/ui components: sidebar, breadcrumb, button, dialog, card, avatar, dropdown-menu, input, label, scroll-area, tooltip, separator
- React Flow: `@xyflow/react`
- Icons: lucide-react

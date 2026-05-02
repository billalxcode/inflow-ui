// src/components/layout/app-header.tsx
"use client";

import * as React from "react";
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
          {breadcrumbs.flatMap((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const items: React.ReactNode[] = [
              <BreadcrumbItem key={`item-${crumb.href}`}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>,
            ];

            if (!isLast) {
              items.push(
                <BreadcrumbSeparator key={`sep-${crumb.href}`}>
                  <span className="mx-1">/</span>
                </BreadcrumbSeparator>,
              );
            }

            return items;
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

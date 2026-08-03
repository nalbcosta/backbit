import { ListsDiscoverShell } from "@/components/lists/lists-discover-shell";
import { Suspense } from "react";
export default function ListsDiscoverPage() {
  return (
    <Suspense>
      <ListsDiscoverShell scope="public" />
    </Suspense>
  );
}

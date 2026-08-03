import { Suspense } from "react";

import { ListsDiscoverShell } from "@/components/lists/lists-discover-shell";

export default function PrivateListsDiscoverPage() {
  return (
    <Suspense>
      <ListsDiscoverShell scope="private" />
    </Suspense>
  );
}

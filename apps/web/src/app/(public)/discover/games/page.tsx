import { GamesDiscoverShell } from "@/components/discover/games-discover-shell";
import { Suspense } from "react";

export default function GamesDiscoverPage() {
  return (
    <Suspense>
      <GamesDiscoverShell scope="public" />
    </Suspense>
  );
}

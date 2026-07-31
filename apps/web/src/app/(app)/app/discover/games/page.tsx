import { Suspense } from "react";

import { GamesDiscoverShell } from "@/components/discover/games-discover-shell";

export default function PrivateGamesDiscoverPage() {
  return (
    <Suspense>
      <GamesDiscoverShell scope="private" />
    </Suspense>
  );
}

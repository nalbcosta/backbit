"use client";

import { Container } from "@/components/ui/container";
import { CollectionsSection } from "@/components/discover/collections-section";
import { DiscoverHeader } from "@/components/discover/discover-header";
import { DiscoverFooter } from "@/components/discover/discover-footer";
import { FeaturedRecommendations } from "@/components/discover/featured-recommendations";
import { GameGrid } from "@/components/discover/game-grid";
import { GameModal } from "@/components/discover/game-modal";
import { SearchBar } from "@/components/discover/search-bar";
import { TrendingSection } from "@/components/discover/trending-section";
import { discoverCollections, discoverReviews } from "@/lib/discover/content";
import { getFeaturedItems } from "@/lib/discover/selectors";
import { discoverFilters, useDiscoverState } from "@/hooks/use-discover-state";
import type { DiscoverScope } from "@/lib/discover/discover-routes";

export function DiscoverShell({ scope }: { scope: DiscoverScope }) {
  const state = useDiscoverState();
  return (
    <div className={scope === "public" ? "discover-shell" : ""}>
      {scope === "public" && <DiscoverHeader />}
      <div id="discover-top" className="discover-page">
        <Container className="discover-content flex flex-col gap-6 py-6 sm:gap-8 sm:py-8 lg:gap-0 lg:py-0">
          <FeaturedRecommendations
            games={getFeaturedItems()}
            scope={scope}
            onPreview={state.setSelectedGame}
          />
          <div className="discover-section discover-games-section">
            <SearchBar
              query={state.query}
              onQueryChange={state.setQuery}
              filter={state.filter}
              filters={discoverFilters}
              onFilterChange={state.setFilter}
              sort={state.sort}
              onSortChange={state.setSort}
            />
            <GameGrid
              games={state.games}
              onPreview={state.setSelectedGame}
              scope={scope}
            />
          </div>
          <CollectionsSection collections={discoverCollections} scope={scope} />
          <TrendingSection reviews={discoverReviews} scope={scope} />
        </Container>
      </div>
      {scope === "public" && <DiscoverFooter />}
      <GameModal
        game={state.selectedGame}
        onClose={() => state.setSelectedGame(null)}
        scope={scope}
      />
    </div>
  );
}

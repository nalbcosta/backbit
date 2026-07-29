"use client";

import { Container } from "@/components/ui/container";
import { CollectionsSection } from "@/components/discover/collections-section";
import { DiscoverHeader } from "@/components/discover/discover-header";
import { FeaturedRecommendations } from "@/components/discover/featured-recommendations";
import { GameGrid } from "@/components/discover/game-grid";
import { GameModal } from "@/components/discover/game-modal";
import { SearchBar } from "@/components/discover/search-bar";
import { TrendingSection } from "@/components/discover/trending-section";
import { discoverCollections, discoverReviews } from "@/lib/discover/content";
import { getFeaturedItems } from "@/lib/discover/selectors";
import { discoverFilters, useDiscoverState } from "@/hooks/use-discover-state";

export function DiscoverShell() { const state = useDiscoverState(); return <><DiscoverHeader /><main><Container className="py-10 sm:py-14"><FeaturedRecommendations games={getFeaturedItems()} onPreview={state.setSelectedGame} /><div className="mt-14"><SearchBar query={state.query} onQueryChange={state.setQuery} filter={state.filter} filters={discoverFilters} onFilterChange={state.setFilter} sort={state.sort} onSortChange={state.setSort} /></div><div className="mt-14"><GameGrid games={state.games} onPreview={state.setSelectedGame} /></div><div className="mt-18 border-t border-(--line) pt-14"><CollectionsSection collections={discoverCollections} /></div><div className="mt-18 border-t border-(--line) pt-14"><TrendingSection reviews={discoverReviews} /></div></Container></main><GameModal game={state.selectedGame} onClose={() => state.setSelectedGame(null)} /></>; }

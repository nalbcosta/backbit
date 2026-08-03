import type { ProfileData, ProfileMetric } from "./profile.types";

export function getProfileStats(profile: ProfileData): readonly ProfileMetric[] {
  const playing = profile.recentGames.filter((game) => game.status === "playing").length;
  const saved = profile.savedCollections.reduce((total, collection) => total + collection.games.length, 0);
  const connected = profile.connectedPlatforms.filter((platform) => platform.connected).length;
  return [
    { label: "Em jogo", value: String(playing), detail: playing === 1 ? "um jogo agora" : "jogos no seu ritmo" },
    { label: "Guardados", value: String(saved), detail: "entre favoritos e desejos" },
    { label: "Conexões", value: String(connected), detail: connected ? "plataformas ligadas" : "ainda por ligar" },
  ];
}

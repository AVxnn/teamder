// lib/dota-heroes.ts
interface HeroInfo {
  id: number;
  games: number;
  short: string;
  win: number;
  full: string;
}

let heroesCache: HeroInfo[] | null = null;

export async function getHeroInfo(heroId: {win: number, games: number, hero_id: number}) {
  if (!heroesCache) {
    const response = await fetch('https://api.opendota.com/api/heroes');
    const data = await response.json();
    heroesCache = data.map((hero: { id: number; name: string; localized_name: string }) => ({
      id: hero.id,
      games: heroId.games,
      win: heroId.win,
      short: hero.name.replace('npc_dota_hero_', ''),
      full: hero.localized_name
    }));
  }

  return heroesCache.find(h => h.id === heroId?.hero_id) || 
    { id: 0, short: 'unknown', full: 'Unknown Hero' };
}
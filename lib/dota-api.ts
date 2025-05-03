export async function getPlayerData(accountId: string) {
  // Основная информация
  const playerRes = await fetch(`https://api.opendota.com/api/players/${accountId}`);
  const playerData = await playerRes.json();

  // Статистика по вин/лосу
  const wlRes = await fetch(`https://api.opendota.com/api/players/${accountId}/wl`);
  const winLossData = await wlRes.json();

  // Статистика по героям
  const heroesRes = await fetch(`https://api.opendota.com/api/players/${accountId}/heroes`);
  const heroesData = await heroesRes.json();

  return {
    profile: playerData.profile,
    mmr: playerData.mmr_estimate,
    winLoss: winLossData,
    mostPlayedHero: heroesData[0] // Самый играемый герой
  };
}

interface Hero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: 'str' | 'agi' | 'int' | 'all';
  attack_type: 'Melee' | 'Ranged';
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_mana: number;
  move_speed: number;
}

let heroesCache: Hero[] | null = null;

export async function getAllHeroes(): Promise<Hero[]> {
  if (heroesCache) return heroesCache;

  try {
    const response = await fetch('https://api.opendota.com/api/heroes');
    if (!response.ok) throw new Error('Failed to fetch heroes');
    
    heroesCache = await response.json();
    return heroesCache;
  } catch (error) {
    console.error('Error fetching heroes:', error);
    return [];
  }
}

interface HeroNames {
  id: number;
  short: string; // internal name (antimage)
  full: string;  // localized name (Anti-Mage)
  icon: string;  // URL to icon
}

let heroNamesCache: HeroNames[] | null = null;

export async function getHeroName(heroId: number, options: {
  fullName?: boolean;
  withIcon?: boolean;
} = {}): Promise<string | HeroNames> {
  if (!heroNamesCache) {
    const heroes = await getAllHeroes();
    heroNamesCache = heroes.map(hero => ({
      id: hero.id,
      short: hero.name.replace('npc_dota_hero_', ''),
      full: hero.localized_name,
      icon: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace('npc_dota_hero_', '')}.png`
    }));
  }

  const hero = heroNamesCache.find(h => h.id === heroId);
  
  if (!hero) {
    return options.withIcon 
      ? { id: 0, short: 'unknown', full: 'Unknown Hero', icon: '' }
      : 'Unknown Hero';
  }

  if (options.withIcon) {
    return hero;
  }

  return options.fullName ? hero.full : hero.short;
}
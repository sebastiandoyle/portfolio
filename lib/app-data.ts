export interface AppInfo {
  name: string;
  slug: string;
  icon: string;
  status: 'live' | 'review' | 'development';
  appStoreUrl?: string;
  screenshots?: string[];
  description?: string;
  version?: string;
  category?: string;
}

export const FEATURED_APP: AppInfo & {
  stats: { label: string; value: string }[];
} = {
  name: 'Imposter',
  slug: 'imposter',
  icon: '/apps/icons/imposter.png',
  status: 'live',
  appStoreUrl: 'https://apps.apple.com/app/id6756529558',
  screenshots: [
    '/apps/screenshots/imposter/1.png',
    '/apps/screenshots/imposter/2.png',
    '/apps/screenshots/imposter/3.png',
    '/apps/screenshots/imposter/4.png',
    '/apps/screenshots/imposter/5.png',
  ],
  description: 'A real-time party word game for 3-12 players. Built, localized into 35 languages, and shipped to the App Store entirely by the pipeline. Over 1,400 downloads and counting.',
  version: '1.2.0',
  category: 'Party Game',
  stats: [
    { label: 'Impressions', value: '38.2K' },
    { label: 'Downloads', value: '1,420' },
    { label: 'Sessions', value: '3,540' },
  ],
};

export const SHOWCASE_APPS: AppInfo[] = [
  {
    name: 'Imposter',
    slug: 'imposter',
    icon: '/apps/icons/imposter.png',
    status: 'live',
    appStoreUrl: 'https://apps.apple.com/app/id6756529558',
  },
  {
    name: 'CleanSnap',
    slug: 'cleansnap',
    icon: '/apps/icons/cleansnap.png',
    status: 'review',
    appStoreUrl: 'https://apps.apple.com/app/id6756944040',
  },
  {
    name: 'ZenDot',
    slug: 'zendot',
    icon: '/apps/icons/zendot.png',
    status: 'review',
    appStoreUrl: 'https://apps.apple.com/app/id6757347478',
  },
  {
    name: 'FlipCoin',
    slug: 'flipcoin',
    icon: '/apps/icons/flipcoin.png',
    status: 'review',
    appStoreUrl: 'https://apps.apple.com/app/id6757352913',
  },
  {
    name: 'DiceRoll',
    slug: 'diceroll',
    icon: '/apps/icons/diceroll.png',
    status: 'review',
  },
  {
    name: 'FocusOne',
    slug: 'focusone',
    icon: '/apps/icons/focusone.png',
    status: 'live',
  },
  {
    name: 'WindDown',
    slug: 'winddown',
    icon: '/apps/icons/winddown.png',
    status: 'live',
  },
  {
    name: 'Anchor',
    slug: 'anchor',
    icon: '/apps/icons/anchor.png',
    status: 'live',
  },
  {
    name: 'Stillpoint',
    slug: 'stillpoint',
    icon: '/apps/icons/stillpoint.png',
    status: 'live',
  },
  {
    name: 'Steadily',
    slug: 'steadily',
    icon: '/apps/icons/steadily.png',
    status: 'live',
  },
  {
    name: 'Serenify',
    slug: 'serenify',
    icon: '/apps/icons/serenify.png',
    status: 'live',
  },
  {
    name: 'HydroMind',
    slug: 'hydromind',
    icon: '/apps/icons/hydromind.png',
    status: 'live',
  },
  {
    name: 'Dusk',
    slug: 'dusk',
    icon: '/apps/icons/dusk.png',
    status: 'live',
  },
  {
    name: 'DawnCalm',
    slug: 'dawncalm',
    icon: '/apps/icons/dawncalm.png',
    status: 'live',
  },
];

export const FOUNDRY_STATS = [
  { value: 67800, label: 'Impressions' },
  { value: 1792, label: 'Downloads' },
  { value: 11, label: 'Apps Live' },
];

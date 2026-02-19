import type { Game } from '../types';

export const games: Game[] = [
  {
    slug: 'on-tape-rewind',
    title: 'On Tape << Rewind',
    tagline: 'A chilling detective story told through cassette tapes.',
    description:
      'Play back recordings, search for clues, discover hidden cassettes, and manipulate audio to unravel the disappearance of physicist Fred Karlsen during the Cold War. Something listened back.',
    accentColor: '#4ECDC4',
    platforms: ['steam', 'pc', 'console'],
    status: 'coming-soon',
    releaseYear: '2027',
    genre: ['Psychological Horror', 'Mystery', 'Cold War'],
    storeLinks: {},
    features: [
      {
        icon: 'Disc3',
        title: 'Play Tapes',
        description:
          'Listen to cassette recordings from the Cold War era, each hiding fragments of the truth.',
      },
      {
        icon: 'Search',
        title: 'Search for Clues',
        description:
          'Investigate locations, examine evidence, and piece together what happened to Fred Karlsen.',
      },
      {
        icon: 'AudioLines',
        title: 'Manipulate Audio',
        description:
          'Rewind, fast-forward, and adjust frequencies to reveal hidden messages in the recordings.',
      },
      {
        icon: 'Eye',
        title: 'Unravel the Mystery',
        description:
          'Discover the chilling truth behind the disappearance — and what was listening all along.',
      },
    ],
  },
  {
    slug: 'neon-zone',
    title: 'Neon Zone',
    tagline: 'A futuristic, action-packed, arcade-inspired mobile game.',
    description:
      'Control the Velosphere — a high-tech vehicle — through intricate 2D mazes in a neon-drenched future. Fast reflexes, sharp turns, and split-second decisions.',
    accentColor: '#FF006E',
    platforms: ['ios', 'android'],
    status: 'released',
    releaseYear: '2024',
    genre: ['Arcade', 'Action', 'Futuristic'],
    storeLinks: {
      appStore: 'https://apps.apple.com/no/app/neon-zone/id6499206288',
      googlePlay:
        'https://play.google.com/store/apps/details?id=com.pixforkGames.NeonZone',
    },
    features: [
      {
        icon: 'Zap',
        title: 'High-Speed Action',
        description:
          'Navigate through intricate mazes at breakneck speeds with precision controls.',
      },
      {
        icon: 'Gamepad2',
        title: 'Arcade-Inspired',
        description:
          'Classic arcade gameplay meets futuristic neon aesthetics.',
      },
      {
        icon: 'Trophy',
        title: 'Challenge Yourself',
        description:
          'Master increasingly complex levels and compete for the highest scores.',
      },
    ],
  },
  {
    slug: 'ascending',
    title: 'Ascending — A Globsters Story',
    tagline: 'Swim from the depths to the surface. Survive the ocean.',
    description:
      'You control a Globster, swimming from the bottom of the sea towards the surface. Navigate treacherous ocean depths, avoid dangers, and discover the mysteries hidden beneath the waves.',
    accentColor: '#0077B6',
    platforms: ['ios', 'android'],
    status: 'released',
    releaseYear: '2023',
    genre: ['Adventure', 'Casual', 'Ocean'],
    storeLinks: {
      appStore: 'https://apps.apple.com/us/developer/pixfork-games-as/id1623658117',
    },
    features: [
      {
        icon: 'Waves',
        title: 'Ocean Exploration',
        description:
          'Dive deep and discover what lurks beneath the waves as you ascend to the surface.',
      },
      {
        icon: 'Fish',
        title: 'Play as a Globster',
        description:
          'Control a unique sea creature on its journey upward through the ocean layers.',
      },
      {
        icon: 'Sparkles',
        title: 'Beautiful Depths',
        description:
          'Experience hand-crafted ocean environments full of wonder and danger.',
      },
    ],
  },
];

import type { TeamMember } from '../types';

export const team: TeamMember[] = [
  {
    name: 'Erlend Dal Sakshaug',
    role: 'CEO / Game Designer',
    image: '/images/team/erlend.jpg',
    funStats: [
      { label: 'Game Design', value: 95 },
      { label: 'Coffee Intake', value: 99 },
      { label: 'Creativity', value: 92 },
      { label: 'Bug Squashing', value: 88 },
    ],
  },
  {
    name: 'Bendik Hval',
    role: 'Composer',
    image: '/images/team/bendik.jpg',
    funStats: [
      { label: 'Music', value: 97 },
      { label: 'Sound Design', value: 94 },
      { label: 'Tape Hiss', value: 100 },
      { label: 'Creativity', value: 93 },
    ],
  },
  {
    name: 'Audun Roberg',
    role: 'Art Director',
    image: '/images/team/audun.jpg',
    funStats: [
      { label: 'Pixel Art', value: 96 },
      { label: 'Visual Design', value: 95 },
      { label: 'Neon Glow', value: 99 },
      { label: 'Creativity', value: 94 },
    ],
  },
  {
    name: 'Marius Vibe',
    role: 'Developer',
    image: '/images/team/marius.jpg',
    funStats: [
      { label: 'Coding', value: 96 },
      { label: 'Debugging', value: 91 },
      { label: 'Coffee Intake', value: 97 },
      { label: 'Creativity', value: 90 },
    ],
  },
];

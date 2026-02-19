export interface Game {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  platforms: ('ios' | 'android' | 'steam' | 'pc' | 'console')[];
  status: 'released' | 'coming-soon';
  releaseYear: string;
  genre: string[];
  storeLinks: {
    appStore?: string;
    googlePlay?: string;
    steam?: string;
  };
  features?: { icon: string; title: string; description: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  funStats: { label: string; value: number }[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

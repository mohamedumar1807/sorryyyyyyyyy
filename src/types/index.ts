export interface SisterPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  tag: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  highlight?: string;
}

export interface PromiseItem {
  id: number;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ChapterMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
}

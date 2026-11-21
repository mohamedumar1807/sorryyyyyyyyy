import { SisterPhoto, PromiseItem, ChapterMeta } from '../types';

export const chapters: ChapterMeta[] = [
  {
    id: 1,
    slug: 'my-thanga-pulla',
    title: 'My Thanga Pulla',
    subtitle: 'A Royal Surprise',
    tagline: 'Welcome to your little kingdom, Princess. 👑'
  },
  {
    id: 2,
    slug: 'im-sorry-pa',
    title: "I'm Sorry, Pa",
    subtitle: 'From My Heart to Yours',
    tagline: 'A genuine apology, not just an empty word.'
  },
  {
    id: 3,
    slug: 'not-a-stranger',
    title: 'You Are Not A Stranger',
    subtitle: 'The Most Important Words',
    tagline: 'Nee enakku stranger illa pa... Eppovume! ❤️'
  },
  {
    id: 4,
    slug: 'my-princess',
    title: 'Princess Of This World',
    subtitle: 'Through A Brother’s Eyes',
    tagline: 'Every world has a princess. Mine is you.'
  },
  {
    id: 5,
    slug: 'always-special',
    title: 'You Were Always Special',
    subtitle: 'Even Before I Said Sorry',
    tagline: 'You matter more than my ego and any stupid argument.'
  },
  {
    id: 6,
    slug: 'five-memories',
    title: 'Five Little Windows',
    subtitle: 'Into My Favourite Person’s World',
    tagline: 'Little moments. Different versions of you. One very special person.'
  },
  {
    id: 7,
    slug: 'my-promises',
    title: 'My Promise To You',
    subtitle: 'Actions Louder Than Words',
    tagline: 'I don’t want you to question your place in my life.'
  },
  {
    id: 8,
    slug: 'final-letter',
    title: 'The Final Letter',
    subtitle: 'Forever Your Brother',
    tagline: 'You are my princess. You are my Thanga Pulla. You are my world.'
  }
];

export const defaultPhotos: SisterPhoto[] = [
  {
    id: 'photo-1-childhood',
    src: '/images/photo-1-childhood.jpg',
    alt: 'Childhood school photograph with blue background and blue ribbons',
    title: 'Where It All Began',
    caption: 'From this little girl to the beautiful princess you are today. ❤️',
    tag: 'Childhood Memory',
    aspectRatio: 'portrait',
    highlight: 'Blue ribbons, school days & pure innocence'
  },
  {
    id: 'photo-2-flower',
    src: '/images/photo-2-flower.png',
    alt: 'Photograph with long dark hair and pink flower sticker',
    title: 'Pure Radiance',
    caption: 'That beautiful smile of my Thanga Pulla.',
    tag: 'Flower Selfie',
    aspectRatio: 'portrait',
    highlight: 'The smile that lights up any dark day'
  },
  {
    id: 'photo-3-green',
    src: '/images/photo-3-green.jpg',
    alt: 'Close-up photograph with green outfit',
    title: 'Grace & Elegance',
    caption: 'My beautiful princess, forever special.',
    tag: 'Royal Portrait',
    aspectRatio: 'portrait',
    highlight: 'Quiet strength and timeless grace'
  },
  {
    id: 'photo-4-baby',
    src: '/images/photo-4-baby.jpg',
    alt: 'Photograph of sister holding a baby',
    title: 'Gentle & Caring Heart',
    caption: 'A beautiful little moment worth keeping.',
    tag: 'Candid Love',
    aspectRatio: 'landscape',
    highlight: 'Seeing your kind, caring soul in every frame'
  },
  {
    id: 'photo-5-thalapathy',
    src: '/images/photo-5-thalapathy.jpg',
    alt: 'Sister wearing black Thalapathy Verse T-shirt from behind',
    title: 'The Ultimate Fan',
    caption: 'My favourite Thalapathy fan. ❤️',
    tag: 'Playful Vibe',
    aspectRatio: 'portrait',
    highlight: 'Unmatched attitude, style and swag'
  }
];

export const promisesList: PromiseItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Listen Before Reacting',
    description: 'To pause my instant reactions and actually listen to how you feel, with patience instead of defensiveness.',
    iconName: 'Ear'
  },
  {
    id: 2,
    number: '02',
    title: 'Think Before Speaking',
    description: 'To weigh my words before letting frustration take over, because careless words leave scars I never intended.',
    iconName: 'MessageSquareHeart'
  },
  {
    id: 3,
    number: '03',
    title: 'Respect Your Feelings Even In Fights',
    description: 'Even when we disagree or get angry, I promise to remember your feelings matter just as much as mine.',
    iconName: 'ShieldCheck'
  },
  {
    id: 4,
    number: '04',
    title: 'Never Use Silence Or Ego As A Weapon',
    description: 'To never make you feel unwanted or isolated with cold silence. My ego will never be more important than you.',
    iconName: 'HeartHandshake'
  },
  {
    id: 5,
    number: '05',
    title: 'Appreciate You On Ordinary Days',
    description: 'To make you feel loved and valued regularly, not just after a mistake when an apology is due.',
    iconName: 'Sparkles'
  },
  {
    id: 6,
    number: '06',
    title: 'Show My Love Through Real Actions',
    description: 'To back up my words with patience, warmth, laughter, and consistent care every single day.',
    iconName: 'Gem'
  }
];

const yamiPhoto = (filename) => `/Yami/${encodeURIComponent(filename)}`;

export const YAMI_NAME = 'Yami';
export const BIRTHDAY_DATE = 'July 8, 2026';
export const BIRTHDAY_AGE = 1;

export const heroPortrait = yamiPhoto('WhatsApp Image 2026-07-08 at 1.14.30 AM.jpeg');

export const galleryPhotos = [
  { src: yamiPhoto('WhatsApp Image 2026-07-08 at 1.14.30 AM.jpeg'), caption: 'Birthday Girl ✨', subtitle: 'July 8, 2026' },
  { src: yamiPhoto('10 MONTH.JPG.jpeg'), caption: 'Almost One!', subtitle: '10 Months Old' },
  { src: yamiPhoto('8 month.JPG.jpeg'), caption: 'Growing So Fast', subtitle: '8 Months Old' },
  { src: yamiPhoto('IMG_0815.JPG.jpeg'), caption: 'Pure Sunshine', subtitle: 'Our Little Star' },
  { src: yamiPhoto('IMG_0803.JPG.jpeg'), caption: 'Sweet Giggles', subtitle: 'Joy in Every Smile' },
  { src: yamiPhoto('IMG_0791.JPG.jpeg'), caption: 'Curious Explorer', subtitle: 'Discovering the World' },
  { src: yamiPhoto('IMG_0762.JPG.jpeg'), caption: 'Cozy Cuddles', subtitle: 'Wrapped in Love' },
  { src: yamiPhoto('ABC_4435.JPG.jpeg'), caption: 'Picture Perfect', subtitle: 'A Moment to Treasure' },
  { src: yamiPhoto('ABC_2959.JPG.jpeg'), caption: 'Little Princess', subtitle: 'Radiating Magic' },
  { src: yamiPhoto('ABC_2914.JPG.jpeg'), caption: 'Bright Eyes', subtitle: 'Full of Wonder' },
  { src: yamiPhoto('ABC_2871.JPG.jpeg'), caption: 'Adventure Awaits', subtitle: 'Brave & Beautiful' },
  { src: yamiPhoto('ABC_2134.JPG.jpeg'), caption: 'Playtime Magic', subtitle: 'Every Day is Fun' },
  { src: yamiPhoto('ABC_2068.JPG.jpeg'), caption: 'Tiny Dancer', subtitle: 'Moving to Her Own Beat' },
  { src: yamiPhoto('ABC_8991.JPG.jpeg'), caption: 'Golden Moments', subtitle: 'Memories Forever' },
  { src: yamiPhoto('ABC_8960.JPG.jpeg'), caption: 'Bubbly & Bright', subtitle: 'Lighting Up Our Lives' },
  { src: yamiPhoto('ABC_8890.JPG.jpeg'), caption: 'Heart Stealer', subtitle: 'One Look at a Time' },
  { src: yamiPhoto('ABC_8174.JPG.jpeg'), caption: 'Dreamy Days', subtitle: 'Soft & Serene' },
  { src: yamiPhoto('ABC_8172.JPG.jpeg'), caption: 'Little Angel', subtitle: 'Heaven Sent' },
  { src: yamiPhoto('ABC_8148.JPG.jpeg'), caption: 'Sparkle & Shine', subtitle: 'Born to Glow' },
  { src: yamiPhoto('ABC_8112.JPG.jpeg'), caption: 'Cherished Always', subtitle: 'Our Greatest Gift' },
  { src: yamiPhoto('ABC_8067.JPG.jpeg'), caption: 'Year One', subtitle: 'A Whole Year of Love' },
];

export const timelineMilestones = [
  {
    id: 1,
    title: 'Welcome to the World',
    date: 'July 8, 2025',
    text: 'The day our hearts grew bigger and our world became infinitely more magical.',
    photo: yamiPhoto('IMG_0762.JPG.jpeg'),
  },
  {
    id: 2,
    title: 'First Smile',
    date: '2 Months',
    text: 'The day the whole world lit up with just one little smile from Yami.',
    photo: yamiPhoto('ABC_2068.JPG.jpeg'),
  },
  {
    id: 3,
    title: '8 Months of Wonder',
    date: 'March 2026',
    text: 'Curious, bubbly, and full of personality — our little explorer was on the move.',
    photo: yamiPhoto('8 month.JPG.jpeg'),
  },
  {
    id: 4,
    title: '10 Months & Counting',
    date: 'May 2026',
    text: 'Almost one! Every giggle, every babble, every wobbly step felt like a celebration.',
    photo: yamiPhoto('10 MONTH.JPG.jpeg'),
  },
  {
    id: 5,
    title: 'Happy 1st Birthday, Yami!',
    date: 'July 8, 2026',
    text: 'One whole year of love, laughter, cuddles, and endless joy. Today we celebrate YOU!',
    photo: yamiPhoto('WhatsApp Image 2026-07-08 at 1.14.30 AM.jpeg'),
  },
];

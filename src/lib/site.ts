export const SITE = 'https://abitamo.com';

export const AUTHOR = {
  '@type': 'Person',
  name: 'Vasco Ramos',
  sameAs: ['https://www.linkedin.com/in/vascoramos/'],
} as const;

export const AUTHOR_URL = AUTHOR.sameAs[0];

export const PUBLISHER = {
  '@type': 'Organization',
  name: 'Abitamo',
  url: 'https://abitamo.com',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/blog-assets/images/logo.png`,
  },
} as const;

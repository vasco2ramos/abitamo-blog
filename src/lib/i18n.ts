import type { Lang } from './urls.js';

export const ui = {
  es: {
    goToApp: 'Ir a Abitamo',
    terms: 'Términos',
    privacy: 'Privacidad',
    published: 'Publicado el',
    updated: 'Actualizado el',
    by: 'Por',
    faq: 'Preguntas frecuentes',
    sources: 'Fuentes',
    blog: 'Blog',
    footerAi: 'Verificación con IA',
    footerSsl: 'Conexión SSL segura',
    footerEu: 'Datos alojados en la UE',
    footerCountries: 'España y Portugal',
    footerRights: 'Todos los derechos reservados.',
    dateLocale: 'es-ES',
    blogTitle: 'Blog de Abitamo',
    blogTagline: 'Mercado del alquiler, regulación y producto — con fuentes verificadas.',
    blogDescription: 'Guías y datos sobre el mercado del alquiler en España y Portugal, y cómo Abitamo verifica inquilinos y propietarios.',
    noPosts: 'Todavía no hay artículos publicados.',
  },
  pt: {
    goToApp: 'Ir para a Abitamo',
    terms: 'Termos',
    privacy: 'Privacidade',
    published: 'Publicado em',
    updated: 'Atualizado em',
    by: 'Por',
    faq: 'Perguntas frequentes',
    sources: 'Fontes',
    blog: 'Blog',
    footerAi: 'Verificação com IA',
    footerSsl: 'Ligação SSL segura',
    footerEu: 'Dados alojados na UE',
    footerCountries: 'Espanha e Portugal',
    footerRights: 'Todos os direitos reservados.',
    dateLocale: 'pt-PT',
    blogTitle: 'Blog da Abitamo',
    blogTagline: 'Mercado de arrendamento, regulação e produto — com fontes verificadas.',
    blogDescription: 'Guias e dados sobre o mercado de arrendamento em Espanha e Portugal, e como a Abitamo verifica inquilinos e proprietários.',
    noPosts: 'Ainda não há artigos publicados.',
  },
  en: {
    goToApp: 'Go to Abitamo',
    terms: 'Terms',
    privacy: 'Privacy',
    published: 'Published on',
    updated: 'Updated on',
    by: 'By',
    faq: 'Frequently asked questions',
    sources: 'Sources',
    blog: 'Blog',
    footerAi: 'AI verification',
    footerSsl: 'Secure SSL connection',
    footerEu: 'Data hosted in the EU',
    footerCountries: 'Spain and Portugal',
    footerRights: 'All rights reserved.',
    dateLocale: 'en-GB',
    blogTitle: 'Abitamo Blog',
    blogTagline: 'Rental market, regulation and product — with verified sources.',
    blogDescription: 'Guides and data on the rental market in Spain and Portugal, and how Abitamo verifies tenants and landlords.',
    noPosts: 'No articles published yet.',
  },
} satisfies Record<Lang, Record<string, string>>;

export function t(lang: string) {
  return ui[(lang in ui ? lang : 'es') as Lang];
}

// Dates in frontmatter parse as UTC midnight; format in UTC so the build
// machine's timezone can't shift the day.
export function formatDate(date: Date, lang: string): string {
  return date.toLocaleDateString(t(lang).dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

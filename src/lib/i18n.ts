import type { Lang } from './urls';

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

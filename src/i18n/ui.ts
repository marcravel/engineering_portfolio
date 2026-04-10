export const languages = {
  en: 'English',
  fr: 'Français',
  tr: 'Türkçe',
};

export const flags = {
  en: '🇬🇧',
  fr: '🇫🇷',
  tr: '🇹🇷',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'footer.github': 'GitHub',
    'footer.linkedin': 'LinkedIn',
    'footer.contact': 'Contact',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'footer.github': 'GitHub',
    'footer.linkedin': 'LinkedIn',
    'footer.contact': 'Contact',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkında',
    'nav.projects': 'Projeler',
    'nav.contact': 'İletişim',
    'footer.github': 'GitHub',
    'footer.linkedin': 'LinkedIn',
    'footer.contact': 'İletişim',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = url.pathname;
  if (path.startsWith(base)) {
    path = path.slice(base.length);
  }
  if (!path.startsWith('/')) path = '/' + path;

  const segments = path.split('/');
  const lang = segments[1];
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    let normalizedPath = path.startsWith('/') ? path : '/' + path;
    if (normalizedPath === '/') normalizedPath = '';

    if (l === defaultLang) {
      return `${base}${normalizedPath}` || base + '/';
    }
    return `${base}/${l}${normalizedPath}` || base + '/' + l + '/';
  }
}

export function getRouteFromUrl(url: URL): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = url.pathname;
  if (path.startsWith(base)) {
    path = path.slice(base.length);
  }
  if (!path.startsWith('/')) path = '/' + path;

  const segments = path.split('/');
  if (segments[1] in ui) {
    // Remove language segment
    segments.splice(1, 1);
    const remaining = segments.join('/');
    return remaining === '' ? '/' : remaining;
  }
  return path;
}

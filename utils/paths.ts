const trimLeadingSlashes = (value: string) => value.replace(/^\/+/, '');

const normalizeBase = (value: string) => {
  if (!value || value === '/') {
    return '/';
  }

  return `/${trimLeadingSlashes(value).replace(/\/+$/, '')}/`;
};

export const BASE_URL = normalizeBase(import.meta.env.BASE_URL || '/');

export const withBasePath = (assetPath: string) => {
  if (/^(?:[a-z]+:)?\/\//i.test(assetPath) || assetPath.startsWith('#')) {
    return assetPath;
  }

  return `${BASE_URL}${trimLeadingSlashes(assetPath)}`;
};

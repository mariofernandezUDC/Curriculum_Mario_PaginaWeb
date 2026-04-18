import fs from 'node:fs/promises';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const DEFAULT_SITE_URL = 'https://mariofernandez.me';

const trimLeadingSlashes = (value: string) => value.replace(/^\/+/, '');

const normalizeBase = (value: string | undefined) => {
  if (!value || value === '/') {
    return '/';
  }

  return `/${value.replace(/^\/+/, '').replace(/\/+$/, '')}/`;
};

const normalizeSiteUrl = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return DEFAULT_SITE_URL;
  }

  const valueWithProtocol = /^[a-z]+:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
  return valueWithProtocol.replace(/\/+$/, '');
};

const buildPublicPath = (basePath: string, assetPath = '') => {
  const normalizedBase = normalizeBase(basePath);

  if (!assetPath) {
    return normalizedBase;
  }

  return `${normalizedBase}${trimLeadingSlashes(assetPath)}`;
};

const resolveSiteUrl = async () => {
  const siteUrlFromEnv = process.env.SITE_URL;

  if (siteUrlFromEnv) {
    return normalizeSiteUrl(siteUrlFromEnv);
  }

  try {
    const customDomain = await fs.readFile(path.resolve(__dirname, 'public', 'CNAME'), 'utf8');
    if (customDomain.trim()) {
      return normalizeSiteUrl(customDomain);
    }
  } catch {
    // Ignore missing CNAME files and fall back to the default domain.
  }

  return DEFAULT_SITE_URL;
};

const PUBLISHED_CONTENT_FILES = [
  'brad_eolic2.jpg',
  'British_Council_logo.png',
  'bureau_veritas_logo.png',
  'cnc_1.png',
  'cnc_2.png',
  'CV_Mario_Fernandez.pdf',
  'Disco_cicloidal.STL',
  'disco_pasadores.STL',
  'F1.STL',
  'mario.png',
  'Microsoft_logo.png',
  'Navantia_logo.png',
  'nave.png',
  'pistola.png',
  'rad_eolic.jpg',
  'Render_Taladro_Cicloidal_.STL',
  'sandvik_logo.png',
  'texas_logo.png',
  'Windchill_logo.png',
] as const;

const copyPublishedContent = () => ({
  name: 'copy-published-content',
  apply: 'build' as const,
  async closeBundle() {
    const sourceDir = path.resolve(__dirname, 'contenido');
    const targetDir = path.resolve(__dirname, 'dist', 'contenido');

    await fs.mkdir(targetDir, { recursive: true });

    await Promise.all(
      PUBLISHED_CONTENT_FILES.map(async (fileName) => {
        const sourcePath = path.join(sourceDir, fileName);
        const targetPath = path.join(targetDir, fileName);

        try {
          await fs.copyFile(sourcePath, targetPath);
        } catch (error) {
          throw new Error(`Unable to publish required asset "${fileName}": ${String(error)}`);
        }
      }),
    );
  },
});

const generateSeoFiles = () => ({
  name: 'generate-seo-files',
  apply: 'build' as const,
  async closeBundle() {
    const distDir = path.resolve(__dirname, 'dist');
    const siteUrl = await resolveSiteUrl();
    const basePath = normalizeBase(process.env.GITHUB_PAGES_BASE);
    const sitemapUrl = new URL(buildPublicPath(basePath, 'sitemap.xml'), `${siteUrl}/`).toString();
    const lastModifiedAt = new Date().toISOString();
    const sitemapEntries = [
      {
        path: buildPublicPath(basePath),
        changefreq: 'weekly',
        priority: '1.0',
      },
      {
        path: buildPublicPath(basePath, 'privacy-policy.html'),
        changefreq: 'yearly',
        priority: '0.3',
      },
    ];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${new URL(entry.path, `${siteUrl}/`).toString()}</loc>
    <lastmod>${lastModifiedAt}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

    const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

    await Promise.all([
      fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8'),
      fs.writeFile(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8'),
    ]);
  },
});

export default defineConfig({
  base: normalizeBase(process.env.GITHUB_PAGES_BASE),
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), copyPublishedContent(), generateSeoFiles()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});

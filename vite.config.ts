import fs from 'node:fs/promises';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const normalizeBase = (value: string | undefined) => {
  if (!value || value === '/') {
    return '/';
  }

  return `/${value.replace(/^\/+/, '').replace(/\/+$/, '')}/`;
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

export default defineConfig({
  base: normalizeBase(process.env.GITHUB_PAGES_BASE),
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), copyPublishedContent()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});

# Mario Fernandez Portfolio

Portfolio tecnico desarrollado con React y Vite.

## Desarrollo local

Requisitos: Node.js

1. Instala dependencias con `npm install`
2. Ejecuta la app con `npm run dev`

## Build de publicacion

1. Genera la version final con `npm run build`
2. Publica el contenido de `dist`

El build copia unicamente los ficheros de `contenido/` que realmente usa la web, para evitar publicar material no referenciado por error.

## GitHub Pages

El workflow de [deploy.yml](.github/workflows/deploy.yml) despliega automaticamente desde `main`.

- Si el repositorio es de proyecto, usa `/<repo>/` como base.
- Si el repositorio es `usuario.github.io`, usa `/` como base.

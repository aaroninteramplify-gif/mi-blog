# Blog con Next.js + API Phantom

Proyecto de frontend de un blog headless desarrollado con **Next.js 16**, conectado a la API de **0xPhantom**.


## Tecnologías que he utilizado

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- API REST (0xPhantom)


## Funcionalidades

- Listado de posts (`/blog`)
- Página de detalle (`/blog/[slug]`)
- Renderizado de contenido dinámico (EditorJS)
- Paginación de artículos
- Animaciones en tarjetas (hover)
- Generación estática (SSG)
- Revalidación automática cada 60s


## Seguridad

- El token de la API **NO estaría expuesto en el cliente**
- Uso de variables de entorno privadas (`.env.local`)
- Todas las llamadas a la API se harían en el servidor


## Instalación

```bash
pnpm install
pnpm dev
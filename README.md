# Blog de recetas – Next.js + API 0xPhantom

Frontend de un blog headless construido con Next.js conectado a la API de 0xPhantom.

---

## Tecnologías

- Next.js 16
- React 19
- Tailwind CSS v4
- TypeScript
- EditorJS Renderer
- API REST (0xPhantom)

---

## Rutas principales

- `/blog` → listado de recetas
- `/blog/[slug]` → detalle de receta
- `/contacto` → página CMS desde API
- `/sobre-nosotros` → página CMS desde API

---

## API

Los datos se obtienen desde la API de 0xPhantom mediante `fetch` en Server Components.

Funciones principales:

- `getPosts()` → listado paginado
- `getPost(slug)` → detalle
- `getRelatedPosts(slug)` → relacionados
- `getPage(slug)` → páginas CMS

---

## Funcionalidades implementadas

 Listado de recetas dinámico  
 Página de detalle con contenido renderizado (EditorJS)  
 FAQ dinámicas desde la API  
 Tags por receta  
 Posts relacionados (API)  
 Paginación  
 Diseño UI tipo web real (inspirado en Recetillas)  
 Animaciones con Framer Motion  



## Seguridad

- El token de la API **NO estaría expuesto en el cliente**
- Uso de variables de entorno privadas (`.env.local`)
- Todas las llamadas a la API se harían en el servidor


## Instalación

```bash
pnpm install
pnpm dev
# titiStore Web

Aplicación React (Vite + TailwindCSS) que consume la API de titiStore y entrega la experiencia de e‑commerce y panel admin. Este repositorio está pensado para trabajar de forma aislada del backend.

## Requisitos

- Node.js ≥ 20
- npm ≥ 10

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala dependencias. |
| `npm run dev` | Levanta Vite en modo desarrollo (por defecto `http://localhost:5173`). |
| `npm run build` | Genera artefactos estáticos en `dist/`. |
| `npm run preview` | Sirve el build para verificación local. |

## Variables de entorno

Crear `.env` (o `.env.local`) con:

```
VITE_API_URL=http://localhost:3000/api
```

## Estructura principal

```
src/
├── api/             # Clientes Axios (auth, products, cart, orders, etc.)
├── assets/          # Imágenes / fuentes compartidas
├── components/
│   ├── layout/      # Navbar, Footer y contenedores comunes
│   └── ui/          # Componentes reutilizables (ProductCard, etc.)
├── context/         # Providers (AuthContext, CartContext, CategoryContext)
├── pages/           # Vistas (Home, Login, Checkout, Admin/*)
├── router/          # Configuración de rutas, Private/Admin routes
├── styles/          # Estilos base adicionales a Tailwind
├── App.jsx          # Monta providers y router
├── main.jsx         # Entrypoint de React
└── utils/           # Helpers como `formatCurrency`
```

### Carpetas destacadas

- `pages/`: cada pantalla (público, flujo de compra y páginas administrativas). `pages/admin/` contiene dashboard, productos y pedidos.
- `context/`: maneja el estado global (autenticación, carro, categorías) y comunicación con los API clients.
- `api/`: wrappers sobre Axios que centralizan el `baseURL` y el token JWT (mediante interceptor).
- `components/layout/`: incluye Navbar con menú dinámico de categorías y Footer con enlaces útiles.
- `router/`: define rutas públicas, privadas y admin usando `react-router-dom`.

## Flujo de desarrollo

1. Configura `VITE_API_URL`.
2. `npm install`
3. `npm run dev` y abre la URL indicada por Vite.
4. Usa `npm run build` + `npm run preview` para validar el build antes de desplegar.

## Deploy

El proyecto incluye un `Dockerfile` y `nginx.conf` listos para generar un contenedor estático. También puedes desplegar el `dist/` en cualquier CDN/hosting estático.

---

Mantenedores: equipo frontend titiStore.

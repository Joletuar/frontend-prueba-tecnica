# Dashboard de Datos Bursátiles

Aplicación web desarrollada con Vue 3 para la visualización y gestión de datos bursátiles. Permite consultar recomendaciones de inversión, filtrar por brokerages y visualizar análisis detallados de acciones.

## Características

- **Tabla de recomendaciones**: Visualización de recomendaciones de inversión con información de tickers, corredoras, acciones recomendadas y precios objetivo
- **Filtros avanzados**: Búsqueda por texto y filtrado por corredora de bolsa
- **Ordenamiento**: Ordenar por fecha, brokerage o acción recomendada
- **Paginación**: Navegación eficiente a través de grandes conjuntos de datos con cursor pagination
- **Modal de detalles**: Vista detallada con métricas, análisis de crecimiento potencial y recomendaciones de inversión
- **Mejor recomendación**: Destacado de la recomendación con mejor puntuación

## Tecnologías

- **Vue 3** - Framework de JavaScript
- **TypeScript** - Tipado estático
- **Vite** - Build tool y servidor de desarrollo
- **TailwindCSS** - Framework de CSS utilitario
- **Pinia** - Gestión de estado
- **TanStack Query** - Gestión de datos asincrónicos y cache
- **Axios** - Cliente HTTP
- **Lucide Vue** - Iconos

## Instalación

1. Instalar dependencias:

```bash
pnpm install
```

2. Iniciar servidor de desarrollo:

```bash
pnpm dev
```

3. Construir para producción:

```bash
pnpm build
```

## API

La aplicación se conecta a una API REST en `http://localhost:3000/api/v1` con los siguientes endpoints:

- `GET /stocks` - Lista de stocks con paginación y filtros
- `GET /stocks/:id` - Detalle de una stock específico
- `GET /stocks/brokerages` - Lista de brokerages disponibles
- `GET /stock-analyst/stock/:stockId` - Análisis detallado de un stock
- `GET /stock-analyst/best` - Mejor stock disponible

## Scripts Disponibles

- `pnpm dev` - Servidor de desarrollo
- `pnpm build` - Construir para producción
- `pnpm preview` - Vista previa del build de producción
- `pnpm lint` - Ejecutar linter
- `pnpm format` - Formatear código

# Notas de enfermería

Backend de notas construido con NestJS, Prisma y PostgreSQL. Incluye un servicio de autocompletado por IA para ayudar a redactar notas a partir de un contexto y un prompt.

## Tecnologías

- **NestJS 11** (HTTP + DI)
- **Prisma** (ORM) + **PostgreSQL**
- **AI SDK** (`ai` + `@ai-sdk/openai`) para LLMs de OpenAI
- **PNPM** como gestor de paquetes

## Arquitectura (resumen)

- `src/contexts/completion` capa de autocompletado (application, domain, infra)
- `src/contexts/users` capa de usuarios
- `src/contexts/shared` utilidades compartidas (Prisma, DI)
- `src/infraestructure/prisma` servicio de Prisma

Flujo de autocompletado:

- `CompletionController` → `CompletionUseCase` → `CompletionService` (AI SDK) → persistencia de uso en `UsageRecord` (Prisma)

## Requisitos

- Node.js 20+
- PNPM 9+
- Docker (opcional pero recomendado para la base de datos)

## Variables de entorno

Crea un archivo `.env` en la raíz con:

```
DATABASE_URL="postgresql://postgres:prisma@localhost:5432/postgres?schema=public"
OPENAI_API_KEY="<tu_api_key_de_openai>"
PORT=3000
```

- **DATABASE_URL**: conexión a PostgreSQL.
- **OPENAI_API_KEY**: clave de OpenAI para el autocompletado.
- **PORT**: puerto HTTP (opcional, 3000 por defecto).

## Base de datos con Docker

Arranca PostgreSQL con Docker Compose:

```bash
pnpm install
docker compose up -d
```

El servicio crea un contenedor `postgres:16` escuchando en `localhost:5432` con usuario `postgres` y password `prisma`.

## Prisma (generación del cliente y migraciones)

Genera el cliente de Prisma y aplica migraciones:

```bash
# Generar cliente
pnpm dlx prisma generate

# Aplicar migraciones en desarrollo
pnpm dlx prisma migrate dev

# O bien, en entornos preparados (CI/Prod)
pnpm dlx prisma migrate deploy
```

Si cambias el esquema (`prisma/schema.prisma`), vuelve a generar el cliente y ejecuta migraciones.

## Ejecutar la aplicación

- Desarrollo (watch):

```bash
pnpm run start:dev
```

- Producción (compilar y ejecutar):

```bash
pnpm run build
pnpm run start:prod
```

- Linter y tests:

```bash
pnpm run lint
pnpm run test
pnpm run test:e2e
```

## API

Base URL por defecto: `http://localhost:3000`

### Autocompletado (IA)

- **POST** `/v1/completion/notes/:id/autocomplete`

Body JSON:

```
{
  "prompt": "Texto del usuario a completar",
  "context": "Contexto previo de la nota",
  "token_max": 256
}
```

Respuesta:

```
{
  "completion": "Texto generado por IA"
}
```

Notas:

- Se usa `gpt-4o-mini` vía AI SDK (`@ai-sdk/openai`).
- Se registra el uso en la tabla `UsageRecord` con el endpoint `Autocomplete` (campos: `userId`, `tokensConsumed`, `costEstimated`). Por ahora el `userId` es un placeholder y puede integrarse con tu sistema de auth.

### Usuarios (ejemplos existentes)

- **POST** `/v1/users/create-user` → crea un usuario.
- **PUT** `/v1/users/update-user` → endpoint esqueleto (por completar lógica).

## Esquema Prisma (tablas relevantes)

- `User`: usuarios del sistema.
- `Nota`: notas (borrador de estructura para futuras funcionalidades).
- `Subscription`, `BillingHistory`: facturación (esqueleto).
- `UsageRecord`: registro de uso de la IA por endpoint.

## Estructura de carpetas (selectiva)

```
src/
  app.module.ts
  main.ts
  contexts/
    completion/
      application/use-cases/completion/
        completion.dto.ts
        completion.use-case.ts
      domain/
        interface/completion.interface.ts
      infraestructure/http-api/completion/
        completion.controller.ts
        route.constants.ts
        service/completion.service.ts
        repositories/completion.repository.ts
    users/
      application/...
      domain/...
      infrastructure/http-api/...
    shared/
      prisma/prisma.module.ts
      dependency-injection/custom-injectable.ts
infraestructure/prisma/prisma.service.ts
prisma/
  schema.prisma
  migrations/
```

## Troubleshooting

- "Cannot find module '@ai-sdk/openai'": ejecuta `pnpm add @ai-sdk/openai ai` y asegúrate de usar Node 20+.
- Conexión a DB fallida: verifica `docker compose ps`, el puerto `5432` libre y `DATABASE_URL` correcto.
- Prisma client faltante: corre `pnpm dlx prisma generate`.
- 401/403 en IA: revisa `OPENAI_API_KEY`.

## Licencia (MIT)

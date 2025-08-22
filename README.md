# Notas de Enfermería - Backend

Backend de notas construido con NestJS, implementando arquitectura hexagonal (Clean Architecture) con sistema de suscripciones, autocompletado por IA, y gestión de usuarios.

## 🏗️ Arquitectura

### Principios de Diseño

- **Arquitectura Hexagonal (Clean Architecture)**
- **Domain-Driven Design (DDD)**
- **Inyección de Dependencias**
- **Separación de Responsabilidades**

### Estructura de Capas

```
src/
├── contexts/                    # Contextos de negocio
│   ├── completion/             # Autocompletado con IA
│   ├── notes/                  # Gestión de notas
│   ├── subscriptions/          # Sistema de suscripciones
│   ├── users/                  # Gestión de usuarios
│   └── shared/                 # Utilidades compartidas
├── applications/                # Casos de uso de aplicación
├── domain/                     # Entidades y reglas de negocio
└── infraestructure/            # Implementaciones técnicas
```

## 🚀 Tecnologías

### Core

- **NestJS 11** - Framework de Node.js
- **TypeScript 5.7+** - Lenguaje de programación
- **Prisma 6.12** - ORM moderno
- **PostgreSQL 16** - Base de datos principal

### IA y Autocompletado

- **AI SDK** - Integración con múltiples proveedores de IA
- **OpenAI GPT-4o-mini** - Modelo de lenguaje principal
- **Anthropic Claude** - Modelo alternativo
- **Google Gemini** - Soporte para Google AI
- **Groq** - Procesamiento rápido de IA

### Infraestructura

- **Redis** - Cache y colas de mensajes
- **BullMQ** - Gestión de colas de trabajo
- **Stripe** - Procesamiento de pagos y suscripciones
- **Docker Compose** - Orquestación de servicios

### Gestión de Paquetes

- **PNPM** - Gestor de paquetes rápido y eficiente

## 📋 Requisitos del Sistema

- **Node.js** 20.0.0 o superior
- **PNPM** 9.0.0 o superior
- **Docker** y **Docker Compose** (recomendado)
- **PostgreSQL** 16+ (local o remoto)
- **Redis** 7+ (local o remoto)

## 🔧 Configuración del Entorno

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos
DATABASE_URL="postgresql://postgres:prisma@localhost:5432/postgres?schema=public"

# IA - OpenAI (Principal)
OPENAI_API_KEY="sk-..."

# IA - Alternativos (Opcionales)
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_API_KEY="..."
GROQ_API_KEY="gsk_..."

# Stripe (Suscripciones)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_SUCCESS_URL="https://tuapp.com/success"
STRIPE_CANCEL_URL="https://tuapp.com/cancel"

# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD=""

# Servidor
PORT=3000
NODE_ENV=development
```

### 2. Instalación de Dependencias

```bash
pnpm install
```

### 3. Base de Datos con Docker

```bash
# Iniciar servicios
docker compose up -d

# Verificar estado
docker compose ps
```

### 4. Configuración de Prisma

```bash
# Generar cliente de Prisma
pnpm dlx prisma generate

# Aplicar migraciones
pnpm dlx prisma migrate dev

# Para producción
pnpm dlx prisma migrate deploy

# Abrir Prisma Studio
pnpm dlx prisma studio
```

## 🏃‍♂️ Ejecución de la Aplicación

### Desarrollo

```bash
# Modo watch con recarga automática
pnpm run start:dev

# Modo debug
pnpm run start:debug
```

### Producción

```bash
# Compilar
pnpm run build

# Ejecutar
pnpm run start:prod
```

### Testing

```bash
# Tests unitarios
pnpm run test

# Tests en modo watch
pnpm run test:watch

# Tests de integración
pnpm run test:e2e

# Cobertura de código
pnpm run test:cov
```

### Calidad de Código

```bash
# Linting
pnpm run lint

# Formateo
pnpm run format
```

## 🎯 Funcionalidades Principales

### 1. Autocompletado con IA

- **Endpoint**: `POST /v1/completion/notes/:id/autocomplete`
- **Modelos soportados**: GPT-4o-mini, Claude, Gemini, Groq
- **Control de tokens**: Límite configurable por petición
- **Tracking de uso**: Registro de consumo y costos estimados

### 2. Gestión de Notas

- **CRUD completo**: Crear, leer, actualizar, eliminar notas
- **Búsqueda**: Por título y usuario
- **Metadatos**: Estructura flexible para información adicional
- **Cache**: Optimización con Redis

### 3. Sistema de Suscripciones

- **Integración con Stripe**: Pagos y webhooks
- **Planes de suscripción**: Gestión de diferentes niveles
- **Historial de facturación**: Seguimiento de pagos
- **Webhooks**: Procesamiento automático de eventos

### 4. Gestión de Usuarios

- **Registro y actualización**: Operaciones CRUD básicas
- **Roles**: Sistema de permisos
- **Validación**: Value objects para email y nombres

## 🔌 API Endpoints

### Autocompletado

```
POST /v1/completion/notes/:id/autocomplete
```

**Body:**

```json
{
  "prompt": "Texto a completar",
  "context": "Contexto de la nota",
  "model": "gpt-4o-mini"
}
```

### Notas

```
GET    /v1/notes/:id                    # Obtener nota por ID
POST   /v1/notes                        # Crear nueva nota
PUT    /v1/notes/:id                    # Actualizar nota
DELETE /v1/notes/:id                    # Eliminar nota
GET    /v1/notes/search?title=...       # Buscar por título
GET    /v1/notes/user/:userId           # Notas por usuario
```

### Suscripciones

```
POST   /v1/subscriptions                # Crear suscripción
GET    /v1/subscriptions/plans          # Obtener planes disponibles
POST   /v1/subscriptions/webhook        # Webhook de Stripe
```

### Usuarios

```
POST   /v1/users/create-user            # Crear usuario
PUT    /v1/users/update-user            # Actualizar usuario
```

## 🗄️ Esquema de Base de Datos

### Tablas Principales

- **User**: Usuarios del sistema
- **Nota**: Notas de enfermería
- **Subscription**: Suscripciones de usuarios
- **BillingHistory**: Historial de facturación
- **UsageRecord**: Registro de uso de IA
- **ControlCuota**: Control de cuotas por usuario

### Relaciones

- Usuario → Notas (1:N)
- Usuario → Suscripción (1:1)
- Suscripción → Historial de Facturación (1:N)
- Usuario → Registro de Uso (1:N)

## 🏛️ Arquitectura de Código

### Patrones Implementados

- **Repository Pattern**: Abstracción de acceso a datos
- **Use Case Pattern**: Lógica de aplicación
- **Command/Query Pattern**: Separación de operaciones
- **Value Objects**: Objetos inmutables para validación
- **Domain Events**: Eventos de dominio (en desarrollo)

### Inyección de Dependencias

- **Tokens simbólicos**: Para interfaces de repositorio
- **Providers personalizados**: Para servicios externos
- **Módulos NestJS**: Organización por contexto

## 🔒 Seguridad y Validación

- **Validación de entrada**: DTOs con class-validator
- **Sanitización**: Limpieza de datos de entrada
- **Rate limiting**: Control de peticiones por usuario
- **Webhook verification**: Verificación de firmas de Stripe

## 📊 Monitoreo y Logging

- **Logging estructurado**: Con NestJS Logger
- **Métricas de uso**: Tracking de consumo de IA
- **Health checks**: Verificación de servicios
- **Error handling**: Filtros globales de excepciones

## 🚀 Despliegue

### Docker

```bash
# Construir imagen
docker build -t notes-back .

# Ejecutar contenedor
docker run -p 3000:3000 notes-back
```

### Variables de Entorno de Producción

- Configurar `NODE_ENV=production`
- Usar URLs de producción para Stripe
- Configurar Redis de producción
- Configurar base de datos de producción

## 🧪 Testing

### Estrategia de Testing

- **Tests unitarios**: Casos de uso y entidades
- **Tests de integración**: Repositorios y servicios
- **Tests E2E**: Flujos completos de la aplicación
- **Mocks**: Para servicios externos (Stripe, IA)

### Cobertura Objetivo

- **Código de dominio**: 90%+
- **Casos de uso**: 85%+
- **Servicios**: 80%+

## 🔧 Troubleshooting

### Problemas Comunes

#### Error de Compilación

```bash
# Limpiar cache
rm -rf dist/
pnpm run build
```

#### Error de Base de Datos

```bash
# Verificar conexión
pnpm dlx prisma db push

# Resetear base de datos
pnpm dlx prisma migrate reset
```

#### Error de Redis

```bash
# Verificar servicio
docker compose ps redis

# Reiniciar servicio
docker compose restart redis
```

#### Error de Stripe

- Verificar `STRIPE_SECRET_KEY`
- Verificar webhook endpoints
- Revisar logs de Stripe Dashboard

### Logs Útiles

```bash
# Logs de la aplicación
pnpm run start:dev

# Logs de Docker
docker compose logs -f

# Logs de Prisma
DEBUG=prisma:* pnpm run start:dev
```

## 🤝 Contribución

### Estándares de Código

- **ESLint**: Configuración estricta
- **Prettier**: Formateo automático
- **TypeScript**: Tipado estricto
- **Arquitectura hexagonal**: Respetar capas

### Flujo de Trabajo

1. Crear feature branch
2. Implementar cambios
3. Ejecutar tests
4. Crear pull request
5. Code review
6. Merge a main

## 📚 Recursos Adicionales

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Stripe API Reference](https://stripe.com/docs/api)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ usando NestJS y arquitectura hexagonal**

import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './contexts/shared/filters/http-exception.filter';
import { corsConfiguration } from './infraestructure/cors/configuration-cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('Bootstrap');
  const PORT = process.env.PORT ?? 3000;

  // =================================================================
  // CONFIGURACIÓN DE LA APLICACIÓN
  // =================================================================

  // Habilita CORS para permitir peticiones desde el frontend
  app.enableCors(corsConfiguration);

  // Opcional: Establece un prefijo global para todas las rutas (ej. /api/v1)
  app.setGlobalPrefix('api');

  // Habilita el cierre suave para que la app no muera abruptamente
  app.enableShutdownHooks();

  // Configura un Pipe de Validación global para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configura un Filtro de Excepciones global
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // =================================================================
  // CONFIGURACIÓN DE SWAGGER (OPENAPI)
  // =================================================================

  const config = new DocumentBuilder()
    .setTitle('Notas de enfermería API')
    .setDescription('API para gestionar las notas de enfermería')
    .setVersion('1.0')
    .addTag('Notas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Se usa 'docs' como ruta para la documentación
  SwaggerModule.setup('docs', app, document);

  // =================================================================
  // INICIO DEL SERVIDOR
  // =================================================================

  await app.listen(PORT);

  logger.log(`🚀 Aplicación corriendo en: http://localhost:${PORT}/api`);
  logger.log(
    `📄 Documentación de Swagger disponible en: http://localhost:${PORT}/docs`,
  );
}

bootstrap();

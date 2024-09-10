import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  const configService = app.get(ConfigService);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle("API de Gestión de Películas y Autenticación")
    .setDescription(
      "Esta API permite gestionar usuarios y sus películas favoritas. Facilita el inicio de sesión y la administración de una lista personalizada de películas que el usuario marca como favoritas. La documentación está disponible en Swagger para una fácil consulta y uso.",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, transform: true }));

  await app.listen(configService.get<number>("PORT") || 3000);
}
void bootstrap();

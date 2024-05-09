import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // API Config
  const configService = app.get(ConfigService);
  const config = (configService as unknown as { internalConfig: Config })
    .internalConfig;

  app.enable('trust proxy');
  app.setGlobalPrefix(config.api.prefix);
  app.enableCors({ credentials: true });
  app.enableShutdownHooks();

  // SWAGGER
  const options = new DocumentBuilder()
    .setTitle('Tech Challenge - Microserviço Pagamento')
    .setDescription(
      'Este serviço faz parte de um projeto de um Sistema para Lanchonete como Componente da Pós-Graduação em Arquitetura de Software',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(+config.api.port);
}
bootstrap();

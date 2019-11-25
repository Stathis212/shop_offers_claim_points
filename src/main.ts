import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { DispatchError } from './common/errors/dispatch.error';

import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DispatchError());

  const options = new DocumentBuilder()
    .setTitle('Shopa')
    .setDescription('Shopa API description')
    .setVersion('1.0')
    .addTag('shopa_api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();

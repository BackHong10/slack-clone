import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './httpexception.filter';

declare const module: any; // new !
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('슬리액트 개발을 위한 문서입니다.')
    .setVersion('1.0')
    .addTag('Sleact')
    .addCookieAuth('connect.sid')
    .build();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000, () => {
    console.log('3000번 포트로 서버가 열렸습니다.');
  });

  if (module.hot) {
    // new !
    module.hot.accept(); // new !
    module.hot.dispose(() => app.close()); // new !
  }
}
bootstrap();

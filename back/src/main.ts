import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as passport from 'passport';
import * as session from 'express-session';
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

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

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

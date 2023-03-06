import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any; // new !
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

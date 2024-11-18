import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module'; 
import { CvService } from '../cv/cv.service'; 

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  console.log('Seeding CVs...');
  // await cvService.seedCvs();
  console.log('Seeding finished.');
  await app.close();
}
bootstrap();

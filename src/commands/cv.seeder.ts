import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module'; 
import { SeedService } from '../seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);
  console.log('Seeding CVs...');
  await seedService.seed();
  console.log('Seeding finished.');
  await app.close();
}
bootstrap();

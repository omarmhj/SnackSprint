import { NestFactory } from '@nestjs/core';
import { RestaurantModule } from './restaurant.module';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantModule);
  
  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  const port = process.env.PORT || 3001; // Use different port than user service
  await app.listen(port);
  console.log(`Restaurant service running on port ${port}`);

  console.log('DATABASE_URL is:', process.env.DATABASE_URL);
}
bootstrap();

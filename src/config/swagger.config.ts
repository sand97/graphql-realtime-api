import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Mboa Fashion')
  .setDescription('The Mboa Fashion API interactive')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'access-key',
    },
    'access-key',
  )
  .build();

export default swaggerConfig;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createTypeOrmCOnfig } from './config/typeorm.config-export.service';
import { listenToKill } from './common/services/instance.kill.service';
import { applyMiddleware } from './common/services/app.config-service';
import { seed } from './seeds';
import { configService } from './config/config.service';

listenToKill();
createTypeOrmCOnfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await seed();
  applyMiddleware(app);
  await app.listen(configService.getPort());
}
bootstrap();

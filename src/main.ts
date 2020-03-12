import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5000;

  console.log(chalk.red.bold.underline.bgCyan(`App is running on port ${port}`));

  await app.listen(port);
}
bootstrap();

import * as dotenv from "dotenv";
dotenv.config();
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { TimeoutInterceptor } from "src/common/interceptors/timeout.interceptor";
import { config } from "./swagger/config";
import { appConstants } from "./constants";
export let nestApp: NestExpressApplication;

async function bootstrap() {
  const logger = new Logger();
  nestApp = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  nestApp.useGlobalInterceptors(new TimeoutInterceptor());
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  nestApp.enableCors();
  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup(appConstants.swaggerUrl, nestApp, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  await nestApp.listen(appConstants.port!);
  logger.log(`Application is running on: ${await nestApp.getUrl()}`);
  logger.log(
    `Swagger awaliable on: ${
      (await nestApp.getUrl()) + appConstants.swaggerUrl
    }`,
  );
  logger.log(
    `Swagger json awaliable on: ${
      (await nestApp.getUrl()) + appConstants.swaggerJSON
    }`,
  );
}

bootstrap();

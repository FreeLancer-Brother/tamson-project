import { NestFactory } from "@nestjs/core";
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from "nest-winston";
import * as winston from "winston";
import "winston-daily-rotate-file";
import { AppModule } from "./app.module";
import configuration from "./config/configuration";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  console.log(process.env.DB_URI, process.env.REDIS_URI)
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: "debug",
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike("MyApp", {
              prettyPrint: true,
            })
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: "debug_logs",
          filename: "%DATE%.log",
          datePattern: "DD-MM-YYYY",
          zippedArchive: false,
          maxSize: "20m",
          maxFiles: "14d",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike("MyApp", {
              prettyPrint: true,
            })
          ),
        }),
        // other transports...
      ],
    }),
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Trans API")
    .setDescription("The Trans API description")
    .setVersion("1.0")
    .addTag("trans")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(configuration().port);
}
bootstrap();

import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
  .setTitle("Slim Мoms REST API Specification")
  .setVersion(process.env.npm_package_version || "1.0")
  .addBearerAuth()
  .addTag("users")
  .addTag("products")
  .addTag("notes")
  .build();

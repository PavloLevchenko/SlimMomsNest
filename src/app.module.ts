import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TerminusModule } from "@nestjs/terminus";
import { AppController } from "./app.controller";
import { logger } from "./common/logger.middleware";
import { appConstants } from "./constants";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { NotesModule } from "./notes/notes.module";

@Module({
  imports: [
    MongooseModule.forRoot(appConstants.connectionString!),
    TerminusModule,
    UsersModule,
    ProductsModule,
    NotesModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}

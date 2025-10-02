import { Module, Logger, CacheModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { join } from "path";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TransformInterceptor } from "./utils/transform.interceptor";
import { UploadModule } from "./upload/upload.module";
import configuration from "./config/configuration";
import { AllExceptionsFilter } from "./utils/exception.filter";
import { ContactsModule } from "./contacts/contacts.module";
import { NewsModule } from './news/news.module';
import { AboutUsModule } from './about-us/about-us.module';
import { BrandsModule } from "./brands/brands.module";
import { YatchTypesModule } from "./yatch-types/yatch-types.module";
import { ProductLinesModule } from "./product-lines/product-lines.module";
import { ProductsModule } from "./products/products.module";
import { EmailAccountsModule } from "./email-accounts/email-accounts.module";
import { FrontendModule } from "./frontend/frontend.module";
import { ServicesModule } from "./services/services.module";
import { ConfigsModule } from "./configs/configs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.IS_DOCKER ? 'redis://redis:6379' : 'redis://localhost:6379',
      ttl: 0,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveStaticOptions: {
        index: false,
        cacheControl: true,
        maxAge: 365*24*60*60*1000,
      },
    }),
    MongooseModule.forRoot(configuration().database.uri, {}),
    AuthModule,
    UsersModule,
    UploadModule,
    ContactsModule,
    NewsModule,
    AboutUsModule,
    BrandsModule,
    YatchTypesModule,
    ProductLinesModule,
    ProductsModule,
    EmailAccountsModule,
    ServicesModule,
    ConfigsModule,
    FrontendModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

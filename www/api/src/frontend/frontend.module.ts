import { Module } from "@nestjs/common";
import { FrontendController } from "./frontend.controller";
import { NewsModule } from "src/news/news.module";
import { BrandsModule } from "src/brands/brands.module";
import { YatchTypesModule } from "src/yatch-types/yatch-types.module";
import { ProductLinesModule } from "src/product-lines/product-lines.module";
import { ProductsModule } from "src/products/products.module";
import { ContactsModule } from "src/contacts/contacts.module";
import { ServicesModule } from "src/services/services.module";
import { ConfigsModule } from "src/configs/configs.module";

@Module({
  imports: [
    NewsModule,
    YatchTypesModule,
    BrandsModule,
    ProductLinesModule,
    ProductsModule,
    ContactsModule,
    ServicesModule,
    ConfigsModule,
  ],
  providers: [],
  controllers: [FrontendController],
  exports: [],
})
export class FrontendModule {}

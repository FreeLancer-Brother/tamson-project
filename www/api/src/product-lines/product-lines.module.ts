import { Module } from "@nestjs/common";
import { ProductLinesService } from "./product-lines.service";
import { ProductLinesController } from "./product-lines.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductLines, ProductLinesSchema } from "./schemas/product-lines.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductLines.name, schema: ProductLinesSchema }]),
  ],
  providers: [ProductLinesService],
  controllers: [ProductLinesController],
  exports: [ProductLinesService],
})
export class ProductLinesModule {}

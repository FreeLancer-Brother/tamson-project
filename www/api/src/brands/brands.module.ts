import { Module } from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { BrandsController } from "./brands.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Brands, BrandsSchema } from "./schemas/brands.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brands.name, schema: BrandsSchema }]),
  ],
  providers: [BrandsService],
  controllers: [BrandsController],
  exports: [BrandsService],
})
export class BrandsModule {}

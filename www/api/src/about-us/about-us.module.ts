import { Module } from "@nestjs/common";
import { AboutUsService } from "./about-us.service";
import { AboutUsController } from "./about-us.controller";
import { AboutUs, AboutUsSchema } from "./schemas/about-us.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AboutUs.name, schema: AboutUsSchema }]),
  ],
  providers: [AboutUsService],
  controllers: [AboutUsController],
})
export class AboutUsModule {}

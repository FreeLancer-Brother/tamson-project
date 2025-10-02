import { Module } from "@nestjs/common";
import { YatchTypesService } from "./yatch-types.service";
import { YatchTypesController } from "./yatch-types.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { YatchTypes, YatchTypesSchema } from "./schemas/yatch-types.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: YatchTypes.name, schema: YatchTypesSchema }]),
  ],
  providers: [YatchTypesService],
  controllers: [YatchTypesController],
  exports: [YatchTypesService],
})
export class YatchTypesModule {}

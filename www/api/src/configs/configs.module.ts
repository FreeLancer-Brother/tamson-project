import { CacheModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigsService } from "./configs.service";
import { ConfigsController } from "./configs.controller";
import { Configs, ConfigsSchema } from "./schemas/configs.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Configs.name, schema: ConfigsSchema }]),
  ],
  providers: [ConfigsService],
  controllers: [ConfigsController],
  exports: [ConfigsService],
})
export class ConfigsModule {}

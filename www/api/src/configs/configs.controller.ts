import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { filter } from "lodash";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PagingDto } from "src/dtos/app.dto";
import { ConfigsService } from "./configs.service";

@Controller("configs")
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @UseGuards(JwtAuthGuard)
  @Put("/:configKey")
  async update(@Request() req, @Param("configKey") configKey: string) {
    let result;
    switch (configKey) {
      case "news":
        result = await this.configsService.updateNewsConfig(req.body);
        break;
      case "common":
        result = await this.configsService.updateCommonConfig(req.body);
        break;
      case "home":
        result = await this.configsService.updateHomeConfig(req.body);
        break;
      case "about-us":
        result = await this.configsService.updateAboutUsConfig(req.body);
        break;
      case "contact-us":
        result = await this.configsService.updateContactUsConfig(req.body);
        break;
      case "header":
        result = await this.configsService.updateHeaderConfig(req.body);
        break;
      case "footer":
        result = await this.configsService.updateFooterConfig(req.body);
        break;
      case "float-buttons":
        result = await this.configsService.updateFloatButtonsConfig(req.body);
        break;
    
      default:
        break;
    }

    return {
      data: result,
    };
  }

  @Get("/:configKey")
  async getDetail(@Param("configKey") configKey: string) {
    const result = await this.configsService.findByConfigKey(configKey);
    return {
      data: result,
    };
  }
}

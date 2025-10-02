import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  Delete,
  Post,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AboutUsService } from "./about-us.service";

@Controller("about-us")
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Get("/")
  async get() {
    const result = await this.aboutUsService.findOne();

    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.aboutUsService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.aboutUsService.delete(id);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async submit(@Request() req) {
    const result = await this.aboutUsService.create(req.body);
    return {
      data: result,
    };
  }
}

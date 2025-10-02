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
import { FilterYatchTypesDto, SortYatchTypesDto } from "./dtos/yatch-types.dto";
import { YatchTypesService } from "./yatch-types.service";

@Controller("yatch-types")
export class YatchTypesController {
  constructor(private readonly yatchTypesService: YatchTypesService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Request() req) {
    console.log(req.body);
    const submitData = await this.yatchTypesService.create(req.body);
    return {
      data: submitData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.yatchTypesService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.yatchTypesService.delete(id);
    return {
      data: result,
    };
  }

  @Get("/")
  async get(@Query() query) {
    const filter = {
      _id: query.id,
      slug: query.slug,
      name: query.name,
      brand: query.brand,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
    const total = await this.yatchTypesService.countDocuments(filter);
    const result = await this.yatchTypesService.query(
      filter,
      {},
      { page: query.page, pageSize: query.pageSize }
    );

    return {
      data: result,
      total,
    };
  }

  @Get("/:id")
  async getDetail(@Param("id") id: string) {
    const result = await this.yatchTypesService.findOne({ _id: id });
    return {
      data: result,
    };
  }
}

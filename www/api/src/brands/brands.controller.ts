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
import { FilterBrandsDto, SortBrandsDto } from "./dtos/brands.dto";
import { BrandsService } from "./brands.service";

@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Request() req) {
    const submitData = await this.brandsService.create(req.body);
    return {
      data: submitData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.brandsService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.brandsService.delete(id);
    return {
      data: result,
    };
  }

  @Get("/")
  async get(@Query() query) {
    const filter = {
      _id: query.id,
      name: query.name,
      slug: query.slug,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
    const total = await this.brandsService.countDocuments(filter);
    const result = await this.brandsService.query(
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
    const result = await this.brandsService.findOne({ _id: id });
    return {
      data: result,
    };
  }
}

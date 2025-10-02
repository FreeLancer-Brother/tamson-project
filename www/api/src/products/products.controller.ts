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
import { FilterProductsDto, SortProductsDto } from "./dtos/products.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Request() req) {
    console.log(req.body);
    const submitData = await this.productsService.create(req.body);
    return {
      data: submitData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.productsService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.productsService.delete(id);
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
      productLine: query.productLine,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
    const total = await this.productsService.countDocuments(filter);
    const result = await this.productsService.query(
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
    const result = await this.productsService.findOne({ _id: id });
    return {
      data: result,
    };
  }
}

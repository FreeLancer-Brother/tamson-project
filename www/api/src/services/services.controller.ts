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
import { FilterServicesDto, SortServicesDto } from "./dtos/services.dto";
import { ServicesService } from "./services.service";

@Controller("services")
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Request() req) {
    console.log(req.body);
    const submitData = await this.serviceService.create(req.body);
    return {
      data: submitData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.serviceService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.serviceService.delete(id);
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
      type: query.type,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
    const total = await this.serviceService.countDocuments(filter);
    const result = await this.serviceService.query(
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
    const result = await this.serviceService.findOne({ _id: id });
    return {
      data: result,
    };
  }
}

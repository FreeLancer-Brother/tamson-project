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
import { FilterNewsDto, SortNewsDto } from "./dtos/news.dto";
import { NewsService } from "./news.service";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Request() req) {
    console.log(req.body);
    const submitData = await this.newsService.create(req.body);
    return {
      data: submitData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.newsService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.newsService.delete(id);
    return {
      data: result,
    };
  }

  @Get("/")
  async get(@Query() query) {
    const filter = {
      _id: query.id,
      content: query.content,
      title: query.title,
      type: query.type,
      slug: query.slug,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
    const total = await this.newsService.countDocuments(filter);
    const result = await this.newsService.query(
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
    const result = await this.newsService.findOne({ _id: id });
    return {
      data: result,
    };
  }
}

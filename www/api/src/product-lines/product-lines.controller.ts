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
import {filter} from "lodash";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {PagingDto} from "src/dtos/app.dto";
import {FilterProductLinesDto, SortProductLinesDto} from "./dtos/product-lines.dto";
import {ProductLinesService} from "./product-lines.service";

@Controller("product-lines")
export class ProductLinesController {
    constructor(private readonly productLinesService: ProductLinesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async create(@Request() req) {
        console.log(req.body);
        const submitData = await this.productLinesService.create(req.body);
        return {
            data: submitData,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async update(@Request() req, @Param("id") id: string) {
        const result = await this.productLinesService.update(id, req.body);
        return {
            data: result,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async delete(@Param("id") id: string) {
        const result = await this.productLinesService.delete(id);
        return {
            data: result,
        };
    }

    @Get("/")
    async get(@Query() query) {
        const filter = {
            _id: query.id,
            name: query.name,
            yatchType: query.yatchType,
            fromDate: query.fromDate,
            toDate: query.toDate,
        };
        const total = await this.productLinesService.countDocuments(filter);
        let result = await this.productLinesService.query(
            filter,
            {},
            {page: query.page, pageSize: query.pageSize}
        );
        return {
            data: result,
            total,
        };
    }

    @Get("/:id")
    async getDetail(@Param("id") id: string) {
        const result = await this.productLinesService.findOne({_id: id});
        return {
            data: result,
        };
    }
}

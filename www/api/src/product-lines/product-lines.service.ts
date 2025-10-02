import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { ProductLines, ProductLinesDocument } from "./schemas/product-lines.schema";
import { Model } from "mongoose";
import {
  CreateProductLinesDto,
  FilterProductLinesDto,
  SortProductLinesDto,
  UpdateProductLinesDto,
} from "./dtos/product-lines.dto";
import { DeleteResult } from "mongodb";
import { PagingDto } from "src/dtos/app.dto";

@Injectable()
export class ProductLinesService {
  constructor(
    @InjectModel(ProductLines.name)
    private readonly productLinesDocument: Model<ProductLinesDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  productLineListKey = (filter) =>
    `trans_api_product_line_filter_${JSON.stringify(filter)}`;

  async create(createProductLinesDto: CreateProductLinesDto): Promise<ProductLines> {
    const createdDoc = await this.productLinesDocument.create(createProductLinesDto);
    const results = await this.cacheManager.store.keys(`trans_api_product_line_filter_*`);
    for (let i = 0; i < results.length; i++) {
      const resultKey = results[i];
      await this.cacheManager.del(resultKey);
    }
    return createdDoc;
  }

  async update(id: string, updateProductLinesDto: UpdateProductLinesDto): Promise<ProductLines> {
    const updateDoc = await this.productLinesDocument.findByIdAndUpdate(id, updateProductLinesDto, { new: true });
    const results = await this.cacheManager.store.keys(`trans_api_product_line_filter_*`);
    for (let i = 0; i < results.length; i++) {
      const resultKey = results[i];
      await this.cacheManager.del(resultKey);
    }
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const docFound = await this.productLinesDocument.findOne({ _id: id });
    if (docFound && docFound._id) {
      const results = await this.cacheManager.store.keys(`trans_api_product_line_filter_*`);
      for (let i = 0; i < results.length; i++) {
        const resultKey = results[i];
        await this.cacheManager.del(resultKey);
      }
    }
    const result = await this.productLinesDocument.deleteOne({ _id: id });
    return result;
  }

  async countDocuments(filter?: FilterProductLinesDto,): Promise<Number> {
    const newFilter = {
      yatchType: filter.yatchType,
      "name.content": filter.name
        ? { $regex: ".*" + filter.name + ".*", $options: "i" }
        : undefined,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.productLinesDocument.countDocuments(newFilter);
  }

  async query(
    filter?: FilterProductLinesDto,
    sort?: SortProductLinesDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<ProductLines[]> {
    const { page=1, pageSize=10 } = paging;
    const newFilter = {
      yatchType: filter.yatchType,
      "name.content": filter.name
        ? { $regex: ".*" + filter.name + ".*", $options: "i" }
        : undefined,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.productLinesDocument
      .find(newFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async all(
    filter?: FilterProductLinesDto,
  ): Promise<ProductLines[]> {
    const newFilter = {
      yatchType: filter.yatchType,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    const cachedKey = this.productLineListKey(newFilter);
    let data;
    if (cachedKey) {
      data = await this.cacheManager.get(cachedKey);
      if (!data) {
        data = await this.productLinesDocument.find(newFilter).sort({ order: 1 , createdAt: -1 }).lean();
        if (data) {
          await this.cacheManager.set(cachedKey, data);
        }
      }
    }
    return data;
  }

  async findOne(query: FilterProductLinesDto): Promise<ProductLines> {
    return this.productLinesDocument.findOne(query || {}).lean();
  }
}

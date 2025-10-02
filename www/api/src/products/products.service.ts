import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { Products, ProductsDocument } from "./schemas/products.schema";
import { Model } from "mongoose";
import {
  CreateProductsDto,
  FilterProductsDto,
  SortProductsDto,
  UpdateProductsDto,
} from "./dtos/products.dto";
import { DeleteResult } from "mongodb";
import { PagingDto } from "src/dtos/app.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productsModel: Model<ProductsDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  productListKey = (filter) =>
    `trans_api_product_filter_${JSON.stringify(filter)}`;

  async create(createProductsDto: CreateProductsDto): Promise<Products> {
    const createdDoc = await this.productsModel.create(createProductsDto);
    const results = await this.cacheManager.store.keys(`trans_api_product_filter_*`);
    for (let i = 0; i < results.length; i++) {
      const resultKey = results[i];
      await this.cacheManager.del(resultKey);
    }
    return createdDoc;
  }

  async update(id: string, updateProductsDto: UpdateProductsDto): Promise<Products> {
    const updateDoc = await this.productsModel.findByIdAndUpdate(id, updateProductsDto, { new: true });
    const results = await this.cacheManager.store.keys(`trans_api_product_filter_*`);
    for (let i = 0; i < results.length; i++) {
      const resultKey = results[i];
      await this.cacheManager.del(resultKey);
    }
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const docFound = await this.productsModel.findOne({ _id: id });
    if (docFound && docFound._id) {
      const results = await this.cacheManager.store.keys(`trans_api_product_filter_*`);
      for (let i = 0; i < results.length; i++) {
        const resultKey = results[i];
        await this.cacheManager.del(resultKey);
      }
    }
    const result = await this.productsModel.deleteOne({ _id: id });
    return result;
  }

  async countDocuments(filter?: FilterProductsDto,): Promise<Number> {
    const newFilter = {
      productLine: filter.productLine,
      slug: filter.slug,
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

    return this.productsModel.countDocuments(newFilter);
  }

  async query(
    filter?: FilterProductsDto,
    sort?: SortProductsDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<Products[]> {
    const { page=1, pageSize=10 } = paging;
    const newFilter = {
      productLine: filter.productLine,
      slug: filter.slug,
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

    return this.productsModel
      .find(newFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async all(
    filter?: FilterProductsDto,
  ): Promise<Products[]> {
    const newFilter = {
      productLine: filter.productLine,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    const cachedKey = this.productListKey(newFilter);
    let data;
    if (cachedKey) {
      data = await this.cacheManager.get(cachedKey);
      if (!data) {
        data = await this.productsModel.find(newFilter).sort({ order: 1 , createdAt: -1 }).lean();
        if (data) {
          await this.cacheManager.set(cachedKey, data);
        }
      }
    }
    return data;
  }

  async findOne(query: FilterProductsDto): Promise<Products> {
    return this.productsModel.findOne(query).lean();
  }
}

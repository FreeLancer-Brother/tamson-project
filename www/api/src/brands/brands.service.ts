import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { Brands, BrandsDocument } from "./schemas/brands.schema";
import { Model } from "mongoose";
import {
  CreateBrandsDto,
  FilterBrandsDto,
  SortBrandsDto,
  UpdateBrandsDto,
} from "./dtos/brands.dto";
import { DeleteResult } from "mongodb";
import { PagingDto } from "src/dtos/app.dto";

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brands.name)
    private readonly brandsModel: Model<BrandsDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  brandAll = () => `trans_api_brand_all`;
  brandAllFront = () => `trans_api_brand_all_front`;

  async create(createBrandsDto: CreateBrandsDto): Promise<Brands> {
    const createdDoc = await this.brandsModel.create(createBrandsDto);
    const cachedKey     = this.brandAll();
    const brandAllFront = this.brandAllFront();
    const data = await this.brandsModel.find({}).sort({ createdAt: -1 }).lean();
    if (data) {
      await this.cacheManager.set(cachedKey, data);
      await this.cacheManager.del(brandAllFront);
    }
    return createdDoc;
  }

  async update(id: string, updateBrandsDto: UpdateBrandsDto): Promise<Brands> {
    const updateDoc = await this.brandsModel.findByIdAndUpdate(
      id,
      updateBrandsDto,
      { new: true }
    );
    const cachedKey     = this.brandAll();
    const brandAllFront = this.brandAllFront();
    const data = await this.brandsModel.find({}).sort({ createdAt: -1 }).lean();
    if (data) {
      await this.cacheManager.set(cachedKey, data);
      await this.cacheManager.del(brandAllFront);
    }
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.brandsModel.deleteOne({ _id: id });
    const cachedKey     = this.brandAll();
    const brandAllFront = this.brandAllFront();
    const data = await this.brandsModel.find({}).sort({ createdAt: -1 }).lean();
    if (data) {
      await this.cacheManager.set(cachedKey, data);
      await this.cacheManager.del(brandAllFront);
    }
    return result;
  }

  async countDocuments(filter?: FilterBrandsDto): Promise<Number> {
    const newFilter = {
      name: filter.name ? { $regex: ".*" + filter.name + ".*", $options: "i" } : undefined,
      slug: filter.slug,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.brandsModel.countDocuments(newFilter);
  }

  async query(
    filter?: FilterBrandsDto,
    sort?: SortBrandsDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<Brands[]> {
    const { page = 1, pageSize = 10 } = paging;
    const newFilter = {
      name: filter.name ? { $regex: ".*" + filter.name + ".*", $options: "i" } : undefined,
      slug: filter.slug,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.brandsModel
      .find(newFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async all(): Promise<Brands[]> {
    const cachedKey = this.brandAllFront();
    let data;
    if (cachedKey) {
      data = await this.cacheManager.get(cachedKey);
      if (!data) {
        data = await this.brandsModel.find({}).sort({ order: 1 , createdAt: -1 }).lean();
        if (data) {
          await this.cacheManager.set(cachedKey, data);
        }
      }
    }
    return data;
  }

  async findOne(query: FilterBrandsDto): Promise<Brands> {
    return this.brandsModel.findOne(query || {}).lean();
  }
}

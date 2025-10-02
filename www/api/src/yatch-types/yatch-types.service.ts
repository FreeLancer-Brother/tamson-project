import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { YatchTypes, YatchTypesDocument } from "./schemas/yatch-types.schema";
import { Model } from "mongoose";
import {
  CreateYatchTypesDto,
  FilterYatchTypesDto,
  SortYatchTypesDto,
  UpdateYatchTypesDto,
} from "./dtos/yatch-types.dto";
import { DeleteResult } from "mongodb";
import { PagingDto } from "src/dtos/app.dto";

@Injectable()
export class YatchTypesService {
  constructor(
    @InjectModel(YatchTypes.name)
    private readonly yatchTypesModel: Model<YatchTypesDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  yatchTypeListKey = (filter) =>
    `trans_api_yatch_type_filter_${JSON.stringify(filter)}`;

  async create(createYatchTypesDto: CreateYatchTypesDto): Promise<YatchTypes> {
    const createdDoc = await this.yatchTypesModel.create(createYatchTypesDto);
    const results = await this.cacheManager.store.keys(`trans_api_yatch_type_filter_*`);
    for (let i = 0; i < results.length; i++) {
      const resultKey = results[i];
      await this.cacheManager.del(resultKey);
    }
    return createdDoc;
  }

  async update(
    id: string,
    updateYatchTypesDto: UpdateYatchTypesDto
  ): Promise<YatchTypes> {
    const updateDoc = await this.yatchTypesModel.findByIdAndUpdate(
      id,
      updateYatchTypesDto,
      { new: true }
    );
    const results = await this.cacheManager.store.keys(`trans_api_yatch_type_filter_*`);
    for (let i = 0; i < results.length; i++) {
      const resultKey = results[i];
      await this.cacheManager.del(resultKey);
    }
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const docFound = await this.yatchTypesModel.findOne({ _id: id });
    if (docFound && docFound._id) {
      const results = await this.cacheManager.store.keys(`trans_api_yatch_type_filter_*`);
      for (let i = 0; i < results.length; i++) {
        const resultKey = results[i];
        await this.cacheManager.del(resultKey);
      }
    }
    const result = await this.yatchTypesModel.deleteOne({ _id: id });
    return result;
  }

  async countDocuments(filter?: FilterYatchTypesDto): Promise<Number> {
    const newFilter = {
      brand: filter.brand,
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

    return this.yatchTypesModel.countDocuments(newFilter);
  }

  async query(
    filter?: FilterYatchTypesDto,
    sort?: SortYatchTypesDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<YatchTypes[]> {
    const { page = 1, pageSize = 10 } = paging;
    const newFilter = {
      brand: filter.brand,
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

    return this.yatchTypesModel
      .find(newFilter)
      .sort(sort || { createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async all(filter?: FilterYatchTypesDto): Promise<YatchTypes[]> {
    const newFilter = {
      brand: filter.brand,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    const cachedKey = this.yatchTypeListKey(newFilter);
    let data;
    if (cachedKey) {
      data = await this.cacheManager.get(cachedKey);
      if (!data) {
        data = await this.yatchTypesModel.find(newFilter).lean();
        if (data) {
          await this.cacheManager.set(cachedKey, data);
        }
      }
    }
    return data;
  }

  async findOne(query: FilterYatchTypesDto): Promise<YatchTypes> {
    return this.yatchTypesModel.findOne(query || {}).lean();
  }
}

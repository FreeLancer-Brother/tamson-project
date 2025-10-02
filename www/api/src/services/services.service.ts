import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { Services, ServicesDocument } from "./schemas/services.schema";
import { Model } from "mongoose";
import {
  CreateServicesDto,
  FilterServicesDto,
  SortServicesDto,
  UpdateServicesDto,
} from "./dtos/services.dto";
import { DeleteResult } from "mongodb";
import { PagingDto } from "src/dtos/app.dto";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name)
    private readonly servicesModel: Model<ServicesDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  serviceAll = () => `trans_api_service_all`;

  async create(createServicesDto: CreateServicesDto): Promise<Services> {
    const createdDoc = await this.servicesModel.create(createServicesDto);
    const cachedKey = this.serviceAll();
    const data = await this.servicesModel.find({}).lean();
    if (data) {
      await this.cacheManager.set(cachedKey, data);
    }
    return createdDoc;
  }

  async update(
    id: string,
    updateServicesDto: UpdateServicesDto
  ): Promise<Services> {
    const updateDoc = await this.servicesModel.findByIdAndUpdate(
      id,
      updateServicesDto,
      { new: true }
    );
    const cachedKey = this.serviceAll();
    const data = await this.servicesModel.find({}).lean();
    if (data) {
      await this.cacheManager.set(cachedKey, data);
    }
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.servicesModel.deleteOne({ _id: id });
    const cachedKey = this.serviceAll();
    const data = await this.servicesModel.find({}).lean();
    if (data) {
      await this.cacheManager.set(cachedKey, data);
    }
    return result;
  }

  async countDocuments(filter?: FilterServicesDto): Promise<Number> {
    const newFilter = {
      type: filter.type,
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

    return this.servicesModel.countDocuments(newFilter);
  }

  async query(
    filter?: FilterServicesDto,
    sort?: SortServicesDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<Services[]> {
    const { page = 1, pageSize = 10 } = paging;
    const newFilter = {
      type: filter.type,
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

    return this.servicesModel
      .find(newFilter)
      .sort(sort || { createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async all(filter?: FilterServicesDto): Promise<Services[]> {
    const cachedKey = this.serviceAll();
    let data;
    if (cachedKey) {
      data = await this.cacheManager.get(cachedKey);
      if (!data) {
        data = await this.servicesModel.find({}).sort({ type: 1 }).lean();
        if (data) {
          await this.cacheManager.set(cachedKey, data);
        }
      }
    }
    return data;
  }

  async findOne(query: FilterServicesDto): Promise<Services> {
    return this.servicesModel.findOne(query || {}).lean();
  }
}

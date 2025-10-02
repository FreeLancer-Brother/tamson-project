import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { News, NewsDocument } from "./schemas/news.schema";
import { Model } from "mongoose";
import {
  CreateNewsDto,
  FilterNewsDto,
  SortNewsDto,
  UpdateNewsDto,
} from "./dtos/news.dto";
import { DeleteResult } from "mongodb";
import { PagingDto } from "src/dtos/app.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<NewsDocument>
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const createdDoc = await this.newsModel.create(createNewsDto);
    return createdDoc;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    const updateDoc = await this.newsModel.findByIdAndUpdate(id, updateNewsDto, { new: true });
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.newsModel.deleteOne({ _id: id });
    return result;
  }

  async countDocuments(filter?: FilterNewsDto,): Promise<Number> {
    const newFilter = {
      type: filter.type,
      slug: filter.slug,
      "content.content": filter.content
        ? { $regex: ".*" + filter.content + ".*", $options: "i" }
        : undefined,
      "title.content": filter.title
        ? { $regex: ".*" + filter.title + ".*", $options: "i" }
        : undefined,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.newsModel.countDocuments(newFilter);
  }

  async query(
    filter?: FilterNewsDto,
    sort?: SortNewsDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<News[]> {
    const { page=1, pageSize=10 } = paging;
    const newFilter = {
      _id: filter._id,
      type: filter.type,
      slug: filter.slug,
      "content.content": filter.content
        ? { $regex: ".*" + filter.content + ".*", $options: "i" }
        : undefined,
      "title.content": filter.title
        ? { $regex: ".*" + filter.title + ".*", $options: "i" }
        : undefined,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.newsModel
      .find(newFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();
  }

  async findOne(query: FilterNewsDto): Promise<News> {
    return this.newsModel.findOne(query || {}).lean();
  }
}

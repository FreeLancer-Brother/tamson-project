import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AboutUs, AboutUsDocument } from "./schemas/about-us.schema";
import { Model } from "mongoose";
import { CreateAboutUsDto, UpdateAboutUsDto } from "./dtos/about-us.dto";
import { DeleteResult } from "mongodb";

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name)
    private readonly aboutUsModel: Model<AboutUsDocument>
  ) {}

  async findOne(): Promise<AboutUs> {
    return this.aboutUsModel.findOne({});
  }

  async update(
    id: string,
    updateAboutUsDto: UpdateAboutUsDto
  ): Promise<AboutUs> {
    const updateDoc = await this.aboutUsModel.findByIdAndUpdate(
      id,
      updateAboutUsDto,
      { new: true }
    );
    return updateDoc;
  }

  async create(createAboutUsDto: CreateAboutUsDto): Promise<AboutUs> {
    const createdDoc = await this.aboutUsModel.create(createAboutUsDto);

    return createdDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.aboutUsModel.deleteOne({ _id: id });
    return result;
  }
}

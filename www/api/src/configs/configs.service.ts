import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from 'cache-manager';
import { Configs, ConfigsDocument } from "./schemas/configs.schema";
import { Model } from "mongoose";
import { CreateAboutUsConfigsDto, CreateCommonConfigsDto, CreateContactUsConfigsDto, CreateFloatButtonsConfigsDto, CreateFooterConfigsDto, CreateHeaderConfigsDto, CreateHomeConfigsDto, CreateNewsConfigsDto, UpdateAboutUsConfigsDto, UpdateCommonConfigsDto, UpdateContactUsConfigsDto, UpdateFloatButtonsConfigsDto, UpdateFooterConfigsDto, UpdateHeaderConfigsDto, UpdateHomeConfigsDto, UpdateNewsConfigsDto } from "./dtos/configs.dto";
import { DeleteResult } from "mongodb";
import { PagingDto } from "src/dtos/app.dto";
import * as _ from "lodash";

@Injectable()
export class ConfigsService {
  constructor(
    @InjectModel(Configs.name) private readonly configsModel: Model<ConfigsDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  configKey = (key) => `trans_api_config_${key}`;

  async createNewsConfig(createDto: CreateNewsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "news" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "news"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateNewsConfig(updateDto: UpdateNewsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "news" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async createCommonConfig(createDto: CreateCommonConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "common" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "common"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateCommonConfig(updateDto: UpdateCommonConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "common" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async createHomeConfig(createDto: CreateHomeConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "home" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "home"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateHomeConfig(updateDto: UpdateHomeConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "home" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async createAboutUsConfig(createDto: CreateAboutUsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "about-us" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "about-us"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateAboutUsConfig(updateDto: UpdateAboutUsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "about-us" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async createContactUsConfig(createDto: CreateContactUsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "contact-us" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "contact-us"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateContactUsConfig(updateDto: UpdateContactUsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "contact-us" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async createHeaderConfig(createDto: CreateHeaderConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "header" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "header"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateHeaderConfig(updateDto: UpdateHeaderConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "header" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async createFooterConfig(createDto: CreateFooterConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "footer" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "footer"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateFooterConfig(updateDto: UpdateFooterConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "footer" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async createFloatButtonsConfig(createDto: CreateFloatButtonsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "float-buttons" }).lean();
    if (docFound && docFound._id) {
      return docFound;
    }
    const createdDoc = await this.configsModel.create({
      ...createDto,
      configKey: "float-buttons"
    });
    await this.cacheManager.set(this.configKey(createdDoc.configKey), createdDoc.toObject());
    return createdDoc;
  }

  async updateFloatButtonsConfig(updateDto: UpdateFloatButtonsConfigsDto): Promise<Configs> {
    const docFound = await this.configsModel.findOne({ configKey: "float-buttons" }).lean();
    if (!docFound || !docFound._id) {
      return null;
    }
    const updateDoc = await this.configsModel.findByIdAndUpdate(docFound._id, {
      ...docFound,
      ...updateDto,
    }, { new: true });
    await this.cacheManager.set(this.configKey(updateDoc.configKey), updateDoc.toObject());
    return updateDoc;
  }

  async findByConfigKey(configKey: string): Promise<Configs> {
    const cachedKey = this.configKey(configKey);
    let data;
    if (cachedKey) {
      data = await this.cacheManager.get(cachedKey);
      if (!data) {
        data = await this.configsModel.findOne({ configKey }).lean();
        if (data) {
          await this.cacheManager.set(cachedKey, data);
        }
      }
    }
    return data;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { PagingDto } from "src/dtos/app.dto";
import {
  CreateUserDto,
  FilterUserDto,
  SortUserDto,
  UpdateUserDto,
} from "./dtos/users.dto";
import { User, UserDocument } from "./schemas/users.schema";
import { bcryptSalt } from "src/utils/constants";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    if (createDto.password) {
      const hashPassword = await bcrypt.hashSync(
        createDto.password,
        bcryptSalt
      );
      createDto = {
        ...createDto,
        password: hashPassword,
      };
    }

    const createdDoc = await this.userModel.create(createDto);
    return createdDoc;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async query(
    filter?: FilterUserDto,
    sort?: SortUserDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<User[]> {
    const { page=1, pageSize=10 } = paging;
    return this.userModel
      .find(filter || {})
      .sort(sort || { createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async findOne(filter: FilterUserDto): Promise<User> {
    return this.userModel.findOne(filter || {}).exec();
  }

  async findOneAndUpdate(id: string, updateDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, updateDto).exec();
  }
}

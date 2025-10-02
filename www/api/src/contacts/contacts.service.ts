import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Contact, ContactDocument } from "./schemas/contacts.schema";
import { Model } from "mongoose";
import {
  CreateContactDto,
  FilterContactDto,
  SortContactDto,
  UpdateContactDto,
} from "./dtos/contacts.dto";
import { PagingDto } from "src/dtos/app.dto";
import { DeleteResult } from "mongodb";
import * as nodemailer from 'nodemailer';


@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>
  ) {}

  async submit(createContractDto: CreateContactDto): Promise<Contact> {
    const createdDoc = await this.contactModel.create(createContractDto);

    const transporter = nodemailer.createTransport({
      host: 'imap.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'tamsonyachting@gmail.com',
        pass: 'nuryqhmezxnvqtuh',
      },
    });
    const result = await transporter.sendMail({
      from: 'tamsonyachting@gmail.com',
      to: 'ngan.pt@tamsonyachting.com',
      bcc: 'lequocdat1311@gmail.com',
      subject: 'Có người đăng ký mới. Vui lòng kiểm tra',
      text: `Thông tin đăng ký: \n Name: ${createdDoc.fullname} \n Email: ${createdDoc.email} \n Phone: ${createdDoc.phone} \n Comment: ${createdDoc.comment}`
    });

    return createdDoc;
  }

  async getAll(): Promise<Contact[]> {
    return this.contactModel
      .find()
      .exec();
  }

  async query(
    filter?: FilterContactDto,
    sort?: SortContactDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<Contact[]> {
    const { page=1, pageSize=10 } = paging;
    const newFilter = {
      type: filter.type,
      email: filter.email ? { $regex: ".*" + filter.email + ".*", $options: "i" } : undefined,
      fullname: filter.fullname
        ? { $regex: ".*" + filter.fullname + ".*" }
        : undefined,

      phone: filter.phone ? { $regex: ".*" + filter.phone + ".*", $options: "i" } : undefined,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.contactModel
      .find(newFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async update(id: string, update: UpdateContactDto): Promise<Contact> {
    const updateDoc = await this.contactModel.findByIdAndUpdate(id, update, { new: true });
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.contactModel.deleteOne({ _id: id });
    return result;
  }

  async findOne(id: string): Promise<Contact> {
    return this.contactModel.findById(id);
  }

  async countDocuments(filter?: FilterContactDto): Promise<Number> {
    const newFilter = {
      name: filter.fullname ? { $regex: ".*" + filter.fullname + ".*", $options: "i" } : undefined,
      email: filter.email,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.contactModel.countDocuments(newFilter);
  }
}

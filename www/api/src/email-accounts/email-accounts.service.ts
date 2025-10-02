import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EmailAccounts, EmailAccountsDocument } from "./schemas/email-accounts.schema";
import { Model } from "mongoose";
import {
  CreateEmailAccountsDto,
  EmailAccountsSendEmailDto,
  FilterEmailAccountsDto,
  SortEmailAccountsDto,
  UpdateEmailAccountsDto,
} from "./dtos/email-accounts.dto";
import { PagingDto } from "src/dtos/app.dto";
import { DeleteResult } from "mongodb";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailAccountsService {
  constructor(
    @InjectModel(EmailAccounts.name)
    private readonly emailAccountsModel: Model<EmailAccountsDocument>
  ) {}

  async create(createEmailAccountsDto: CreateEmailAccountsDto): Promise<EmailAccounts> {
    const createdDoc = await this.emailAccountsModel.create(createEmailAccountsDto);
    return createdDoc;
  }

  async update(id: string, updateEmailAccountsDto: UpdateEmailAccountsDto): Promise<EmailAccounts> {
    const updateDoc = await this.emailAccountsModel.findByIdAndUpdate(id, updateEmailAccountsDto, { new: true });
    return updateDoc;
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.emailAccountsModel.deleteOne({ _id: id });
    return result;
  }

  async countDocuments(filter?: FilterEmailAccountsDto,): Promise<Number> {
    const newFilter = {
      name: filter.name,
      email: filter.email,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.emailAccountsModel.countDocuments(newFilter);
  }

  async query(
    filter?: FilterEmailAccountsDto,
    sort?: SortEmailAccountsDto,
    paging: PagingDto = { page: 1, pageSize: 10 }
  ): Promise<EmailAccounts[]> {
    const { page=1, pageSize=10 } = paging;
    const newFilter = {
      name: filter.name,
      email: filter.email,
      createdAt:
        filter.fromDate && filter.toDate
          ? { $gte: filter.fromDate, $lte: filter.toDate }
          : undefined,
    };

    Object.keys(newFilter).forEach(
      (key) => newFilter[key] === undefined && delete newFilter[key]
    );

    return this.emailAccountsModel
      .find(newFilter)
      .sort(sort || { createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  async options(): Promise<any[]> {
    return this.emailAccountsModel
      .find({}, '_id email name')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<EmailAccounts> {
    return this.emailAccountsModel.findById(id);
  }

  async sendEmail(emailAccount: EmailAccounts, emailInfo: EmailAccountsSendEmailDto): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: emailAccount.mailServerAddress || "smtp.gmail.com",
      port: emailAccount.mailServerPort || 587,
      secure: emailAccount.isTls || false,
      auth: {
        user: emailAccount.email,
        pass: emailAccount.password,
      },
    });

    return Promise.all(emailInfo.emails.map(email => transporter.sendMail({
      from: `"${emailAccount.name}" <${emailAccount.email}>`,
      to: email,
      subject: emailInfo.subject,
      html: emailInfo.content,
    })));
  }
}

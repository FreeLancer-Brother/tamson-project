import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { Parser } from 'json2csv'
import * as moment from "moment";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ContactsService } from "./contacts.service";

@Controller("contacts")
export class ContactsController {
  constructor(private contactService: ContactsService) { }

  @Post("submit")
  async submit(@Request() req) {
    const submitData = await this.contactService.submit(req.body);
    return {
      data: submitData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.contactService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.contactService.delete(id);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  async get(@Query() query) {
    const filter = {
      _id: query.id,
      comment: query.comment,
      phone: query.phone,
      email: query.email,
      fromDate: query.fromDate,
      fullname: query.fullname,
      toDate: query.toDate,
      type: query.type,
    }
    const total = await this.contactService.countDocuments(filter);
    const result = await this.contactService.query(
      filter,
      {},
      { page: query.page, pageSize: query.pageSize }
    );

    return {
      data: result,
      total,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("/export")
  async export(@Response() res) {
    const result = await this.contactService.getAll();

    const fields = [{
      label: 'Ho ten',
      value: 'fullname'
    }, {
      label: 'Email',
      value: 'email'
    }, {
      label: 'So dien thoai',
      value: 'phone'
    }, {
      label: 'Noi dung',
      value: 'comment'
    }];

    const json2csv = new Parser({ fields: fields })
    const csv = json2csv.parse(result)

    res.attachment(`contact-export-${moment().format('HHmmss-DDMMYYYY')}.csv`);
    res.status(200).send(csv);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async getDetail(@Param("id") id: string) {
    const result = await this.contactService.findOne(id);
    return {
      data: result,
    };
  }
}

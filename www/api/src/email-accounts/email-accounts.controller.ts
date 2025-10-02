import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { EmailAccountsService } from "./email-accounts.service";

@Controller("email-accounts")
export class EmailAccountsController {
  constructor(private readonly emailAccountsService: EmailAccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Request() req) {
    console.log(req.body);
    const submitData = await this.emailAccountsService.create(req.body);
    return {
      data: submitData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Request() req, @Param("id") id: string) {
    const result = await this.emailAccountsService.update(id, req.body);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await this.emailAccountsService.delete(id);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  async get(@Query() query) {
    const filter = {
      _id: query.id,
      name: query.name,
      email: query.email,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
    const total = await this.emailAccountsService.countDocuments(filter);
    const result = await this.emailAccountsService.query(
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
  @Get("/options")
  async getOptions(@Query() query) {
    const result = await this.emailAccountsService.options();

    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async getDetail(@Param("id") id: string) {
    const result = await this.emailAccountsService.findOne(id);
    return {
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post("/:id/send-email")
  async sendEmail(@Request() req, @Param("id") id: string) {
    const { emails, subject, content } = req.body;
    const emailAccount = await this.emailAccountsService.findOne(id);

    if (!emailAccount || !emailAccount._id || !emails || emails.length === 0 || !subject || !content) {
      return {
        data: null,
      }
    }

    const result = await this.emailAccountsService.sendEmail(emailAccount, {
      emails,
      subject,
      content,
    });

    return {
      data: result,
    };
  }
}

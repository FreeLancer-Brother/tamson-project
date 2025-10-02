import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailAccountsController } from "./email-accounts.controller";
import { EmailAccountsService } from "./email-accounts.service";
import { EmailAccounts, EmailAccountsSchema } from "./schemas/email-accounts.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmailAccounts.name, schema: EmailAccountsSchema }]),
  ],
  controllers: [EmailAccountsController],
  providers: [EmailAccountsService],
  exports: [EmailAccountsService],
})
export class EmailAccountsModule {}

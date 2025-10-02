export class EmailAccountsSendEmailDto {
  readonly subject: string;
  readonly content: string;
  readonly emails: string[];
}

export class CreateEmailAccountsDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly mailServerAddress: string;
  readonly mailServerPort: number;
  readonly isTls: boolean
}

export class UpdateEmailAccountsDto {
  readonly email?: string;
  readonly password?: string;
  readonly name?: string;
  readonly mailServerAddress?: string;
  readonly mailServerPort?: number;
  readonly isTls?: boolean
}

export class FilterEmailAccountsDto {
  readonly _id?: string;
  readonly email?: string;
  readonly name?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortEmailAccountsDto {}

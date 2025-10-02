export class CreateContactDto {
  readonly fullname: string;
  readonly phone: string;
  readonly email: string;
  readonly comment?: string;
  readonly type: string;
}

export class UpdateContactDto {
  readonly email?: string;
  readonly phone?: string;
  readonly fullname?: string;
  readonly comment?: string;
  readonly type?: string;
}

export class FilterContactDto {
  readonly _id?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly fullname?: string;
  readonly comment?: string;
  readonly type?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortContactDto {
  readonly _id?: string;
  readonly email?: string;
  readonly fullname?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

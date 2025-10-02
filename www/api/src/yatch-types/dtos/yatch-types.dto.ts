import { MultiLanguageDto, SEODto } from "src/utils/objects.constant";

export class CreateYatchTypesDto {
  readonly image: string;
  readonly name: MultiLanguageDto[];
  readonly slug: string;
  readonly seo: SEODto;
  readonly content: MultiLanguageDto[];
  readonly brand: string;
}

export class UpdateYatchTypesDto {
  readonly image?: string;
  readonly name?: MultiLanguageDto[];
  readonly slug?: string;
  readonly seo?: SEODto;
  readonly content?: MultiLanguageDto[];
  readonly brand?: string;
}

export class FilterYatchTypesDto {
  readonly _id?: string;
  readonly name?: MultiLanguageDto[];
  readonly slug?: string;
  readonly brand?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortYatchTypesDto {}

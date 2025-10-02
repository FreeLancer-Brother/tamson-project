import { MultiLanguageDto, SEODto } from "src/utils/objects.constant";

export class CreateNewsDto {
  readonly image: string;
  readonly title: MultiLanguageDto[];
  readonly content: MultiLanguageDto[];
  readonly type: string;
  readonly slug: string;
  readonly seo: SEODto;
}

export class UpdateNewsDto {
  readonly image?: string;
  readonly title?: MultiLanguageDto[];
  readonly content?: MultiLanguageDto[];
  readonly type?: string;
  readonly slug?: string;
  readonly seo?: SEODto;
}

export class FilterNewsDto {
  readonly _id?: string | Object;
  readonly image?: string;
  readonly title?: MultiLanguageDto[];
  readonly content?: MultiLanguageDto[];
  readonly type?: string;
  readonly slug?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortNewsDto {}

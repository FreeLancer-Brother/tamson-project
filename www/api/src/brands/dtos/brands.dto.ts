import { MultiLanguageDto, SEODto } from "src/utils/objects.constant";

export class CreateBrandsDto {
  readonly image: string;
  readonly logo: string;
  readonly name: string;
  readonly slug: string;
  readonly seo: SEODto;
  readonly content: MultiLanguageDto[];
  readonly link?: string;
  readonly order?: number;
  readonly headline?: string;
  readonly video?: string;
}

export class UpdateBrandsDto {
  readonly image?: string;
  readonly logo?: string;
  readonly name?: string;
  readonly slug?: string;
  readonly seo?: SEODto;
  readonly content?: MultiLanguageDto[];
  readonly link?: string;
  readonly order?: number;
  readonly headline?: string;
  readonly video?: string;
}

export class FilterBrandsDto {
  readonly _id?: string;
  readonly name?: string;
  readonly slug?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortBrandsDto {
  readonly order?: number;
}

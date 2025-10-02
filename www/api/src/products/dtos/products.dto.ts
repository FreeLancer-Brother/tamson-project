import { MultiLanguageDto, SEODto } from "src/utils/objects.constant";

export class CreateProductsDto {
  readonly image: string;
  readonly bannerImage: string;
  readonly name: MultiLanguageDto[];
  readonly slug: string;
  readonly seo: SEODto;
  readonly content: MultiLanguageDto[];
  readonly interiorDesign: MultiLanguageDto[];
  readonly specifications: {
    readonly label: MultiLanguageDto[];
    readonly value: MultiLanguageDto[];
  }[];
  readonly tabContents: {
    readonly label: MultiLanguageDto[];
    readonly content: MultiLanguageDto[];
  }[];
  readonly designers: {
    readonly image: string;
    readonly name: string;
    readonly position: MultiLanguageDto[];
  }[];
  readonly brochureLink: string;
  readonly productLine: string;
  readonly galleries?: string[];
  readonly order?: number;
}

export class UpdateProductsDto {
  readonly image?: string;
  readonly bannerImage?: string;
  readonly name?: MultiLanguageDto[];
  readonly slug?: string;
  readonly seo?: SEODto;
  readonly content?: MultiLanguageDto[];
  readonly interiorDesign?: MultiLanguageDto[];
  readonly specifications?: {
    readonly label: MultiLanguageDto[];
    readonly value: MultiLanguageDto[];
  }[];
  readonly tabContents?: {
    readonly label: MultiLanguageDto[];
    readonly content: MultiLanguageDto[];
  }[];
  readonly designers?: {
    readonly image: string;
    readonly name: string;
    readonly position: MultiLanguageDto[];
  }[];
  readonly brochureLink?: string;
  readonly productLine?: string;
  readonly galleries?: string[];
  readonly order?: number;
}

export class FilterProductsDto {
  readonly _id?: string;
  readonly name?: MultiLanguageDto[];
  readonly slug?: string;
  readonly productLine?: string | string[];
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortProductsDto {}

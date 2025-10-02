import { MultiLanguageDto, SEODto } from "src/utils/objects.constant";

export class CreateServicesDto {
  readonly image: string;
  readonly servicesBackground?: string;
  readonly servicesHeadImage?: string;
  readonly name: MultiLanguageDto[];
  readonly slug: string;
  readonly seo: SEODto;
  readonly content?: MultiLanguageDto[];
  readonly content2?: MultiLanguageDto[];
  readonly title?: MultiLanguageDto[];
  readonly docks?: {
    readonly image: string;
    readonly title: MultiLanguageDto[];
  }[];
  readonly galleries?: string[];
  readonly facilities?: {
    readonly image: string;
    readonly title: MultiLanguageDto[];
  }[];
  readonly services?: {
    readonly image: string;
    readonly title: MultiLanguageDto[];
    readonly content: MultiLanguageDto[];
  }[];
  readonly products?: {
    readonly name: MultiLanguageDto[];
    readonly length?: string;
    readonly year?: string;
    readonly cabin?: string;
    readonly area?: string;
    readonly price?: string;
    readonly show: number;
    readonly content: MultiLanguageDto[];
    readonly image1: string;
    readonly image2: string;
    readonly image3: string;
  }[];
  readonly type: number;
}

export class UpdateServicesDto {
  readonly image?: string;
  readonly servicesBackground?: string;
  readonly servicesHeadImage?: string;
  readonly name?: MultiLanguageDto[];
  readonly slug?: string;
  readonly seo?: SEODto;
  readonly content?: MultiLanguageDto[];
  readonly content2?: MultiLanguageDto[];
  readonly title?: MultiLanguageDto[];
  readonly docks?: {
    readonly image: string;
    readonly title: MultiLanguageDto[];
  }[];
  readonly galleries?: string[];
  readonly facilities?: {
    readonly image: string;
    readonly title: MultiLanguageDto[];
  }[];
  readonly services?: {
    readonly image: string;
    readonly title: MultiLanguageDto[];
    readonly content: MultiLanguageDto[];
  }[];
  readonly products?: {
    readonly name: MultiLanguageDto[];
    readonly length?: string;
    readonly year?: string;
    readonly cabin?: string;
    readonly area?: string;
    readonly price?: string;
    readonly show: number;
    readonly content: MultiLanguageDto[];
    readonly image1: string;
    readonly image2: string;
    readonly image3: string;
  }[];
  readonly type?: number;
}

export class FilterServicesDto {
  readonly _id?: string;
  readonly name?: MultiLanguageDto[];
  readonly slug?: string;
  readonly type?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortServicesDto {}

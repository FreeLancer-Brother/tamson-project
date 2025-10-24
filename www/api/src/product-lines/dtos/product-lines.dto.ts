import { MultiLanguageDto, SEOSchema } from "src/utils/objects.constant";

export class CreateProductLinesDto {
  readonly image: string;
  readonly name: MultiLanguageDto[];
  readonly content: MultiLanguageDto[];
  readonly yatchType: string;
  readonly order?: number;
  readonly seo?: SEOSchema
}

export class UpdateProductLinesDto {
  readonly image?: string;
  readonly name?: MultiLanguageDto[];
  readonly content?: MultiLanguageDto[];
  readonly yatchType?: string;
  readonly order?: number;
  readonly seo?: SEOSchema
}

export class FilterProductLinesDto {
  readonly _id?: string;
  readonly name?: MultiLanguageDto[];
  readonly yatchType?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class SortProductLinesDto {}

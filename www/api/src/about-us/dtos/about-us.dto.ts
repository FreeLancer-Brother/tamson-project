import {
  MultiLanguageDto,
  MultiLanguageSildeDto,
} from "src/utils/objects.constant";

export class CreateAboutUsDto {
  readonly image: string;
  readonly title: MultiLanguageDto[];
  readonly file: MultiLanguageDto[];
  readonly description: MultiLanguageDto[];
  readonly slides: MultiLanguageSildeDto[];
}

export class UpdateAboutUsDto {
  readonly image?: string;
  readonly title?: MultiLanguageDto[];
  readonly file?: MultiLanguageDto[];
  readonly description?: MultiLanguageDto[];
  readonly slides?: MultiLanguageSildeDto[];
}

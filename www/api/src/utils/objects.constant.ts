import { Prop } from "@nestjs/mongoose";

export class MultiLanguageDto {
  readonly language: string;
  readonly content: string;
}

export class SEODto {
  readonly title: MultiLanguageDto[];
  readonly description: MultiLanguageDto[];
  readonly keyword: MultiLanguageDto[];
}

export class MultiLanguageSildeDto {
  readonly language: string;
  readonly title: string;
  readonly image: string;
  readonly contents: ContentSlideDto[];
}

export class ContentSlideDto {
  readonly title: string;
  readonly description: string;
}

export class MultiLanguageSchema {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  content: string;
}

export class SEOSchema {
  @Prop({ required: true })
  title: MultiLanguageSchema[];

  @Prop()
  description: MultiLanguageSchema[];

  @Prop()
  keyword: MultiLanguageSchema[];
}

export class MultiLanguageSildeSchema {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  contents: ContentSlideSchema[];
}

export class ContentSlideSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

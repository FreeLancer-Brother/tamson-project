import { MultiLanguageDto, SEODto } from "src/utils/objects.constant";

export class CreateNewsConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly seo: SEODto;
  };
}

export class UpdateNewsConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly seo: SEODto;
  };
}

export class CreateCommonConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly seo: SEODto;
    readonly faviconImage: string;
    readonly mainEmailContact?: string;
  };
}

export class UpdateCommonConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly seo: SEODto;
    readonly faviconImage: string;
    readonly mainEmailContact?: string;
  };
}

export class CreateHomeConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly seo: SEODto;
    readonly headBanner: {
      readonly image: string;
      readonly video: string;
      readonly title: MultiLanguageDto[];
      readonly subtitle: MultiLanguageDto[];
      readonly button1Title: MultiLanguageDto[];
      readonly button1Link: string;
      readonly button2Title: MultiLanguageDto[];
      readonly button2Link: string;
    }[];
    readonly welcome: {
      readonly top: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly image1: string;
        readonly image2: string;
      };
      readonly bottom: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly image1: string;
        readonly image2: string;
        readonly image3: string;
        readonly statistics: {
          readonly title: MultiLanguageDto[];
          readonly subtitle: MultiLanguageDto[];
        }[];
      };
    };
    readonly brands: {
      readonly title: MultiLanguageDto[];
      readonly content: MultiLanguageDto[];
    };
    readonly services: {
      readonly section1: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly subtitle: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly image1: string;
        readonly image2: string;
        readonly image3: string;
        readonly image4: string;
        readonly image5: string;
        readonly background: string;
      };
      readonly section2: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly image: string;
      };
      readonly section3: {
        readonly title: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly background: string;
      };
    };
  };
}

export class UpdateHomeConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly seo: SEODto;
    readonly headBanner: {
      readonly image: string;
      readonly video: string;
      readonly title: MultiLanguageDto[];
      readonly subtitle: MultiLanguageDto[];
      readonly button1Title: MultiLanguageDto[];
      readonly button1Link: string;
      readonly button2Title: MultiLanguageDto[];
      readonly button2Link: string;
    }[];
    readonly welcome: {
      readonly top: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly image1: string;
        readonly image2: string;
      };
      readonly bottom: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly image1: string;
        readonly image2: string;
        readonly image3: string;
        readonly statistics: {
          readonly title: MultiLanguageDto[];
          readonly subtitle: MultiLanguageDto[];
        }[];
      };
    };
    readonly brands: {
      readonly title: MultiLanguageDto[];
      readonly content: MultiLanguageDto[];
    };
    readonly services: {
      readonly section1: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly subtitle: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly image1: string;
        readonly image2: string;
        readonly image3: string;
        readonly image4: string;
        readonly image5: string;
        readonly background: string;
      };
      readonly section2: {
        readonly title1: MultiLanguageDto[];
        readonly title2: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly image: string;
      };
      readonly section3: {
        readonly title: MultiLanguageDto[];
        readonly content: MultiLanguageDto[];
        readonly buttonTitle: MultiLanguageDto[];
        readonly buttonLink: string;
        readonly background: string;
      };
    };
  };
}

export class CreateAboutUsConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly seo: SEODto;
    readonly bannerImage: string;
    readonly title: MultiLanguageDto[];
    readonly content: MultiLanguageDto[];
    readonly buttonTitle: MultiLanguageDto[];
    readonly buttonLink: string;
    readonly namePerson?: MultiLanguageDto[];
    readonly position?: string;
    readonly avatar?: string;
    readonly slides: {
      readonly title: MultiLanguageDto[];
      readonly content: MultiLanguageDto[];
      readonly establishedIn: MultiLanguageDto[];
      readonly establishedBy: string;
      readonly image: string;
    }[];
    readonly titleMember?: MultiLanguageDto[];
    readonly contentMember?: MultiLanguageDto[];
    readonly members?: {
      readonly namePerson: MultiLanguageDto[];
      readonly positionPerson: string;
      readonly avatar: string;
    }[];
  };
}

export class UpdateAboutUsConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly seo: SEODto;
    readonly bannerImage: string;
    readonly title: MultiLanguageDto[];
    readonly content: MultiLanguageDto[];
    readonly buttonTitle: MultiLanguageDto[];
    readonly buttonLink: string;
    readonly namePerson?: MultiLanguageDto[];
    readonly position?: string;
    readonly avatar?: string;
    readonly slides: {
      readonly title: MultiLanguageDto[];
      readonly content: MultiLanguageDto[];
      readonly establishedIn: MultiLanguageDto[];
      readonly establishedBy: string;
      readonly image: string;
    }[];
    readonly titleMember?: MultiLanguageDto[];
    readonly contentMember?: MultiLanguageDto[];
    readonly members?: {
      readonly namePerson: MultiLanguageDto[];
      readonly positionPerson: string;
      readonly avatar: string;
    }[];
  };
}

export class CreateContactUsConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly seo: SEODto;
    readonly backgroundImage: string;
    readonly map: string;
    readonly phone: string;
    readonly email: string;
    readonly facebookLink: string;
    readonly facebookName: string;
  };
}

export class UpdateContactUsConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly seo: SEODto;
    readonly backgroundImage: string;
    readonly map: string;
    readonly phone: string;
    readonly email: string;
    readonly facebookLink: string;
    readonly facebookName: string;
  };
}

export class CreateHeaderConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly logo: string;
    readonly facebookLink: string;
    readonly youtubeLink: string;
    readonly instagramLink: string;
  };
}

export class UpdateHeaderConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly logo: string;
    readonly facebookLink: string;
    readonly youtubeLink: string;
    readonly instagramLink: string;
  };
}

export class CreateFooterConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly logo: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly location: string;
    readonly location2: string;
    readonly facebookLink: string;
    readonly youtubeLink: string;
    readonly instagramLink: string;
  };
}

export class UpdateFooterConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly logo: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly location: string;
    readonly location2: string;
    readonly facebookLink: string;
    readonly youtubeLink: string;
    readonly instagramLink: string;
  };
}

export class CreateFloatButtonsConfigsDto {
  readonly configKey: string;
  readonly configValue: {
    readonly smsLink: string;
    readonly callLink: string;
    readonly messageLink: string;
    readonly zalo: string;
  };
}

export class UpdateFloatButtonsConfigsDto {
  readonly configKey?: string;
  readonly configValue?: {
    readonly smsLink: string;
    readonly callLink: string;
    readonly messageLink: string;
    readonly zalo: string;
  };
}

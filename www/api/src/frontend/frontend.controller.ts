import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { stripHtml } from "string-strip-html";
import { NewsService } from "src/news/news.service";
import { BrandsService } from "src/brands/brands.service";
import { YatchTypesService } from "src/yatch-types/yatch-types.service";
import { ProductLinesService } from "src/product-lines/product-lines.service";
import { ProductsService } from "src/products/products.service";
import { ContactsService } from "src/contacts/contacts.service";
import { ServicesService } from "src/services/services.service";
import { ConfigsService } from "src/configs/configs.service";
import { UpdateAboutUsConfigsDto, UpdateCommonConfigsDto, UpdateContactUsConfigsDto, UpdateFloatButtonsConfigsDto, UpdateHomeConfigsDto, UpdateNewsConfigsDto } from "src/configs/dtos/configs.dto";

@Controller("frontend")
export class FrontendController {
  constructor(
    private newsService: NewsService,
    private brandService: BrandsService,
    private yatchTypeService: YatchTypesService,
    private productLineService: ProductLinesService,
    private productService: ProductsService,
    private contactService: ContactsService,
    private serviceService: ServicesService,
    private configService: ConfigsService,
  ) { }

  @Get("/news")
  async getNews(@Query() query) {
    const total = await this.newsService.countDocuments({});
    const result = await this.newsService.query(
      {},
      {},
      { page: query.page, pageSize: query.pageSize }
    );

    return {
      data: (result || []).map(item => ({
        ...item,
        title: item.title.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        content: item.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        shortContent: item.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = stripHtml(cur.content || '').result.slice(0, 250);
          return acc;
        }, {}),
      })),
      total,
    };
  }

  @Get("/news/:slug")
  async getNewBySlug(@Param() params) {
    const { slug } = params;

    const newFound = await this.newsService.findOne({ slug: slug });
    const relatedNews = await this.newsService.query(
      { type: newFound && newFound.type || null, _id: newFound && { '$ne': newFound._id.toString() } || null },
      {},
      { page: 1, pageSize: 5 }
    );

    return {
      data: newFound && newFound._id ? {
        ...newFound,
        seo: {
          ...newFound.seo,
          title: newFound.seo.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          description: newFound.seo.description.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          keyword: newFound.seo.keyword.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        },
        title: newFound.title.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        content: newFound.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
      } : null,
      relatedNews: (relatedNews || []).map(item => ({
        ...item,
        title: item.title.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        content: item.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        shortContent: item.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = stripHtml(cur.content || '').result.slice(0, 250);
          return acc;
        }, {}),
      })),
    };
  }

  @Get("/brands/:slug")
  async getBrandBySlug(@Param() params) {
    const { slug } = params;

    const brandFound = await this.brandService.findOne({ slug: slug });

    if (!brandFound || !brandFound._id) {
      return { data: null };
    }

    const yatchTypes = await this.yatchTypeService.all({ brand: brandFound._id.toString() });

    return {
      data: {
        ...brandFound,
        seo: {
          ...brandFound.seo,
          title: brandFound.seo.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          description: brandFound.seo.description.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          keyword: brandFound.seo.keyword.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        },
        content: brandFound.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        yatchTypes: (yatchTypes || []).map(item => ({
          ...item,
          name: item.name.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          content: item.content.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
      }
    };
  }

  @Get("/yatch-types/:slug")
  async getYatchTypeBySlug(@Param() params) {
    const { slug } = params;

    const yatchTypeFound = await this.yatchTypeService.findOne({ slug: slug });

    if (!yatchTypeFound || !yatchTypeFound._id) {
      return { data: null };
    }

    const productLines = await this.productLineService.all({ yatchType: yatchTypeFound._id.toString() });
    const products = await this.productService.all({ productLine: productLines.map(item => item._id.toString()) });

    return {
      data: {
        ...yatchTypeFound,
        seo: {
          ...yatchTypeFound.seo,
          title: yatchTypeFound.seo.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          description: yatchTypeFound.seo.description.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          keyword: yatchTypeFound.seo.keyword.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        },
        name: yatchTypeFound.name.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        content: yatchTypeFound.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        productLines: (productLines || []).map(item => ({
          ...item,
          name: item.name.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          content: item.content.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          products: products.filter(product => product.productLine.toString() == item._id.toString()).map(product => ({
            ...product,
            name: product.name.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          })),
        })),
      }
    };
  }

  @Get("/products/:slug")
  async getProductBySlug(@Param() params) {
    const { slug } = params;

    const productFound = await this.productService.findOne({ slug: slug });

    if (!productFound || !productFound._id) {
      return { data: null };
    }

    return {
      data: {
        ...productFound,
        seo: {
          ...productFound.seo,
          title: productFound.seo.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          description: productFound.seo.description.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          keyword: productFound.seo.keyword.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        },
        name: productFound.name.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        content: productFound.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        interiorDesign: productFound.interiorDesign.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        specifications: (productFound.specifications || []).map(item => ({
          ...item,
          label: item.label.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          value: item.value.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
        tabContents: (productFound.tabContents || []).map(item => ({
          ...item,
          label: item.label.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          content: item.content.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
        designers: (productFound.designers || []).map(item => ({
          ...item,
          position: item.position.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
      }
    };
  }

  @Get("/services/:slug")
  async getServiceBySlug(@Param() params) {
    const { slug } = params;

    const serviceFound = await this.serviceService.findOne({ slug: slug });

    if (!serviceFound || !serviceFound._id) {
      return { data: null };
    }

    return {
      data: {
        ...serviceFound,
        seo: {
          ...serviceFound.seo,
          title: serviceFound.seo.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          description: serviceFound.seo.description.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          keyword: serviceFound.seo.keyword.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        },
        name: serviceFound.name.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        content: serviceFound.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        content2: serviceFound.content2.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        title: (serviceFound.title || []).reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        docks: (serviceFound.docks || []).map(item => ({
          ...item,
          title: item.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
        facilities: (serviceFound.facilities || []).map(item => ({
          ...item,
          title: item.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
        services: (serviceFound.services || []).map(item => ({
          ...item,
          title: item.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          content: (item.content || []).reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
        products: (serviceFound.products || []).map(item => ({
          ...item,
          name: item.name.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          content: (item.content || []).reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
        })),
      }
    };
  }

  @Get("/header/brand")
  async getHeaderBrand() {
    const brands = await this.brandService.all();
    const yatchTypes = await this.yatchTypeService.all({});
    const productLines = await this.productLineService.all({});
    const products = await this.productService.all({});

    return {
      data: (brands || []).map(item => ({
        _id: item._id.toString(),
        slug: item.slug,
        logo: item.logo,
        image: item.image,
        name: item.name,
        content: item.content.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
        yatchTypes: yatchTypes.filter(yatchType => yatchType.brand.toString() == item._id.toString()).map(yatchType => ({
          _id: yatchType._id.toString(),
          slug: yatchType.slug,
          brand: yatchType.brand,
          name: yatchType.name.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          productLines: productLines.filter(productLine => productLine.yatchType.toString() == yatchType._id.toString()).map(productLine => ({
            _id: productLine._id.toString(),
            yatchType: productLine.yatchType,
            name: productLine.name.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            products: products.filter(product => product.productLine.toString() == productLine._id.toString()).map(product => ({
              _id: product._id.toString(),
              slug: product.slug,
              productLine: product.productLine,
              name: product.name.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
            }))
          }))
        })),
      })),
    };
  }

  @Get("/header/service")
  async getHeaderService() {

    const services = await this.serviceService.all();

    return {
      data: (services || []).map(item => ({
        _id: item._id.toString(),
        slug: item.slug,
        name: item.name.reduce(function (acc, cur) {
          acc[cur.language.toLowerCase()] = cur.content;
          return acc;
        }, {}),
      })),
    };
  }

  @Post("/contacts/submit")
  async submitContact(@Request() req) {
    const submitData = await this.contactService.submit(req.body);
    return {
      data: submitData,
    };
  }

  @Get("/configs/:configKey")
  async getDetail(@Param("configKey") configKey: string) {
    let result;
    switch (configKey) {
      case "home":
        const homeConfig: UpdateHomeConfigsDto = await this.configService.findByConfigKey(configKey);
        result = homeConfig.configValue ? {
          ...homeConfig.configValue,
          seo: {
            ...homeConfig.configValue.seo,
            title: homeConfig.configValue.seo.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            description: homeConfig.configValue.seo.description.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            keyword: homeConfig.configValue.seo.keyword.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          },
          headBanner: (homeConfig.configValue.headBanner || []).map(item => ({
            ...item,
            title: item.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            subtitle: item.subtitle.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            button1Title: item.button1Title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            button2Title: item.button2Title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          })),
          welcome: {
            ...homeConfig.configValue.welcome,
            top: {
              ...homeConfig.configValue.welcome.top,
              title1: homeConfig.configValue.welcome.top.title1.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              title2: homeConfig.configValue.welcome.top.title2.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              content: homeConfig.configValue.welcome.top.content.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              buttonTitle: homeConfig.configValue.welcome.top.buttonTitle.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
            },
            bottom: {
              ...homeConfig.configValue.welcome.bottom,
              title1: homeConfig.configValue.welcome.bottom.title1.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              title2: homeConfig.configValue.welcome.bottom.title2.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              statistics: (homeConfig.configValue.welcome.bottom.statistics || []).map(item => ({
                ...item,
                title: item.title.reduce(function (acc, cur) {
                  acc[cur.language.toLowerCase()] = cur.content;
                  return acc;
                }, {}),
                subtitle: item.subtitle.reduce(function (acc, cur) {
                  acc[cur.language.toLowerCase()] = cur.content;
                  return acc;
                }, {}),
              })),
            },
          },
          brands: {
            ...homeConfig.configValue.brands,
            title: homeConfig.configValue.brands.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            content: homeConfig.configValue.brands.content.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          },
          services: {
            ...homeConfig.configValue.services,
            section1: {
              ...homeConfig.configValue.services.section1,
              title1: homeConfig.configValue.services.section1.title1.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              title2: homeConfig.configValue.services.section1.title2.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              subtitle: homeConfig.configValue.services.section1.subtitle.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              content: homeConfig.configValue.services.section1.content.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              buttonTitle: homeConfig.configValue.services.section1.buttonTitle.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
            },
            section2: {
              ...homeConfig.configValue.services.section2,
              title1: homeConfig.configValue.services.section2.title1.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              title2: homeConfig.configValue.services.section2.title2.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              content: homeConfig.configValue.services.section2.content.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              buttonTitle: homeConfig.configValue.services.section2.buttonTitle.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
            },
            section3: {
              ...homeConfig.configValue.services.section3,
              title: homeConfig.configValue.services.section3.title.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              content: homeConfig.configValue.services.section3.content.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
              buttonTitle: homeConfig.configValue.services.section3.buttonTitle.reduce(function (acc, cur) {
                acc[cur.language.toLowerCase()] = cur.content;
                return acc;
              }, {}),
            },
          },
        } : {};
        break;
      case "about-us":
        const aboutUsConfig: UpdateAboutUsConfigsDto = await this.configService.findByConfigKey(configKey);
        result = aboutUsConfig.configValue ? {
          ...aboutUsConfig.configValue,
          seo: {
            ...aboutUsConfig.configValue.seo,
            title: aboutUsConfig.configValue.seo.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            description: aboutUsConfig.configValue.seo.description.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            keyword: aboutUsConfig.configValue.seo.keyword.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          },
          title: aboutUsConfig.configValue.title.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          content: aboutUsConfig.configValue.content.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          buttonTitle: aboutUsConfig.configValue.buttonTitle.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          slides: (aboutUsConfig.configValue.slides || []).map(item => ({
            ...item,
            title: item.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            content: item.content.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            establishedIn: item.establishedIn.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          })),
          namePerson: aboutUsConfig.configValue.namePerson.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          titleMember: aboutUsConfig.configValue.titleMember.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          contentMember: aboutUsConfig.configValue.contentMember.reduce(function (acc, cur) {
            acc[cur.language.toLowerCase()] = cur.content;
            return acc;
          }, {}),
          members: (aboutUsConfig.configValue.members || []).map(item => ({
            ...item,
            namePerson: item.namePerson.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          })),
        } : {};
        break;
      case "contact-us":
        const contactUsConfig : UpdateContactUsConfigsDto = await this.configService.findByConfigKey(configKey);
        result = contactUsConfig.configValue ? {
          ...contactUsConfig.configValue,
          seo: {
            ...contactUsConfig.configValue.seo,
            title: contactUsConfig.configValue.seo.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            description: contactUsConfig.configValue.seo.description.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            keyword: contactUsConfig.configValue.seo.keyword.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          },
        } : {};
        break;
      case "header":
        const headerConfig = await this.configService.findByConfigKey(configKey);
        result = headerConfig.configValue;
        break;
      case "footer":
        const footerConfig = await this.configService.findByConfigKey(configKey);
        result = footerConfig.configValue;
        break;
      case "float-buttons":
        const floatButtonsConfig = await this.configService.findByConfigKey(configKey);
        result = floatButtonsConfig.configValue;
        break;
      case "common":
        const commonConfig : UpdateCommonConfigsDto = await this.configService.findByConfigKey(configKey);
        result = commonConfig.configValue ? {
          ...commonConfig.configValue,
          seo: {
            ...commonConfig.configValue.seo,
            title: commonConfig.configValue.seo.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            description: commonConfig.configValue.seo.description.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            keyword: commonConfig.configValue.seo.keyword.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          },
        } : {};
        break;
      case "news":
        const newsConfig : UpdateNewsConfigsDto = await this.configService.findByConfigKey(configKey);
        result = newsConfig.configValue ? {
          ...newsConfig.configValue,
          seo: {
            ...newsConfig.configValue.seo,
            title: newsConfig.configValue.seo.title.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            description: newsConfig.configValue.seo.description.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
            keyword: newsConfig.configValue.seo.keyword.reduce(function (acc, cur) {
              acc[cur.language.toLowerCase()] = cur.content;
              return acc;
            }, {}),
          },
        } : {};
        break;

      default:
        break;
    }

    return {
      data: result,
    };
  }
}

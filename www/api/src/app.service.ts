import { Injectable } from "@nestjs/common";
import * as slug from "slug";
import { BrandsService } from "./brands/brands.service";
import { CreateBrandsDto } from "./brands/dtos/brands.dto";
import configuration from "./config/configuration";
import { ConfigsService } from "./configs/configs.service";
import { CreateNewsDto } from "./news/dtos/news.dto";
import { NewsService } from "./news/news.service";
import { CreateProductLinesDto } from "./product-lines/dtos/product-lines.dto";
import { ProductLinesService } from "./product-lines/product-lines.service";
import { CreateProductsDto } from "./products/dtos/products.dto";
import { ProductsService } from "./products/products.service";
import { CreateServicesDto } from "./services/dtos/services.dto";
import { ServicesService } from "./services/services.service";
import { CreateUserDto } from "./users/dtos/users.dto";
import { UsersService } from "./users/users.service";
import { CreateYatchTypesDto } from "./yatch-types/dtos/yatch-types.dto";
import { YatchTypesService } from "./yatch-types/yatch-types.service";

@Injectable()
export class AppService {
  constructor(
    private userService: UsersService,
    private brandService: BrandsService,
    private newService: NewsService,
    private yatchTypeService: YatchTypesService,
    private productLineService: ProductLinesService,
    private productService: ProductsService,
    private serviceService: ServicesService,
    private configService: ConfigsService
  ) {}

  async onApplicationBootstrap() {
    // Seeding admin user
    try {
      const adminUser: CreateUserDto = {
        username: "admin",
        email: "admin@example.com",
        password: "123456",
        name: "Admin",
      };

      const user = await this.userService.findOne({
        username: adminUser.username,
      });
      if (!user || !user._id) {
        await this.userService.create(adminUser);

        // Seeding brands
        try {
          const totalBrands = await this.brandService.countDocuments({});
          if (totalBrands == 0) {
            const brands: CreateBrandsDto[] = [
              {
                image: "images/defaults/brands/image1.webp",
                logo: "images/defaults/brands/logo1.png",
                name: "Beneteau",
                slug: "beneteau",
                content: [
                  {
                    language: "VI",
                    content:
                      "Việt Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                  {
                    language: "EN",
                    content:
                      "Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                ],
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: "Beneteau tiêu đề",
                    },
                    {
                      language: "EN",
                      content: "Beneteau title",
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: "Beneteau mô tả",
                    },
                    {
                      language: "EN",
                      content: "Beneteau description",
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: "Beneteau từ khóa",
                    },
                    {
                      language: "EN",
                      content: "Beneteau keywords",
                    },
                  ],
                },
              },
              {
                image: "images/defaults/brands/image2.webp",
                logo: "images/defaults/brands/logo2.png",
                name: "Zodiac",
                slug: "zodiac",
                content: [
                  {
                    language: "VI",
                    content:
                      "Việt Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                  {
                    language: "EN",
                    content:
                      "Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                ],
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: "Zodiac tiêu đề",
                    },
                    {
                      language: "EN",
                      content: "Zodiac title",
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: "Zodiac mô tả",
                    },
                    {
                      language: "EN",
                      content: "Zodiac description",
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: "Zodiac từ khóa",
                    },
                    {
                      language: "EN",
                      content: "Zodiac keywords",
                    },
                  ],
                },
              },
              {
                image: "images/defaults/brands/image3.webp",
                logo: "images/defaults/brands/logo3.png",
                name: "Azimut",
                slug: "azimut",
                content: [
                  {
                    language: "VI",
                    content:
                      "Việt Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                  {
                    language: "EN",
                    content:
                      "Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                ],
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: "Azimut tiêu đề",
                    },
                    {
                      language: "EN",
                      content: "Azimut title",
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: "Azimut mô tả",
                    },
                    {
                      language: "EN",
                      content: "Azimut description",
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: "Azimut từ khóa",
                    },
                    {
                      language: "EN",
                      content: "Azimut keywords",
                    },
                  ],
                },
              },
              {
                image: "images/defaults/brands/image4.webp",
                logo: "images/defaults/brands/logo4.png",
                name: "Lagoon",
                slug: "lagoon",
                content: [
                  {
                    language: "VI",
                    content:
                      "Việt Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                  {
                    language: "EN",
                    content:
                      "Lorem Ipsum is simply dummy texts the printing and typesetting industry. Lorem psum has been the industry's standard dummy text ever since (150 char)",
                  },
                ],
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: "Lagoon tiêu đề",
                    },
                    {
                      language: "EN",
                      content: "Lagoon title",
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: "Lagoon mô tả",
                    },
                    {
                      language: "EN",
                      content: "Lagoon description",
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: "Lagoon từ khóa",
                    },
                    {
                      language: "EN",
                      content: "Lagoon keywords",
                    },
                  ],
                },
              },
            ];

            for (let i = 0; i < brands.length; i++) {
              const brand = brands[i];
              const brandCreated = await this.brandService.create(brand);

              if (brandCreated && brandCreated._id) {
                const yatchTypes: CreateYatchTypesDto[] = Array.from(
                  Array(2).keys()
                ).map((key) => ({
                  content: [
                    {
                      language: "VI",
                      content: `Nội dung THE SEA AT EVERY CURVE. ${key + 1}`,
                    },
                    {
                      language: "EN",
                      content: `THE SEA WITH NO RESTRAINTS. ${key + 1}`,
                    },
                  ],
                  name: [
                    {
                      language: "VI",
                      content: `Thuyền loại ${key + 1}`,
                    },
                    {
                      language: "EN",
                      content: `Yatch type ${key + 1}`,
                    },
                  ],
                  slug: slug(`${brand.slug} Yatch type ${key + 1}`),
                  image: `images/defaults/yatch-types/image${key + 1}.png`,
                  brand: brandCreated._id.toString(),
                  seo: {
                    title: [
                      {
                        language: "VI",
                        content: `Thuyền loại ${key + 1} tiêu đề`,
                      },
                      {
                        language: "EN",
                        content: `Yatch type ${key + 1} title`,
                      },
                    ],
                    description: [
                      {
                        language: "VI",
                        content: `Thuyền loại ${key + 1} mô tả`,
                      },
                      {
                        language: "EN",
                        content: `Yatch type ${key + 1} description`,
                      },
                    ],
                    keyword: [
                      {
                        language: "VI",
                        content: `Thuyền loại ${key + 1} từ khóa`,
                      },
                      {
                        language: "EN",
                        content: `Yatch type ${key + 1} keywords`,
                      },
                    ],
                  },
                }));

                for (let j = 0; j < yatchTypes.length; j++) {
                  const yatchType = yatchTypes[j];
                  const yatchTypeCreated = await this.yatchTypeService.create(
                    yatchType
                  );
                  if (yatchTypeCreated && yatchTypeCreated._id) {
                    const productLines: CreateProductLinesDto[] = Array.from(
                      Array(2).keys()
                    ).map((key) => ({
                      content: [
                        {
                          language: "VI",
                          content: `Nội dung The world reference in cruising. With eight models ranging from 31 to 60 feet, the Oceanis is a safe and efficient sailing yacht. With increasingly stable hulls, clear deck plans, simplified manoeuvring, equipment and interiors lending themselves to personalization, the Oceanis range continues to improve the cruising experience. The dream is subtly falling into place. ${
                            key + 1
                          }`,
                        },
                        {
                          language: "EN",
                          content: `The world reference in cruising. With eight models ranging from 31 to 60 feet, the Oceanis is a safe and efficient sailing yacht. With increasingly stable hulls, clear deck plans, simplified manoeuvring, equipment and interiors lending themselves to personalization, the Oceanis range continues to improve the cruising experience. The dream is subtly falling into place. ${
                            key + 1
                          }`,
                        },
                      ],
                      name: [
                        {
                          language: "VI",
                          content: `Dòng sản phẩm ${key + 1}`,
                        },
                        {
                          language: "EN",
                          content: `Product line ${key + 1}`,
                        },
                      ],
                      image: `images/defaults/yatch-types/image${key + 1}.png`,
                      yatchType: yatchTypeCreated._id.toString(),
                    }));

                    for (let k = 0; k < productLines.length; k++) {
                      const productLine = productLines[k];
                      const productLineCreated =
                        await this.productLineService.create(productLine);
                      if (productLineCreated && productLineCreated._id) {
                        const products: CreateProductsDto[] = Array.from(
                          Array(10).keys()
                        ).map((key) => ({
                          seo: {
                            title: [
                              {
                                language: "VI",
                                content: `Sản phẩm ${key + 1} tiêu đề`,
                              },
                              {
                                language: "EN",
                                content: `Product ${key + 1} title`,
                              },
                            ],
                            description: [
                              {
                                language: "VI",
                                content: `Sản phẩm ${key + 1} mô tả`,
                              },
                              {
                                language: "EN",
                                content: `Product ${key + 1} description`,
                              },
                            ],
                            keyword: [
                              {
                                language: "VI",
                                content: `Sản phẩm ${key + 1} từ khóa`,
                              },
                              {
                                language: "EN",
                                content: `Product ${key + 1} keywords`,
                              },
                            ],
                          },
                          content: [
                            {
                              language: "VI",
                              content:
                                "Nội dung Azimut Yachts has been officially distributed in Vietnam by Trans Yachting. On behalf for this reputable brand, Trans Yachting is thrilled to offer the professional services to Vietnamese Members. THE AZIMUT YACHTS WELCOME...",
                            },
                            {
                              language: "EN",
                              content:
                                "Azimut Yachts has been officially distributed in Vietnam by Trans Yachting. On behalf for this reputable brand, Trans Yachting is thrilled to offer the professional services to Vietnamese Members. THE AZIMUT YACHTS WELCOME...",
                            },
                          ],
                          interiorDesign: [
                            {
                              language: "VI",
                              content:
                                "Nội dung For the Italian design team, the challenge was to multiply the living spaces in the saloon and offer greater privacy in the owner cabin, while maintaining the visual perspective that her opening to the bow offered in previous versions. The new L-shaped galley makes a facing seat saloon arrangement possible. The space has been well optimised to allow eight people to sit around the table.",
                            },
                            {
                              language: "EN",
                              content:
                                "For the Italian design team, the challenge was to multiply the living spaces in the saloon and offer greater privacy in the owner cabin, while maintaining the visual perspective that her opening to the bow offered in previous versions. The new L-shaped galley makes a facing seat saloon arrangement possible. The space has been well optimised to allow eight people to sit around the table.",
                            },
                          ],
                          name: [
                            {
                              language: "VI",
                              content: `Sản phẩm ${key + 1}`,
                            },
                            {
                              language: "EN",
                              content: `Product ${key + 1}`,
                            },
                          ],
                          specifications: [
                            {
                              label: [
                                {
                                  language: "VI",
                                  content: "Độ dài",
                                },
                                {
                                  language: "EN",
                                  content: "LENGTH OVER ALL",
                                },
                              ],
                              value: [
                                {
                                  language: "VI",
                                  content: "11,50",
                                },
                                {
                                  language: "EN",
                                  content: "11.50",
                                },
                              ],
                            },
                            {
                              label: [
                                {
                                  language: "VI",
                                  content: "Độ dài vỏ",
                                },
                                {
                                  language: "EN",
                                  content: "HULL LENGTH",
                                },
                              ],
                              value: [
                                {
                                  language: "VI",
                                  content: "11,13",
                                },
                                {
                                  language: "EN",
                                  content: "11.13",
                                },
                              ],
                            },
                          ],
                          tabContents: [
                            {
                              label: [
                                {
                                  language: "VI",
                                  content: "Tab 1",
                                },
                                {
                                  language: "EN",
                                  content: "Tab 1",
                                },
                              ],
                              content: [
                                {
                                  language: "VI",
                                  content: "Nội dung",
                                },
                                {
                                  language: "EN",
                                  content: "Content",
                                },
                              ],
                            },
                            {
                              label: [
                                {
                                  language: "VI",
                                  content: "Tab 2",
                                },
                                {
                                  language: "EN",
                                  content: "Tab 2",
                                },
                              ],
                              content: [
                                {
                                  language: "VI",
                                  content: "Nội dung 2",
                                },
                                {
                                  language: "EN",
                                  content: "Content 2",
                                },
                              ],
                            },
                          ],
                          designers: [
                            {
                              name: "Person 1",
                              image: "images/defaults/products/person1.png",
                              position: [
                                {
                                  language: "VI",
                                  content: "Thiết kế",
                                },
                                {
                                  language: "EN",
                                  content: "Designer",
                                },
                              ],
                            },
                            {
                              name: "Person 2",
                              image: "images/defaults/products/person2.png",
                              position: [
                                {
                                  language: "VI",
                                  content: "Thiết kế",
                                },
                                {
                                  language: "EN",
                                  content: "Designer",
                                },
                              ],
                            },
                          ],
                          slug: slug(
                            `${yatchType.slug} product line ${k + 1} product ${
                              key + 1
                            }`
                          ),
                          image: `images/defaults/products/image${
                            (key % 8) + 1
                          }.png`,
                          bannerImage: `images/defaults/products/background-header.png`,
                          productLine: productLineCreated._id.toString(),
                          brochureLink: "https://google.com",
                        }));

                        for (let l = 0; l < products.length; l++) {
                          const product = products[l];
                          await this.productService.create(product);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } catch (error) {
          console.log(error);
        }

        // Seeding news
        try {
          const totalNews = await this.newService.countDocuments({});
          if (totalNews == 0) {
            const news: CreateNewsDto[] = Array.from(Array(10).keys()).map(
              (key) => ({
                image: `images/defaults/news/blog-${(key % 6) + 1}.png`,
                slug: `new-${key + 1}`,
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: `Tin tức ${key + 1} tiêu đề`,
                    },
                    {
                      language: "EN",
                      content: `New ${key + 1} title`,
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: `Tin tức ${key + 1} mô tả`,
                    },
                    {
                      language: "EN",
                      content: `New ${key + 1} description`,
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: `Tin tức ${key + 1} từ khóa`,
                    },
                    {
                      language: "EN",
                      content: `New ${key + 1} keywords`,
                    },
                  ],
                },
                title: [
                  {
                    language: "VI",
                    content: `Tin tức ${key + 1}`,
                  },
                  {
                    language: "EN",
                    content: `New ${key + 1}`,
                  },
                ],
                content: [
                  {
                    language: "VI",
                    content: `<h3>NỘI DUNG WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h3>WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
                  },
                  {
                    language: "EN",
                    content: `<h3>WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h3>WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
                  },
                ],
                type: "news",
              })
            );
            const events: CreateNewsDto[] = Array.from(Array(10).keys()).map(
              (key) => ({
                image: `images/defaults/news/blog-${(key % 6) + 1}.png`,
                slug: `event-${key + 1}`,
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: `Sự kiện ${key + 1} tiêu đề`,
                    },
                    {
                      language: "EN",
                      content: `Event ${key + 1} title`,
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: `Sự kiện ${key + 1} mô tả`,
                    },
                    {
                      language: "EN",
                      content: `Event ${key + 1} description`,
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: `Sự kiện ${key + 1} từ khóa`,
                    },
                    {
                      language: "EN",
                      content: `Event ${key + 1} keywords`,
                    },
                  ],
                },
                title: [
                  {
                    language: "VI",
                    content: `Sự kiện ${key + 1}`,
                  },
                  {
                    language: "EN",
                    content: `Event ${key + 1}`,
                  },
                ],
                content: [
                  {
                    language: "VI",
                    content: `<h3>NỘI DUNG WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h3>WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
                  },
                  {
                    language: "EN",
                    content: `<h3>WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h3>WELCOME PACKAGE FOR AZIMUT YACHTS</h3><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>ALorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
                  },
                ],
                type: "events",
              })
            );

            for (let i = 0; i < news.length; i++) {
              const _new = news[i];
              await this.newService.create(_new);
            }
            for (let i = 0; i < events.length; i++) {
              const _new = events[i];
              await this.newService.create(_new);
            }
          }
        } catch (error) {
          console.log(error);
        }

        // Seeding services
        try {
          const totalServices = await this.serviceService.countDocuments({});
          if (totalServices == 0) {
            const services: CreateServicesDto[] = [
              {
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: `Dịch vụ bến tiêu đề`,
                    },
                    {
                      language: "EN",
                      content: `Marina title`,
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: `Dịch vụ bến mô tả`,
                    },
                    {
                      language: "EN",
                      content: `Marina description`,
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: `Dịch vụ bến từ khóa`,
                    },
                    {
                      language: "EN",
                      content: `Marina keywords`,
                    },
                  ],
                },
                services: [
                  {
                    image: "images/defaults/marinas/service-1.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung BERTH RENTAL",
                      },
                      {
                        language: "EN",
                        content: "BERTH RENTAL",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                      {
                        language: "EN",
                        content:
                          "Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/service-2.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung CRUISING FORMALITY",
                      },
                      {
                        language: "EN",
                        content: "CRUISING FORMALITY",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                      {
                        language: "EN",
                        content:
                          "Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/service-3.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung CHARTER ARRANGEMENT",
                      },
                      {
                        language: "EN",
                        content: "CHARTER ARRANGEMENT",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                      {
                        language: "EN",
                        content:
                          "Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/service-4.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung YACHTS / BOATS INTRODUCTION",
                      },
                      {
                        language: "EN",
                        content: "YACHTS / BOATS INTRODUCTION",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                      {
                        language: "EN",
                        content:
                          "Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/service-5.png",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung CREW MANAGEMENT FROM INTERNATIONAL EXPERTS",
                      },
                      {
                        language: "EN",
                        content: "CREW MANAGEMENT FROM INTERNATIONAL EXPERTS",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                      {
                        language: "EN",
                        content:
                          "Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/service-6.png",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung ACCESS TO BERTHS/PORTS IN CBD & OTHER MARINAS",
                      },
                      {
                        language: "EN",
                        content:
                          "ACCESS TO BERTHS/PORTS IN CBD & OTHER MARINAS",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                      {
                        language: "EN",
                        content:
                          "Lorem Ipsum is simply dummy texts the printing and typesetting industry. (150 char)",
                      },
                    ],
                  },
                ],
                facilities: [
                  {
                    image: "images/defaults/marinas/facility-1.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung WORKSHOP FOR YACHTS / BOATS UP TO 100FT",
                      },
                      {
                        language: "EN",
                        content: "WORKSHOP FOR YACHTS / BOATS UP TO 100FT",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung SLIPWAY WAGON FROM 20FT. TO 100FT",
                      },
                      {
                        language: "EN",
                        content: "SLIPWAY WAGON FROM 20FT. TO 100FT",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung YACHTS / BOATS PROTECTION BY MOBILE SHELTER",
                      },
                      {
                        language: "EN",
                        content: "YACHTS / BOATS PROTECTION BY MOBILE SHELTER",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung PRIVATE WORKSHOP ON LAND WITH SECURITY",
                      },
                      {
                        language: "EN",
                        content: "PRIVATE WORKSHOP ON LAND WITH SECURITY",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-5.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung PROFESSIONAL HAND TOOLS",
                      },
                      {
                        language: "EN",
                        content: "PROFESSIONAL HAND TOOLS",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung WATER & ELECTRICITY SUPPLY",
                      },
                      {
                        language: "EN",
                        content: "WATER & ELECTRICITY SUPPLY",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung CRADLE",
                      },
                      {
                        language: "EN",
                        content: "CRADLE",
                      },
                    ],
                  },
                ],
                galleries: [
                  "images/defaults/marinas/slide-1.png",
                  "images/defaults/marinas/slide-2.png",
                  "images/defaults/marinas/slide-3.png",
                ],
                name: [
                  {
                    language: "VI",
                    content: "Dịch vụ bến",
                  },
                  {
                    language: "EN",
                    content: "Marina",
                  },
                ],
                content: [
                  {
                    language: "VI",
                    content:
                      "“Nội dung THE VERY FIRST MARINA LOCATED<br>IN THE HEART OF HO CHI MINH CITY”",
                  },
                  {
                    language: "EN",
                    content:
                      "“THE VERY FIRST MARINA LOCATED<br>IN THE HEART OF HO CHI MINH CITY”",
                  },
                ],
                slug: "marina",
                image: "images/defaults/marinas/banner.png",
                servicesBackground: "images/defaults/marinas/service-bg.png",
                type: 1,
              },
              {
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: `Dịch vụ bảo dưỡng tiêu đề`,
                    },
                    {
                      language: "EN",
                      content: `Maintainance title`,
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: `Dịch vụ bảo dưỡng mô tả`,
                    },
                    {
                      language: "EN",
                      content: `Maintainance description`,
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: `Dịch vụ bảo dưỡng từ khóa`,
                    },
                    {
                      language: "EN",
                      content: `Maintainance keywords`,
                    },
                  ],
                },
                services: [
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung ENGINEERING MANAGEMENT BY INTERNATIONAL EXPERTS",
                      },
                      {
                        language: "EN",
                        content:
                          "ENGINEERING MANAGEMENT BY INTERNATIONAL EXPERTS",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Luxury and well-equipped berths are provided for Yachts / Boats up to 30m in length",
                      },
                      {
                        language: "EN",
                        content:
                          "Luxury and well-equipped berths are provided for Yachts / Boats up to 30m in length",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung NEW YACHT COMMISSIONING",
                      },
                      {
                        language: "EN",
                        content: "NEW YACHT COMMISSIONING",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Full commissioning and fitting out of new boats<br>Epoxy Hull Preparation<br>Antifouling paint<br>Electronic equipment calibration<br>Mast stepping",
                      },
                      {
                        language: "EN",
                        content:
                          "Full commissioning and fitting out of new boats<br>Epoxy Hull Preparation<br>Antifouling paint<br>Electronic equipment calibration<br>Mast stepping",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung ANNUAL VR INSPECTION & HULL MAINTENANCE",
                      },
                      {
                        language: "EN",
                        content: "ANNUAL VR INSPECTION & HULL MAINTENANCE",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Hull Hand-cleaning/polishing /Teck deck Cleaning<br>Inspection of rudder/ shaft/ propeller/ bow thruster<br>Zinc anode replacement<br>Fiberglass and gel-coat repair<br>Annual VR check",
                      },
                      {
                        language: "EN",
                        content:
                          "Hull Hand-cleaning/polishing /Teck deck Cleaning<br>Inspection of rudder/ shaft/ propeller/ bow thruster<br>Zinc anode replacement<br>Fiberglass and gel-coat repair<br>Annual VR check",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung MARINE ELECTRONIC",
                      },
                      {
                        language: "EN",
                        content: "MARINE ELECTRONIC",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Electronic equipment mounting installations Commissioning: radar, autopilot, AIS transmitter, GPS Diagnostic/ Upgrade device equipment system",
                      },
                      {
                        language: "EN",
                        content:
                          "Electronic equipment mounting installations Commissioning: radar, autopilot, AIS transmitter, GPS Diagnostic/ Upgrade device equipment system",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung ENGINE/GENERATOR PREVENTIVE MAINTENANCE",
                      },
                      {
                        language: "EN",
                        content:
                          "Content ENGINE/GENERATOR PREVENTIVE MAINTENANCE",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung Main engine maintenance<br>Generator maintenance<br>Outdrive cleaning",
                      },
                      {
                        language: "EN",
                        content:
                          "Main engine maintenance<br>Generator maintenance<br>Outdrive cleaning",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung OTHER SERVICES OFFERED",
                      },
                      {
                        language: "EN",
                        content: "OTHER SERVICES OFFERED",
                      },
                    ],
                    content: [
                      {
                        language: "VI",
                        content:
                          "Nội dung AC Systems Maintenance<br>Original Technical Parts Importation",
                      },
                      {
                        language: "EN",
                        content:
                          "AC Systems Maintenance<br>Original Technical Parts Importation",
                      },
                    ],
                  },
                ],
                facilities: [
                  {
                    image: "images/defaults/marinas/facility-1.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung WORKSHOP FOR YACHTS / BOATS UP TO 100FT",
                      },
                      {
                        language: "EN",
                        content: "WORKSHOP FOR YACHTS / BOATS UP TO 100FT",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung SLIPWAY WAGON FROM 20FT. TO 100FT",
                      },
                      {
                        language: "EN",
                        content: "SLIPWAY WAGON FROM 20FT. TO 100FT",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung YACHTS / BOATS PROTECTION BY MOBILE SHELTER",
                      },
                      {
                        language: "EN",
                        content: "YACHTS / BOATS PROTECTION BY MOBILE SHELTER",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content:
                          "Nội dung PRIVATE WORKSHOP ON LAND WITH SECURITY",
                      },
                      {
                        language: "EN",
                        content: "PRIVATE WORKSHOP ON LAND WITH SECURITY",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-5.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung PROFESSIONAL HAND TOOLS",
                      },
                      {
                        language: "EN",
                        content: "PROFESSIONAL HAND TOOLS",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung WATER & ELECTRICITY SUPPLY",
                      },
                      {
                        language: "EN",
                        content: "WATER & ELECTRICITY SUPPLY",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/marinas/facility-2.svg",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung CRADLE",
                      },
                      {
                        language: "EN",
                        content: "CRADLE",
                      },
                    ],
                  },
                ],
                docks: [
                  {
                    image: "images/defaults/services/service-1.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung WORKSHOP FOR BOATS UNDER 100FT",
                      },
                      {
                        language: "EN",
                        content: "WORKSHOP FOR BOATS UNDER 100FT",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/services/service-2.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung MULTI-BRAND TECHNICAL ASSISTANCE",
                      },
                      {
                        language: "EN",
                        content: "MULTI-BRAND TECHNICAL ASSISTANCE",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/services/service-3.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung ANNUAL HULL MAINTENANCE",
                      },
                      {
                        language: "EN",
                        content: "ANNUAL HULL MAINTENANCE",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/services/service-4.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung COMMISSIONING",
                      },
                      {
                        language: "EN",
                        content: "COMMISSIONING",
                      },
                    ],
                  },
                  {
                    image: "images/defaults/services/service-5.png",
                    title: [
                      {
                        language: "VI",
                        content: "Nội dung YACHT REPAIR/ MECHANICS",
                      },
                      {
                        language: "EN",
                        content: "YACHT REPAIR/ MECHANICS",
                      },
                    ],
                  },
                ],
                name: [
                  {
                    language: "VI",
                    content: "Bảo dưỡng",
                  },
                  {
                    language: "EN",
                    content: "Maintainance Service",
                  },
                ],
                slug: "maintainance",
                image: "images/defaults/services/banner.png",
                servicesBackground: "images/defaults/services/service-bg.png",
                servicesHeadImage: "images/defaults/services/banner-2.png",
                type: 2,
              },
              {
                seo: {
                  title: [
                    {
                      language: "VI",
                      content: `Dịch vụ cho thuê tiêu đề`,
                    },
                    {
                      language: "EN",
                      content: `Renting title`,
                    },
                  ],
                  description: [
                    {
                      language: "VI",
                      content: `Dịch vụ cho thuê mô tả`,
                    },
                    {
                      language: "EN",
                      content: `Renting description`,
                    },
                  ],
                  keyword: [
                    {
                      language: "VI",
                      content: `Dịch vụ cho thuê từ khóa`,
                    },
                    {
                      language: "EN",
                      content: `Renting keywords`,
                    },
                  ],
                },
                name: [
                  {
                    language: "VI",
                    content: "Cho thuê",
                  },
                  {
                    language: "EN",
                    content: "Renting Service",
                  },
                ],
                content: [
                  {
                    language: "VI",
                    content:
                      "Cho thuê To develop the eco-system in Vietnam yacht industry, Trans Yachting",
                  },
                  {
                    language: "EN",
                    content:
                      "To develop the eco-system in Vietnam yacht industry, Trans Yachting",
                  },
                ],
                slug: "renting",
                image: "images/defaults/services/renting-banner.png",
                type: 3,
              },
            ];

            for (let i = 0; i < services.length; i++) {
              const service = services[i];
              await this.serviceService.create(service);
            }
          }
        } catch (error) {
          console.log(error);
        }

        // Seeding configs
        try {
          await this.configService.createHomeConfig({
            configKey: "home",
            configValue: {
              seo: {
                title: [
                  {
                    language: "VI",
                    content: `Trang chủ tiêu đề`,
                  },
                  {
                    language: "EN",
                    content: `Home title`,
                  },
                ],
                description: [
                  {
                    language: "VI",
                    content: `Trang chủ mô tả`,
                  },
                  {
                    language: "EN",
                    content: `Home description`,
                  },
                ],
                keyword: [
                  {
                    language: "VI",
                    content: `Trang chủ từ khóa`,
                  },
                  {
                    language: "EN",
                    content: `Home keywords`,
                  },
                ],
              },
              headBanner: [
                {
                  image: "images/defaults/home/introduce/slide-bg.webp",
                  video: "images/defaults/home/introduce/slide-bg.webp",
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung TRANS YACHTING WORLD 1",
                    },
                    {
                      language: "EN",
                      content: "TRANS YACHTING WORLD 1",
                    },
                  ],
                  subtitle: [
                    {
                      language: "VI",
                      content:
                        "Nội dung <p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                    {
                      language: "EN",
                      content:
                        "<p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                  ],
                  button1Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Yacht Services",
                    },
                    {
                      language: "EN",
                      content: "Explore Yacht Services",
                    },
                  ],
                  button1Link: "/services/maintainance",
                  button2Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Marina",
                    },
                    {
                      language: "EN",
                      content: "Explore Marina",
                    },
                  ],
                  button2Link: "/services/maintainance",
                },
                {
                  image: "images/defaults/home/introduce/slide-bg.webp",
                  video: "videos/defaults/home/introduce/slide-bg.webp",
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung TRANS YACHTING WORLD 2",
                    },
                    {
                      language: "EN",
                      content: "TRANS YACHTING WORLD 2",
                    },
                  ],
                  subtitle: [
                    {
                      language: "VI",
                      content:
                        "Nội dung <p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                    {
                      language: "EN",
                      content:
                        "<p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                  ],
                  button1Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Yacht Services",
                    },
                    {
                      language: "EN",
                      content: "Explore Yacht Services",
                    },
                  ],
                  button1Link: "/services/maintainance",
                  button2Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Marina",
                    },
                    {
                      language: "EN",
                      content: "Explore Marina",
                    },
                  ],
                  button2Link: "/services/maintainance",
                },
                {
                  image: "images/defaults/home/introduce/slide-bg.webp",
                  video: "videos/defaults/home/introduce/slide-bg.webp",
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung TRANS YACHTING WORLD 3",
                    },
                    {
                      language: "EN",
                      content: "TRANS YACHTING WORLD 3",
                    },
                  ],
                  subtitle: [
                    {
                      language: "VI",
                      content:
                        "Nội dung <p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                    {
                      language: "EN",
                      content:
                        "<p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                  ],
                  button1Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Yacht Services",
                    },
                    {
                      language: "EN",
                      content: "Explore Yacht Services",
                    },
                  ],
                  button1Link: "/services/maintainance",
                  button2Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Marina",
                    },
                    {
                      language: "EN",
                      content: "Explore Marina",
                    },
                  ],
                  button2Link: "/services/maintainance",
                },
                {
                  image: "images/defaults/home/introduce/slide-bg.webp",
                  video: "videos/defaults/home/introduce/slide-bg.webp",
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung TRANS YACHTING WORLD 4",
                    },
                    {
                      language: "EN",
                      content: "TRANS YACHTING WORLD 4",
                    },
                  ],
                  subtitle: [
                    {
                      language: "VI",
                      content:
                        "Nội dung <p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                    {
                      language: "EN",
                      content:
                        "<p>The very first professional high-end luxury <br>One-stop Shop Yacht and Yacht Services company in Vietnam</p>",
                    },
                  ],
                  button1Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Yacht Services",
                    },
                    {
                      language: "EN",
                      content: "Explore Yacht Services",
                    },
                  ],
                  button1Link: "/services/maintainance",
                  button2Title: [
                    {
                      language: "VI",
                      content: "Nội dung Explore Marina",
                    },
                    {
                      language: "EN",
                      content: "Explore Marina",
                    },
                  ],
                  button2Link: "/services/maintainance",
                },
              ],
              welcome: {
                top: {
                  title1: [
                    {
                      language: "VI",
                      content: "Nội dung Welcome To",
                    },
                    {
                      language: "EN",
                      content: "Welcome To",
                    },
                  ],
                  title2: [
                    {
                      language: "VI",
                      content: "Nội dung Trans Yatching",
                    },
                    {
                      language: "EN",
                      content: "Trans Yatching",
                    },
                  ],
                  content: [
                    {
                      language: "VI",
                      content:
                        "Nội dung Trans Yachting has mission to bring the perfect European Yachting Experience to Vietnam. TRANS YACHTING WORLD has been driven by our Vision to a professional eco-system in Vietnam yacht industry, where all of distinguished services are served in One-stop Shop.",
                    },
                    {
                      language: "EN",
                      content:
                        "Trans Yachting has mission to bring the perfect European Yachting Experience to Vietnam. TRANS YACHTING WORLD has been driven by our Vision to a professional eco-system in Vietnam yacht industry, where all of distinguished services are served in One-stop Shop.",
                    },
                  ],
                  buttonTitle: [
                    {
                      language: "VI",
                      content: "Nội dung",
                    },
                    {
                      language: "EN",
                      content: "Explore More",
                    },
                  ],
                  buttonLink: "/about-us",
                  image1: "images/defaults/home/welcome/image1.webp",
                  image2: "images/defaults/home/welcome/image2.webp",
                },
                bottom: {
                  title1: [
                    {
                      language: "VI",
                      content: "Nội dung Our Quality",
                    },
                    {
                      language: "EN",
                      content: "Our Quality",
                    },
                  ],
                  title2: [
                    {
                      language: "VI",
                      content: "Nội dung Reflected by Number",
                    },
                    {
                      language: "EN",
                      content: "Reflected by Number",
                    },
                  ],
                  image1: "images/defaults/home/our-quality/image1.webp",
                  image2: "images/defaults/home/our-quality/image2.webp",
                  image3: "images/defaults/home/our-quality/image3.webp",
                  statistics: [
                    {
                      title: [
                        {
                          language: "VI",
                          content: "3",
                        },
                        {
                          language: "EN",
                          content: "3",
                        },
                      ],
                      subtitle: [
                        {
                          language: "VI",
                          content: "Nội dung BRAND DISTRIBUTION",
                        },
                        {
                          language: "EN",
                          content: "BRAND DISTRIBUTION",
                        },
                      ],
                    },
                    {
                      title: [
                        {
                          language: "VI",
                          content: "2",
                        },
                        {
                          language: "EN",
                          content: "2",
                        },
                      ],
                      subtitle: [
                        {
                          language: "VI",
                          content: "Nội dung MARINA",
                        },
                        {
                          language: "EN",
                          content: "MARINA",
                        },
                      ],
                    },
                    {
                      title: [
                        {
                          language: "VI",
                          content: "+50",
                        },
                        {
                          language: "EN",
                          content: "+50",
                        },
                      ],
                      subtitle: [
                        {
                          language: "VI",
                          content: "Nội dung YACHT DISTRIBUTION",
                        },
                        {
                          language: "EN",
                          content: "YACHT DISTRIBUTION",
                        },
                      ],
                    },
                    {
                      title: [
                        {
                          language: "VI",
                          content: "+100",
                        },
                        {
                          language: "EN",
                          content: "+100",
                        },
                      ],
                      subtitle: [
                        {
                          language: "VI",
                          content: "Nội dung YACHT CUSTOMER",
                        },
                        {
                          language: "EN",
                          content: "YACHT CUSTOMER",
                        },
                      ],
                    },
                  ],
                },
              },
              brands: {
                title: [
                  {
                    language: "VI",
                    content: "Nội dung Brands",
                  },
                  {
                    language: "EN",
                    content: "Brands",
                  },
                ],
                content: [
                  {
                    language: "VI",
                    content:
                      "Nội dung The leading distributor of Vietnam yacht industry meets the leading groups of the world‘s largest manufacturer for luxury yachts & inflatable boats – the collaboration between Trans Yachting and Bénéteau Group as well as Zodiac Nautic Group. It is recognized by a range of high-quality brands: BENETEAU, Lagoon Catamarans, Monte Carlo Yachts & Zodiac Nautic.",
                  },
                  {
                    language: "EN",
                    content:
                      "The leading distributor of Vietnam yacht industry meets the leading groups of the world‘s largest manufacturer for luxury yachts & inflatable boats – the collaboration between Trans Yachting and Bénéteau Group as well as Zodiac Nautic Group. It is recognized by a range of high-quality brands: BENETEAU, Lagoon Catamarans, Monte Carlo Yachts & Zodiac Nautic.",
                  },
                ],
              },
              services: {
                section1: {
                  title1: [
                    {
                      language: "VI",
                      content: "Nội dung Marina",
                    },
                    {
                      language: "EN",
                      content: "Marina",
                    },
                  ],
                  title2: [
                    {
                      language: "VI",
                      content: "Nội dung Trans Yachting",
                    },
                    {
                      language: "EN",
                      content: "Trans Yachting",
                    },
                  ],
                  subtitle: [
                    {
                      language: "VI",
                      content: "Nội dung By",
                    },
                    {
                      language: "EN",
                      content: "By",
                    },
                  ],
                  content: [
                    {
                      language: "VI",
                      content:
                        "Nội dung To develop the eco-system in the yacht industry, Trans Yachting World has expanded the marina system along the coast of Vietnam. Directly facing to open sea and river, our Marinas are constructed to ensure the yacht safety even in the worst weather. The floating pontoons in modern marinas around the world are our choice and they are formed by strong concrete piles. Together with equipment, the installation of specialized facilities and 24/7 security system and the serve of full-time professional yacht crews and technicians to assure that all yachts are in the best condition.",
                    },
                    {
                      language: "EN",
                      content:
                        "To develop the eco-system in the yacht industry, Trans Yachting World has expanded the marina system along the coast of Vietnam. Directly facing to open sea and river, our Marinas are constructed to ensure the yacht safety even in the worst weather. The floating pontoons in modern marinas around the world are our choice and they are formed by strong concrete piles. Together with equipment, the installation of specialized facilities and 24/7 security system and the serve of full-time professional yacht crews and technicians to assure that all yachts are in the best condition.",
                    },
                  ],
                  buttonTitle: [
                    {
                      language: "VI",
                      content: "Khám phá",
                    },
                    {
                      language: "EN",
                      content: "Explore More",
                    },
                  ],
                  buttonLink: "/services/marina",
                  image1: "images/defaults/home/marina/image-1.png",
                  image2: "images/defaults/home/marina/image-2.png",
                  image3: "images/defaults/home/marina/image-3.png",
                  image4: "images/defaults/home/marina/image-4.png",
                  image5: "images/defaults/home/marina/image-5.png",
                  background: "images/defaults/home/marina/background.webp",
                },
                section2: {
                  title1: [
                    {
                      language: "VI",
                      content: "Nội dung Yacht Service",
                    },
                    {
                      language: "EN",
                      content: "Yacht Service",
                    },
                  ],
                  title2: [
                    {
                      language: "VI",
                      content: "Nội dung By Trans Yachting",
                    },
                    {
                      language: "EN",
                      content: "By Trans Yachting",
                    },
                  ],
                  content: [
                    {
                      language: "VI",
                      content:
                        "Nội dung To strive for a professional One-stop Shop, Trans Yachting is pleased to launch our very first YACHT SERVICE CENTER at 244 Bui Van Ba, Tan Thuan Dong, District 7, Ho Chi Minh City in 2019.<br>With well-trained technicians and foreign experts from the world’s leading brands, we are confident to bring you the professional and attentive services to ensure that your yachts are always in the best condition. We provide all technical services of annual maintenance, yacht repair and operating for all type of boats and yachts up to 100 ft in length.",
                    },
                    {
                      language: "EN",
                      content:
                        "To strive for a professional One-stop Shop, Trans Yachting is pleased to launch our very first YACHT SERVICE CENTER at 244 Bui Van Ba, Tan Thuan Dong, District 7, Ho Chi Minh City in 2019.<br>With well-trained technicians and foreign experts from the world’s leading brands, we are confident to bring you the professional and attentive services to ensure that your yachts are always in the best condition. We provide all technical services of annual maintenance, yacht repair and operating for all type of boats and yachts up to 100 ft in length.",
                    },
                  ],
                  buttonTitle: [
                    {
                      language: "VI",
                      content: "Khám phá",
                    },
                    {
                      language: "EN",
                      content: "Explore More",
                    },
                  ],
                  buttonLink: "/services/maintainance",
                  image: "images/defaults/home/service/image-1.webp",
                },
                section3: {
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung Yacth Renting Service",
                    },
                    {
                      language: "EN",
                      content: "Yacth Renting Service",
                    },
                  ],
                  content: [
                    {
                      language: "VI",
                      content:
                        "Nội dung To strive for a professional One-stop Shop, Trans Yachting is pleased to launch our very first YACHT SERVICE CENTER at 244 Bui Van Ba, Tan Thuan Dong, District 7, Ho Chi Minh City in 2019.<br>With well-trained technicians and foreign experts from the world’s leading brands, we are confident to bring you the professional and attentive services to ensure that your yachts are always in the best condition. We provide all technical services of annual maintenance, yacht repair and operating for all type of boats and yachts up to 100 ft in length.",
                    },
                    {
                      language: "EN",
                      content:
                        "To strive for a professional One-stop Shop, Trans Yachting is pleased to launch our very first YACHT SERVICE CENTER at 244 Bui Van Ba, Tan Thuan Dong, District 7, Ho Chi Minh City in 2019.<br>With well-trained technicians and foreign experts from the world’s leading brands, we are confident to bring you the professional and attentive services to ensure that your yachts are always in the best condition. We provide all technical services of annual maintenance, yacht repair and operating for all type of boats and yachts up to 100 ft in length.",
                    },
                  ],
                  buttonTitle: [
                    {
                      language: "VI",
                      content: "Khám phá",
                    },
                    {
                      language: "EN",
                      content: "Explore More",
                    },
                  ],
                  buttonLink: "/services/renting",
                  background:
                    "images/defaults/home/rentind-service/background.webp",
                },
              },
            },
          });
          await this.configService.createAboutUsConfig({
            configKey: "about-us",
            configValue: {
              seo: {
                title: [
                  {
                    language: "VI",
                    content: `Về chúng tôi tiêu đề`,
                  },
                  {
                    language: "EN",
                    content: `About Us title`,
                  },
                ],
                description: [
                  {
                    language: "VI",
                    content: `Về chúng tôi mô tả`,
                  },
                  {
                    language: "EN",
                    content: `About Us description`,
                  },
                ],
                keyword: [
                  {
                    language: "VI",
                    content: `Về chúng tôi từ khóa`,
                  },
                  {
                    language: "EN",
                    content: `About Us keywords`,
                  },
                ],
              },
              bannerImage: "images/defaults/about-us/banner.jpeg",
              title: [
                {
                  language: "VI",
                  content:
                    "Nội dung OUR MISSION IS TO BRING YOU A PERFECT YACHTING EXPERIENCE",
                },
                {
                  language: "EN",
                  content:
                    "OUR MISSION IS TO BRING YOU A PERFECT YACHTING EXPERIENCE",
                },
              ],
              content: [
                {
                  language: "VI",
                  content:
                    "Nội dung To develop the eco-system in Vietnam yacht industry, Trans Yachting is thrilled to build the TRANS YACHTING WORLD where all unique & professional yacht services are served to make Vietnamese wishes come true. From the very first step of Sales Consultant to the after-sale services such as Yacht Management, Sailing Services, Technical Services & Maritime Advisory, WE – Tam Son Yachting has mission to inherit the Brands’ core values so that all Vietnamese customers could have the perfect European Yachting Experience in One-stop Shop.<br>Be a member of Openasia Group, a multi-industry investment group established in 1994 in Vietnam, Tam Son Yachting was founded in 2017 and has expanded to operate a range of Marinas, Yacht Service Center in Vietnam & has imported brand-new yachts from the leading brands of the world: BENETEAU, Lagoon Catamarans, Monte Carlo Yachts & Zodiac Nautic.",
                },
                {
                  language: "EN",
                  content:
                    "To develop the eco-system in Vietnam yacht industry, Trans Yachting is thrilled to build the TRANS YACHTING WORLD where all unique & professional yacht services are served to make Vietnamese wishes come true. From the very first step of Sales Consultant to the after-sale services such as Yacht Management, Sailing Services, Technical Services & Maritime Advisory, WE – Tam Son Yachting has mission to inherit the Brands’ core values so that all Vietnamese customers could have the perfect European Yachting Experience in One-stop Shop.<br>Be a member of Openasia Group, a multi-industry investment group established in 1994 in Vietnam, Tam Son Yachting was founded in 2017 and has expanded to operate a range of Marinas, Yacht Service Center in Vietnam & has imported brand-new yachts from the leading brands of the world: BENETEAU, Lagoon Catamarans, Monte Carlo Yachts & Zodiac Nautic.",
                },
              ],
              buttonTitle: [
                {
                  language: "VI",
                  content: "Nội dung Download Brochure",
                },
                {
                  language: "EN",
                  content: "Download Brochure",
                },
              ],
              buttonLink: "https://google.com",
              slides: [
                {
                  image: "images/defaults/about-us/ship.png",
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung BENETEAU 1",
                    },
                    {
                      language: "EN",
                      content: "BENETEAU 1",
                    },
                  ],
                  content: [
                    {
                      language: "VI",
                      content:
                        "Nội dung BENETEAU is one of the most long-standing shipyard in the world, <brwhich was founded in 1884 as a place where produced sailing<brfishing boats in France. During the development, BENETEAU has<brconstantly innovated thanks to talented architects & designers.<brToday, BENETEAU has expanded to the world via 11 names including<brMotor Yachts & Sailing Yachts.",
                    },
                    {
                      language: "EN",
                      content:
                        "BENETEAU is one of the most long-standing shipyard in the world, <brwhich was founded in 1884 as a place where produced sailing<brfishing boats in France. During the development, BENETEAU has<brconstantly innovated thanks to talented architects & designers.<brToday, BENETEAU has expanded to the world via 11 names including<brMotor Yachts & Sailing Yachts.",
                    },
                  ],
                  establishedIn: [
                    {
                      language: "VI",
                      content:
                        "Nội dung 1884, in Saint-Gilles- Croix-de-Vie, France",
                    },
                    {
                      language: "EN",
                      content: "1884, in Saint-Gilles- Croix-de-Vie, France",
                    },
                  ],
                  establishedBy: "BENJAMIN BÉNÉTEAU",
                },
                {
                  image: "images/defaults/about-us/ship.png",
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung BENETEAU 2",
                    },
                    {
                      language: "EN",
                      content: "BENETEAU 2",
                    },
                  ],
                  content: [
                    {
                      language: "VI",
                      content:
                        "Nội dung BENETEAU is one of the most long-standing shipyard in the world, <brwhich was founded in 1884 as a place where produced sailing<brfishing boats in France. During the development, BENETEAU has<brconstantly innovated thanks to talented architects & designers.<brToday, BENETEAU has expanded to the world via 11 names including<brMotor Yachts & Sailing Yachts.",
                    },
                    {
                      language: "EN",
                      content:
                        "BENETEAU is one of the most long-standing shipyard in the world, <brwhich was founded in 1884 as a place where produced sailing<brfishing boats in France. During the development, BENETEAU has<brconstantly innovated thanks to talented architects & designers.<brToday, BENETEAU has expanded to the world via 11 names including<brMotor Yachts & Sailing Yachts.",
                    },
                  ],
                  establishedIn: [
                    {
                      language: "VI",
                      content:
                        "Nội dung 1884, in Saint-Gilles- Croix-de-Vie, France",
                    },
                    {
                      language: "EN",
                      content: "1884, in Saint-Gilles- Croix-de-Vie, France",
                    },
                  ],
                  establishedBy: "BENJAMIN BÉNÉTEAU",
                },
                {
                  image: "images/defaults/about-us/ship.png",
                  title: [
                    {
                      language: "VI",
                      content: "Nội dung BENETEAU 3",
                    },
                    {
                      language: "EN",
                      content: "BENETEAU 3",
                    },
                  ],
                  content: [
                    {
                      language: "VI",
                      content:
                        "Nội dung BENETEAU is one of the most long-standing shipyard in the world, <brwhich was founded in 1884 as a place where produced sailing<brfishing boats in France. During the development, BENETEAU has<brconstantly innovated thanks to talented architects & designers.<brToday, BENETEAU has expanded to the world via 11 names including<brMotor Yachts & Sailing Yachts.",
                    },
                    {
                      language: "EN",
                      content:
                        "BENETEAU is one of the most long-standing shipyard in the world, <brwhich was founded in 1884 as a place where produced sailing<brfishing boats in France. During the development, BENETEAU has<brconstantly innovated thanks to talented architects & designers.<brToday, BENETEAU has expanded to the world via 11 names including<brMotor Yachts & Sailing Yachts.",
                    },
                  ],
                  establishedIn: [
                    {
                      language: "VI",
                      content:
                        "Nội dung 1884, in Saint-Gilles- Croix-de-Vie, France",
                    },
                    {
                      language: "EN",
                      content: "1884, in Saint-Gilles- Croix-de-Vie, France",
                    },
                  ],
                  establishedBy: "BENJAMIN BÉNÉTEAU",
                },
              ],
            },
          });
          await this.configService.createContactUsConfig({
            configKey: "contact-us",
            configValue: {
              seo: {
                title: [
                  {
                    language: "VI",
                    content: `Liên hệ với chúng tôi tiêu đề`,
                  },
                  {
                    language: "EN",
                    content: `Contact Us title`,
                  },
                ],
                description: [
                  {
                    language: "VI",
                    content: `Liên hệ với chúng tôi mô tả`,
                  },
                  {
                    language: "EN",
                    content: `Contact Us description`,
                  },
                ],
                keyword: [
                  {
                    language: "VI",
                    content: `Liên hệ với chúng tôi từ khóa`,
                  },
                  {
                    language: "EN",
                    content: `Contact Us keywords`,
                  },
                ],
              },
              map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.097742479828!2d105.85017601493259!3d21.02877473599841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2zSOG7kyBIb8OgbiBLaeG6v20!5e0!3m2!1svi!2s!4v1649843119632!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
              backgroundImage: "images/defaults/contract-us/background.png",
              phone: "+84 (0) 868 769 128",
              email: "info@trans.com",
              facebookLink: "https://facebook.com/trans",
              facebookName: "Trans",
            },
          });
          await this.configService.createHeaderConfig({
            configKey: "header",
            configValue: {
              logo: "images/defaults/header/logo.png",
              facebookLink: "https://facebook.com/trans",
              youtubeLink: "https://facebook.com/trans",
              instagramLink: "https://instagram.com/trans",
            },
          });
          await this.configService.createFooterConfig({
            configKey: "footer",
            configValue: {
              logo: "images/defaults/footer/logo.png",
              phoneNumber: "+84 (0) 868 769 128",
              email: "info@trans.com",
              location: "Ha Noi",
              location2: "Ha Noi",
              facebookLink: "https://facebook.com/trans",
              youtubeLink: "https://youtube.com/trans",
              instagramLink: "https://instagram.com/trans",
            },
          });
          await this.configService.createFloatButtonsConfig({
            configKey: "float-buttons",
            configValue: {
              smsLink: "https://facebook.com/trans",
              callLink: "https://facebook.com/trans",
              messageLink: "https://facebook.com/trans",
              zalo: "https://facebook.com/trans",
            },
          });
          await this.configService.createCommonConfig({
            configKey: "common",
            configValue: {
              seo: {
                title: [
                  {
                    language: "VI",
                    content: `Tiêu đề`,
                  },
                  {
                    language: "EN",
                    content: `Title`,
                  },
                ],
                description: [
                  {
                    language: "VI",
                    content: `Mô tả`,
                  },
                  {
                    language: "EN",
                    content: `Description`,
                  },
                ],
                keyword: [
                  {
                    language: "VI",
                    content: `Từ khóa`,
                  },
                  {
                    language: "EN",
                    content: `Keywords`,
                  },
                ],
              },
              faviconImage: "images/defaults/common/favicon.png",
            },
          });
          await this.configService.createNewsConfig({
            configKey: "news",
            configValue: {
              seo: {
                title: [
                  {
                    language: "VI",
                    content: `Tin tức tiêu đề`,
                  },
                  {
                    language: "EN",
                    content: `News title`,
                  },
                ],
                description: [
                  {
                    language: "VI",
                    content: `Tin tức mô tả`,
                  },
                  {
                    language: "EN",
                    content: `News description`,
                  },
                ],
                keyword: [
                  {
                    language: "VI",
                    content: `Tin tức từ khóa`,
                  },
                  {
                    language: "EN",
                    content: `News keywords`,
                  },
                ],
              },
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

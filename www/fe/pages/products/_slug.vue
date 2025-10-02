<template>
  <div>
    <div v-if="product && product.bannerImage" class="w-100" >
      <img class="w-100 h100vh"  :src="`${baseUrl}/${product.bannerImage}`" />
    </div>
    <div v-if="product && product._id" class="trans-product-detail__wrapper">
      <div class="trans-product-detail__name mt-5">
        {{ product.name[currentLocale] }}
      </div>
      <a-row class="mt-5">
        <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
          <div class="trans-product-detail-info__title">
            {{ $t("products.specification") }}
          </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 16 }">
          <a-row
            v-for="(
              specification, specificationIndex
            ) in product.specifications"
            :key="specificationIndex"
            class="mt-4 trans-product-detail-info__line"
          >
            <a-col
              :xs="{ span: 12 }"
              :lg="{ span: 10 }"
              class="trans-product-detail-info__text"
            >
              {{ specification.label[currentLocale] }}
            </a-col>
            <a-col
              :xs="{ span: 12 }"
              :lg="{ span: 14 }"
              class="trans-product-detail-info__text"
            >
              {{ specification.value[currentLocale] }}
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row class="mt-5">
        <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
          <div class="trans-product-detail-info__title">
            {{ $t("products.content") }}
          </div>
        </a-col>
        <a-col
          :xs="{ span: 24 }"
          :lg="{ span: 16 }"
          class="trans-product-detail-info__description"
        >
          <div v-html="product.content[currentLocale]"></div>
        </a-col>
      </a-row>
      <a-row class="mt-5">
        <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
          <div class="trans-product-detail-info__title">
            {{ $t("products.interiorDesign") }}
          </div>
        </a-col>
        <a-col
          :xs="{ span: 24 }"
          :lg="{ span: 16 }"
          class="trans-product-detail-info__description"
        >
          <div v-html="product.interiorDesign[currentLocale]"></div>
        </a-col>
      </a-row>
      <!-- <a-row class="mt-4">
        <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
          <div class="trans-product-detail-info__title">
            {{ $t("products.sectionWithTabs") }}
          </div>
        </a-col>
        <a-col
          :xs="{ span: 24 }"
          :lg="{ span: 16 }"
          class="trans-product-detail-info__tabs"
        >
          <a-tabs
            v-if="product.tabContents && product.tabContents.length > 0"
            :default-active-key="0"
            class="w-100"
          >
            <a-tab-pane
              v-for="(tab, tabIndex) in product.tabContents"
              :key="tabIndex"
              :tab="tab.label[currentLocale]"
              class="w-100"
            >
              <div
                class="w-100 trans-product-detail-info__tabs-content"
                v-html="tab.content[currentLocale]"
              ></div>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row> -->
      <!-- <a-row class="mt-4">
        <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
          <div class="trans-product-detail-info__title">
            {{ $t("products.designerArchitects") }}
          </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 16 }">
          <div class="d-flex flex-lg-row flex-column">
            <div
              v-for="designer in product.designers"
              :key="designer._id"
              class="trans-product-detail-info__person"
            >
              <img class="w-100" :src="`${baseUrl}/${designer.image}`" />
              <div class="trans-product-detail-info__person-name">
                {{ designer.name }}
              </div>
              <div class="trans-product-detail-info__person-role">
                {{ designer.position[currentLocale] }}
              </div>
            </div>
          </div>
        </a-col>
      </a-row> -->

      <a-row class="mt-4">
        <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
          <div class="trans-product-detail-info__title">{{ $t('products.downloadBrochure') }}</div>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 16 }">
          <div class="d-flex flex-lg-row flex-column">
            <a :href="product.brochureLink" target="_blank" class="product-download-button">{{ $t('products.downloadBrochure') }}</a>
          </div>
        </a-col>
      </a-row>

      <div class="mt-2 slide-wrapper" v-if="product.galleries && product.galleries.length > 0">
        <div class="section-title mt-4 mb-3">
          <div class="trans-product-detail-info__title">{{ $t('products.gallery') }}</div>
        </div>
        <slick class="slide" ref="slick" :options="slickOptions"
          v-if="product.galleries && product.galleries.length > 0">
          <div class="slide-content" v-for="(gallery, index) in product.galleries" :key="index">
            <img class="w-100" :src="`${baseUrl}/${gallery}`" />
          </div>
        </slick>
        <div class="slide-prev" @click="prev">
          <img src="~/assets/images/about-us/slide-prev.svg" />
        </div>
        <div class="slide-next" @click="next">
          <img src="~/assets/images/about-us/slide-next.svg" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  head() {
    return this.product && this.product.seo
      ? {
          title: this.product.seo.title[this.currentLocale],
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.product.seo.description[this.currentLocale],
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.product.seo.keyword[this.currentLocale],
            },
          ],
        }
      : {};
  },

  data: () => {
    return {
      specification: [
        {
          title: "LENGTH OVER ALL",
          detail: "11,50",
        },
        {
          title: "HULL LENGTH",
          detail: "11,13",
        },
        {
          title: "HULL BEAM",
          detail: "3,99",
        },
        {
          title: "LIGHT DISPLACEMENT",
          detail: "6 850",
        },
        {
          title: "FUEL TANK CAPACITY",
          detail: "130",
        },
        {
          title: "FRESH WATER CAPACITY",
          detail: "130",
        },
        {
          title: "MAX ENGINE POWER (HP)",
          detail: "30",
        },
        {
          title: "CE CERTIFICATION",
          detail: "A8 / B9 / C10",
        },
      ],
    };
  },

  layout: "default",

  computed: {
    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },

  data() {
    return {
      baseUrl: process.env.baseUrl,
      slickOptions: {
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: "18em",
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false
            }
          }
        ]
      },
    };
  },

  methods: {
    next() {
      if (this.$refs.slick) this.$refs.slick.next();
    },

    prev() {
      if (this.$refs.slick) this.$refs.slick.prev();
    },
  },

  async asyncData({ query, params, $axios }) {
    const { slug } = params;
    const productData = await $axios.$get(`/frontend/products/${slug}`);
    return { product: (productData && productData.data) || null };
  },
};
</script>

<style lang="scss">

.h100vh {
  height: 100vh;
  object-fit: cover;
}

.trans-product-detail-info__tabs-content {
  font-family: "Montserrat";
  font-style: normal;
  color: #000000;

  img {
    max-width: 100%;
  }
}

.trans-product-detail__wrapper {
  padding: 20px 2vw;
}

.trans-product-detail__name {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
}

.trans-product-detail-info {
  &__description {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 28px;
    color: #000000;
    div {
      width: 100%;
    }
  }
  &__title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: #000000;
  }
  &__text {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 28px;
    color: #000000;
  }

  &__person-name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #000000;
    margin-top: 10px;
  }
  &__person-role {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.2);
    margin-top: 8px;
  }

  &__person {
    margin-top: 0px;
    width: fit-content;
    margin-right: 10px;
  }

  &__line {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    padding-bottom: 10px;
  }
  &__tabs {
    .ant-tabs-tab {
      color: rgba(0, 0, 0, 0.2);
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      &:hover {
        color: #000000 !important;
      }
    }
    .ant-tabs-tab-active {
      color: #000000;
    }
    .ant-tabs-ink-bar {
      background: #000000
    }
  }
}

@media screen and (max-width: 992px) {

  .h100vh {
    height: 35vh !important;
    object-fit: cover;
  }

  .trans-product-detail__name {
    font-size: 24px !important;
    line-height: 32px !important;
  }

  .trans-product-detail-info {
    &__title {
      font-size: 24px !important;
      line-height: 32px !important;
    }

    &__description {
      width: 100%;
      line-height: 24px !important;
      margin-top: 10px;
    }
    &__person-name {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      color: #000000;
      margin-top: 10px;
    }
    &__person-role {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.2);
      margin-top: 8px;
    }
    &__person {
      margin-top: 30px;
      width: 100%;
    }

    &__line {
      border-bottom: 1px solid rgba(0, 0, 0, 0.4);
      padding-bottom: 10px;
    }
    &__tabs {
      .ant-tabs-tab {
        color: rgba(0, 0, 255, 0.2);
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        &:hover {
          color: #000000 !important;
        }
      }
      .ant-tabs-tab-active {
        color: #000000;
      }
      .ant-tabs-ink-bar {
        background: #000000;
      }
    }
  }
}

.product-download-button {
  padding: 12px 32px;
  background: #000000;
  backdrop-filter: blur(300px);
  border-radius: 0px 24px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #ffffff;
  width: fit-content;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #1E201D !important;
  }
}

.slide-wrapper {
  position: relative;
  overflow: hidden;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    top: 0;
    z-index: 1;
    opacity: 0.7;
  }

  &::after {
    right: -15px;
  }

  &::before {
    left: -15px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }

  .slide-prev,
  .slide-next {
    position: absolute;
    top: 50%;
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 13px;
    cursor: pointer;
    transform: translate(0, -50%);
    z-index: 2;
  }

  .slide-prev {
    left: 24px;
  }

  .slide-next {
    right: 24px;
  }

  .slick-track {
    .slick-slide {
      &>div {
        padding: 0 8px;
      }
    }
  }

  .slide {
    .slide-content {
      width: 100%;
      height: 525px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .slide-wrapper {
    position: relative;
    overflow: hidden;

    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 100px;
      height: 100%;
      top: 0;
      z-index: 1;
      opacity: 0.7;
    }

    &::after {
      right: -15px;
    }

    &::before {
      left: -15px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }

    .slide-prev,
    .slide-next {
      position: absolute;
      top: 50%;
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 13px;
      cursor: pointer;
      transform: translate(0, -50%);
      z-index: 2;
    }

    .slide-prev {
      left: 24px;
    }

    .slide-next {
      right: 24px;
    }

    .slick-track {
      .slick-slide {
        &>div {
          padding: 0 8px;
        }
      }
    }

    .slide {
      .slide-content {
        width: 100%;
        height: 525px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
}


  /* ----------- iPad Pro ----------- */
  /* Portrait and Landscape */
  @media only screen
  and (min-width: 1024px)
  and (max-height: 1366px)
  and (-webkit-min-device-pixel-ratio: 1.5) {
    .h100vh {
      height: 50vh !important;
      object-fit: cover;
    }
  }

  /* Portrait */
  @media only screen
  and (min-width: 1024px)
  and (max-height: 1366px)
  and (orientation: portrait)
  and (-webkit-min-device-pixel-ratio: 1.5) {
    .h100vh {
      height: 50vh !important;
      object-fit: cover;
    }
  }

/* Portrait */
@media only screen
and (min-width: 2000px)
and (max-height: 2600px)
and (orientation: portrait)
and (-webkit-min-device-pixel-ratio: 1.5) {
  .h100vh {
    height: 50vh !important;
    object-fit: cover;
  }
}

  /* Landscape */
  @media only screen
  and (min-width: 1024px)
  and (max-height: 1366px)
  and (orientation: landscape)
  and (-webkit-min-device-pixel-ratio: 1.5) {
    .h100vh {
      height: 70vh !important;
      object-fit: cover;
    }
  }



</style>

<template>
  <div class="trans-yatch-type">
    <div
      v-if="
        yatchType && yatchType.productLines && yatchType.productLines.length > 0
      "
    >
      <div
        class="trans-product-lines-wrapper"
        v-for="(productLine, index) in yatchType.productLines"
        :key="productLine._id"
      >
        <div class="trans-product-lines-header">
		    <div
              class="trans-yatch-type-header"
              v-if="yatchType && yatchType._id && index == 0"
            >
              <div class="trans-yatch-type-header__title">
                {{ yatchType.name[currentLocale] }}
              </div>
            </div>
          <div class="trans-product-lines-header__content">
            <div class="trans-product-lines-header__name">
              {{ productLine.name[currentLocale] }}
            </div>
            <div
              class="trans-product-lines-header__description"
              v-html="productLine.content[currentLocale]"
            ></div>
          </div>
        </div>
        <a-row
          type="flex"
          v-if="productLine.products && productLine.products.length > 0"
        >
          <a-col
            v-for="product in productLine.products"
            :key="product._id"
            :xs="{ span: 24 }"
            :lg="{ span: 6 }"
            class="position-relative trans-product-lines-item__wrapper"
          >
            <div class="trans-product-lines-item__overlay" />
            <div class="w-100">
              <img
                class="product-image w-100"
                :src="`${baseUrl}/${product.image}`"
              />
            </div>
            <div
              class="
                trans-product-lines-item
                d-flex
                flex-column
                align-items-center
                w-100
              "
            >
              <div class="trans-product-lines-item__name">
                {{ product.name[currentLocale] }}
              </div>
              <nuxt-link
                class="trans-product-lines-item__detail"
                :to="localePath(`/products/${product.slug}`)"
              >
                {{ $t("yatchTypes.viewDetail") }}
              </nuxt-link>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return this.yatchType && this.yatchType.seo
      ? {
          title: this.yatchType.seo.title[this.currentLocale],
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.yatchType.seo.description[this.currentLocale],
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.yatchType.seo.keyword[this.currentLocale],
            },
          ],
        }
      : {};
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
    };
  },

  async asyncData({ query, params, $axios }) {
    const { slug } = params;
    const yatchTypeData = await $axios.$get(`/frontend/yatch-types/${slug}`);
/*
    yatchTypeData && yatchTypeData.data.productLines.forEach(function(item){
        item.products=item.products.sort(function(a, b){return parseInt(a.name.vi.replace( /^\D+/g, ''))-parseInt(b.name.vi.replace( /^\D+/g, ''))})
    })
*/
    return { yatchType: (yatchTypeData && yatchTypeData.data) || null };
  },
};
</script>

<style lang="scss" scoped>
.trans-yatch-type {
  // background: url(~/assets/images/product-lines/background.png) no-repeat top
  //   center;
  background-size: 100% auto;

  .trans-yatch-type-header {
    padding: 120px 0 0 0;
    margin-bottom: 20px;
    &__title {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
      line-height: 56px;
      color: #ffffff;
      margin-bottom: 0;
    }
	text-align:center;
	text-transform: uppercase;
  }

  .trans-product-lines-wrapper {
    &:not(:first-child) {
      .trans-product-lines-header {
        background-color:#000000;
        background-size: cover;
        background-position: top;
      }
    }
  }

  .trans-product-lines-header {
    position: relative;
    /* margin-top: 80px; */
    padding: 30px 0 30px 20px;
    overflow: hidden;
    background-color:#000000;
    &__content {
      position: relative;
      text-align: center;
    }
    &__title {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
      line-height: 56px;
      color: #ffffff;
      margin-bottom: 20px;
    }
    &__name {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
    }
    &__description {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 15px;
    }
  }

  .trans-product-lines-item {
    position: absolute;
    bottom: 0;
    z-index: 1;
    transform: translateY(-50%);

    &__name {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
      opacity: 1;
      transition: all 0.3s;
    }
    &__detail {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #e4c09f;
      background: rgba(255, 255, 255, 0.2);
      padding: 10px;
      margin-top: 10px;
      cursor: pointer;
      opacity: 1;
      transition: all 0.3s;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid white;
      }
    }
    &__overlay {
      position: absolute;
      height: calc(100vw / 4);
      bottom: -2px;
      background: linear-gradient(
        180deg,
        rgba(19, 34, 36, 0) 0%,
        rgba(19, 34, 36, 0.703125) 49.69%,
        #132224 98.56%
      );
      width: 100%;
    }
  }

  .product-image {
    min-height: 31.25vw;
    object-fit: cover;
  }

  .trans-product-lines-item__wrapper {
	flex: 25%;
    overflow: hidden;

    &:hover {
      img {
        transition: all 0.3s;
        filter: blur(17px);
      }
      &:hover {
        .trans-product-lines-item {
          &__name {
            opacity: 1;
          }
          &__detail {
            opacity: 1;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .product-image {
    height: 120vw !important;
    object-fit: cover !important;
  }

  .trans-product-lines-item__wrapper {
	flex: 100% !important;
    overflow: hidden;
	}

  .trans-product-lines-header {
    margin-top: 0 !important;
    padding: 30px 2vw 20px 2vw !important;
    &__content {
      width: 100%;
    }
    &__name {
      margin-top: 0 !important;
    }
    &__title {
      font-size: 24px !important;
      line-height: 32px !important;
    }
    &__content {
      width: 100% !important;
    }
  }

  .trans-product-lines-item {
    position: absolute;
    bottom: 0;
    z-index: 1;
    transform: translateY(-50%);
    &__name {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
    }
    &__detail {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #e4c09f;
      margin-top: 10px;
      cursor: pointer;
    }
    &__overlay {
      height: calc(100vw) !important;
    }
  }
}
</style>


<template>

  <div style="z-index: 2000;" :class="`trans-header-wrapper trans-header-wrapper-${getHeaderClass} ${scrollTop > 20 ? 'scrolling' : ''
  }`">
    <div id="page-loading"
         style="display:block;height: 100vh;width: 100vw;background: #000000de;position: absolute;z-index: 10000;text-align: center; backdrop-filter: blur(20px);">

      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="
        d-flex
        align-items-center
        w-100
        h-100
        justify-content-between
        trans-header-content
      ">
      <nuxt-link v-if="headerConfig.logo" :to="localePath(`/`)">
        <img class="trans-header-logo" :src="`${baseUrl}/${headerConfig.logo}`" alt="" />
      </nuxt-link>
      <div class="d-none d-lg-flex align-items-center">
        <div>
          <div class="d-flex align-items-center">
            <nuxt-link class="trans-header-link" :to="localePath('/about-us')">
              {{ $t("header.aboutUs") }}
            </nuxt-link>
            <div :class="`trans-header-link ${showBrands && 'trans-brands-active'
            }`" @click="handleOpenBrand">
              {{ $t("header.brands") }}
              <img :class="`trans-header-icon-arrow ${showBrands && 'arrow-active'
              }`" src="~/assets/images/common/arrow-down.png" style="transition: all 0.3s" />
            </div>
            <div :class="`trans-header-link ${showService && 'trans-brands-active'
            }`" @click="handleOpenService">
              {{ $t("header.services") }}
              <img :class="`trans-header-icon-arrow ${showService && 'arrow-active'
              }`" src="~/assets/images/common/arrow-down.png" style="transition: all 0.3s" />
            </div>
            <nuxt-link class="trans-header-link" :to="localePath(`/news`)">
              {{ $t("header.news") }}
            </nuxt-link>
            <nuxt-link class="trans-header-link" :to="localePath(`/contact-us`)">
              {{ $t("header.contact") }}
            </nuxt-link>
          </div>
        </div>
        <div class="trans-header-divider" />
        <div>
          <nuxt-link :to="localePath(`/`)">
            <img class="trans-header-icon" src="~/assets/images/header/home-icon.png" alt="Home" />
          </nuxt-link>
          <a :href="headerConfig.facebookLink" target="_blank">
            <img class="trans-header-icon" src="~/assets/images/header/facebook-icon.png" alt="Facebook" />
          </a>
          <a :href="headerConfig.youtubeLink" target="_blank">
            <img class="trans-header-icon" src="~/assets/images/header/youtube-icon.png" alt="Youtube" />
          </a>
          <a :href="headerConfig.instagramLink" target="_blank">
            <img class="trans-header-icon" src="~/assets/images/header/instagram-icon.png" alt="Instagram" />
          </a>
        </div>
        <change-language />
        <div class="trans-header-divider" />
        <nuxt-link :to="localePath('/contact-us')" class="trans-header-contact">
          {{ $t("header.contactNow") }}
        </nuxt-link>
      </div>
      <div class="d-none d-md-flex d-lg-none align-items-center">
        <change-language />
        <div role="button" class="d-lg-none ml-3" @click="showMenu = !showMenu">
          <img src="~/assets/images/header/menu-icon.png" />
        </div>
      </div>
    </div>
    <div></div>

    <div v-if="showBrands && brandMenuData && brandMenuData.length > 0" class="trans-header-brands-info" v-anime="{
      opacity: [0, 1],
      duration: 500,
      easing: 'linear',
    }">
      <div class="d-flex" style="flex-wrap: wrap">
        <nuxt-link v-for="(brand, index) in brandMenuData" :key="brand._id" :class="`position-relative flexible trans-header-brands-info__logo ${selectedBrand == brand._id
        ? 'trans-header-brands-info__logo-active'
        : ''
        }`"
                   :to="localePath(`/brands/${brand.slug}`)">
          <img v-anime="{
            opacity: [0, 1],
            scale: [0, 1],
            duration: 500,
            delay: (index + 1) * 100,
            easing: 'linear',
          }" :src="`${baseUrl}/${brand.logo}`" />
          <div v-anime="{
            translateY: ['100%', 0],
            duration: 600,
            easing: 'linear',
          }"></div>
        </nuxt-link>
      </div>

      <div v-if="selectedBrand && yatchTypeData && yatchTypeData.length > 0"
           class="trans-header-brands-info__yacht-type d-flex position-relative">
        <!-- <div v-anime="{
          translateX: ['-100%', 0],
          duration: 1000,
          easing: 'linear',
        }" class="trans-header-border-top"></div> -->

        <!-- <div v-for="(yatchType, index) in yatchTypeData" :key="yatchType._id" :class="`position-relative trans-header-brands-info__yacht-type__item ${selectedYatchType == yatchType._id
        ? 'trans-header-brands-info__yacht-type__item-active'
        : ''
        }`" @click="setselectedYatchType(yatchType._id)">
          <div v-anime="{
            opacity: [0, 1],
            scale: [0, 1],
            duration: 500,
            delay: (index + 1) * 100 + brandMenuData.length * 100,
            easing: 'linear',
          }">
            <div>{{ yatchType.name[currentLocale] }}</div>
          </div>

          <div v-anime="{
            translateY: ['100%', 0],
            duration: 800,
            easing: 'linear',
          }" class="trans-header-border-left"></div>
        </div> -->

        <!-- <div v-anime="{
          translateX: ['-100%', 0],
          duration: 1000,
          easing: 'linear',
        }" class="trans-header-border-bottom"></div>-->
      </div>

      <!-- <div v-if="
        selectedYatchType && productLineData && productLineData.length > 0"
        class="trans-header-brands-info__wrapper">
        <div class="mb-5" v-for="(productLine, productLineIndex) in productLineData" :key="productLineIndex">
          <div class="trans-header-brands-info__products">
            <div v-anime="{
              opacity: [0, 1],
              translateX: [-100, 0],
              duration: 500,
              delay: brandMenuData.length * 100 + yatchTypeData.length * 100,
              easing: 'linear',
            }">
              {{ productLine.name[currentLocale] }}
            </div>
          </div>
          <a-row :gutter="[6, 6]" v-if="productLine.products && productLine.products.length > 0">
            <a-col v-for="(product, productsIndex) in productLine.products" :key="productsIndex" span="6">
              <nuxt-link :to="localePath(`/products/${product.slug}`)" class="trans-header-brands-info__product">
                <div v-anime="{
                  opacity: [0, 1],
                  translateX: [-100, 0],
                  duration: 500,
                  delay:
                    brandMenuData.length * 100 +
                    yatchTypeData.length * 100 +
                    500 +
                    productsIndex * 100,
                  easing: 'linear',
                }">
                  {{ product.name[currentLocale] }}
                </div>
              </nuxt-link>
            </a-col>
          </a-row>
        </div>
      </div>-->
    </div>

    <div v-if="showService && serviceMenuData && serviceMenuData.length > 0" class="trans-header-service" v-anime="{
      opacity: [0, 1],
      duration: 500,
      easing: 'linear',
    }">
      <div class="d-flex row-menu">
        <div v-for="(service, index) in serviceMenuData" :key="index" :span="8" class="trans-header-service__item">
          <nuxt-link :to="localePath(`/services/${service.slug}`)">{{
            service.name[currentLocale]
            }}</nuxt-link>
        </div>
      </div>
    </div>

    <div v-if="showMenu" class="d-flex flex-column align-items-center trans-menu-mobile">
      <div>
        <div class="d-flex flex-column align-items-center">
          <nuxt-link class="trans-header-link" :to="localePath('/about-us')">
            {{ $t("header.aboutUs") }}
          </nuxt-link>
          <div :class="`trans-header-link ${showBrands && 'trans-brands-active'}`" @click="showBrands = !showBrands">
            {{ $t("header.brands") }}
            <img class="trans-header-icon-arrow" src="~/assets/images/common/arrow-down.png" />
          </div>
          <div :class="`trans-header-link ${showService && 'trans-brands-active'}`" @click="showService = !showService">
            {{ $t("header.services") }}
            <img class="trans-header-icon-arrow" src="~/assets/images/common/arrow-down.png" />
          </div>
          <nuxt-link class="trans-header-link" :to="localePath('/news')">
            {{ $t("header.news") }}
          </nuxt-link>
          <nuxt-link class="trans-header-link" :to="localePath('/contact-us')">
            {{ $t("header.contact") }}
          </nuxt-link>
<!--
          <nuxt-link :to="localePath('/contact-us')" class="trans-header-contact d-none d-md-block d-lg-none mb-3">
            {{ $t("header.contactNow") }}
          </nuxt-link>
-->
        </div>
      </div>
      <div class="
          d-flex
          align-items-center
          justify-content-between
          justify-content-md-center
          justify-content-lg-between
          w-100
        ">
        <nuxt-link :to="localePath(`/`)">
          <img class="trans-header-icon" src="~/assets/images/header/home-icon.png" alt="Home" />
        </nuxt-link>
        <a :href="headerConfig.facebookLink" target="_blank">
          <img class="trans-header-icon" src="~/assets/images/header/facebook-icon.png" alt="Facebook" />
        </a>
        <a :href="headerConfig.youtubeLink" target="_blank">
          <img class="trans-header-icon" src="~/assets/images/header/youtube-icon.png" alt="Youtube" />
        </a>
        <div class="d-block d-md-none d-lg-block">
          <change-language />
        </div>

        <div class="trans-header-divider d-block d-md-none d-lg-block" />
        <nuxt-link :to="localePath('/contact-us')" class="trans-header-contact d-block d-md-none d-lg-block">
          {{ $t("header.contactNow") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import ChangeLanguage from "./ChangeLanguage.vue";

  export default {
    directives: {},
    components: { ChangeLanguage },
    data() {
      return {
        scrollTop: 0,
        showBrands: false,
        showService: false,
        showMenu: false,
        selectedBrand: null,
        selectedYatchType: null,
        baseUrl: process.env.baseUrl,
      };
    },
    computed: {
      headerConfig() {
        return this.$store.state.configs.header || {};
      },

      brandMenuData() {
        return this.$store.state.brandMenuData || [];
      },

      serviceMenuData() {
        return this.$store.state.serviceMenuData || [];
      },

      // a computed getter
      currentLocale() {
        return (this.$i18n.locale || "").toLowerCase();
      },

      getHeaderClass() {
        return this.$router.currentRoute.path.replace("/en", "").slice(1);
      },

      productLineData() {
        return this.yatchTypeData &&
        this.yatchTypeData.length > 0 &&
        this.yatchTypeData.filter((item) => item._id == this.selectedYatchType)
                .length > 0
                ? this.yatchTypeData.filter(
                (item) => item._id == this.selectedYatchType
        )[0].productLines || []
                : [];
      },

      yatchTypeData() {
        return this.brandMenuData &&
        this.brandMenuData.length > 0 &&
        this.brandMenuData.filter((item) => item._id == this.selectedBrand)
                .length > 0
                ? this.brandMenuData.filter((item) => item._id == this.selectedBrand)[0]
                .yatchTypes || []
                : [];
      },
    },
    watch: {
      showBrands(val) {
        this.showService = false;
        this.showMenu = false;
        if (!val) {
          this.selectedBrand = null;
          this.selectedYatchType = null;
        } else {
          this.selectedBrand =
                  this.brandMenuData && this.brandMenuData.length > 0
                          ? this.brandMenuData[0]._id
                          : null;
          this.selectedYatchType =
                  this.brandMenuData &&
                  this.brandMenuData.length > 0 &&
                  this.brandMenuData[0].yatchTypes.length > 0
                          ? this.brandMenuData[0].yatchTypes[0]._id
                          : null;
        }
      },
      showService(val) {
        this.showBrands = false;
        this.showMenu = false;
      },

      $route(to, from) {
        this.showMenu = false;
        this.showBrands = false;
        this.showService = false;
      },
      scrollTop(val) {
        if (val > 20) {
          this.showBrands = false;
          this.showService = false;
        }
      },
    },
    updated() {
      this.$nextTick(function () {
        document.getElementById("page-loading").style.visibility = "hidden";
      })
    },
    created() {
      if (process.browser && window) {
        this.scrollTop = window.scrollY;
        window.addEventListener("scroll", this.handleScroll, { passive: true });
        setTimeout(function () {
          document.getElementById("page-loading").style.visibility = "hidden";
        }, 5000)
      }
    },
    mounted() {
      if (process.browser && window) {
        this.scrollTop = window.scrollY;
        window.onload = function () {
          console.log("Page loaded");
          document.getElementById("page-loading").style.visibility = "hidden";
        };
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M93FPF2');
      }

    },
    destroyed() {
      if (process.browser && window) {
        window.removeEventListener("scroll", this.handleScroll);
      }
    },
    methods: {
      handleOpenBrand() {
        this.showService = false;
        this.showBrands = !this.showBrands;
      },
      handleOpenService() {
        this.showBrands = false;
        this.showService = !this.showService;
      },
      handleScroll(event) {
        if (process.browser && window) {
          this.scrollTop = window.scrollY;
        }
      },
      handleClickLink(link) {
        this.showBrands = false;
        this.showService = false;
        this.$router.push(link);
      },
      setSelectedBrand(item, yatchTypes) {
        this.selectedBrand = item;
        if (yatchTypes && yatchTypes.length > 0) {
          this.selectedYatchType = yatchTypes[0]._id;
        }
      },
      setselectedYatchType(item) {
        this.selectedYatchType = item;
      },
      handleClickOutsideBrands() {
        this.showBrands = false;
      },
      handleClickOutsideServices() {
        this.showService = false;
      },
    },
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/_header.scss";

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .lds-ellipsis {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 50%;
    margin-left: -40px;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(24px, 0);
    }
  }
</style>

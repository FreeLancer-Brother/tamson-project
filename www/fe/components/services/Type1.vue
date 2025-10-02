<template>
  <div class="marinas">
    <div class="title">
      <p>{{ serviceData.name[currentLocale] }}</p>
    </div>
    <div class="banner">
      <img class="d-none d-lg-block" :src="`${baseUrl}/${serviceData.image}`" />
      <img class="d-lg-none" :src="`${baseUrl}/${serviceData.image}`" />
    </div>
    <div class="quote" v-html="serviceData.content[currentLocale]">
    </div>
    <div>
      <div
              class="service-home-marina-wrapper"
              :style="`no-repeat center center; background-size: 100% auto;`"
      >
        <a-row :gutter="[32, 32]" type="flex">
          <a-col
                  class="d-flex align-items-center"
                  :xs="{ span: 24 }"
                  :lg="{ span: 12 }"
          >
            <div
                    v-scroll-reveal="{
              duration: 500,
              distance: '100%',
              origin: 'bottom',
              delay: 0,
              opacity: 0,
              reset: false,
            }"
                    class="d-flex flex-column align-items-center"
            >
              <div>
                <img src="~/assets/images/common/nell-icon.png" />
              </div>
              <div class="service-marina-title">
                {{ marinaConfig.title1[currentLocale] }}
              </div>
              <div class="service-marina-by">
                {{ marinaConfig.title2[currentLocale] }}
              </div>
              <div class="service-marina-subtitle">
                {{ marinaConfig.subtitle[currentLocale] }}
              </div>
              <div
                      class="service-description-text text-center"
                      v-html="marinaConfig.content[currentLocale]"
              ></div>
            </div>
          </a-col>
          <a-col
                  :xs="{ span: 24, offset: 0 }"
                  :lg="{ span: 11, offset: 1 }"
                  class="home-marina-image-wrapper"
          >
            <a-row type="flex">
              <a-col span="10">
                <img
                        class="home-marina-border-image-1 marina-image-1"
                        src="~/assets/images/marinas/1.jpg"
                        v-scroll-reveal="{
                duration: 1000,
                distance: '100%',
                origin: 'right',
                delay: 0,
                opacity: 0,
                reset: false,
              }"
                />
              </a-col>
              <a-col span="14">
                <img
                        class="marina-image-2"
                        src="~/assets/images/marinas/2.jpg"
                        v-scroll-reveal="{
                duration: 1000,
                distance: '100%',
                origin: 'right',
                delay: 0,
                opacity: 0,
                reset: false,
              }"
                />
              </a-col>
            </a-row>
            <a-row>
              <a-col span="12" class="d-flex flex-column align-items-end">
                <img
                        class="marina-image-3"
                        src="~/assets/images/marinas/3.jpg"
                        v-scroll-reveal="{
                duration: 1000,
                distance: '100%',
                origin: 'right',
                delay: 0,
                opacity: 0,
                reset: false,
              }"
                />
                <img
                        class="home-marina-border-image-4 marina-image-4"
                        src="~/assets/images/marinas/4.jpg"
                        v-scroll-reveal="{
                duration: 1000,
                distance: '100%',
                origin: 'right',
                delay: 0,
                opacity: 0,
                reset: false,
              }"
                />
              </a-col>
              <a-col span="12">
                <img
                        v-scroll-reveal="{
                  duration: 1000,
                  distance: '100%',
                  origin: 'right',
                  delay: 0,
                  opacity: 0,
                  reset: false,
                }"
                        class="home-marina-border-image-2 marina-image-5"
                        src="~/assets/images/marinas/5.jpg"
                />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <div class="service-marina-bottom" />
    </div>
    <div class="slide-wrapper">
      <div class="section-title">
        <p>{{ $t('services.ourGallery') }}</p>
      </div>
      <slick class="slide" ref="slick" :options="slickOptions"
             v-if="serviceData.galleries && serviceData.galleries.length > 0">
        <div class="slide-content" v-for="(gallery, index) in serviceData.galleries" :key="index">
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
</template>

<script>
  export default {
    props: ["serviceData","homeConfig"],

    components: {},

    computed: {
      currentLocale() {
        return (this.$i18n.locale || "").toLowerCase();
      },
      marinaConfig() {
        return this.homeConfig.services && this.homeConfig.services.section1
                ? this.homeConfig.services.section1
                : {};
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
  };
</script>

<style lang="scss">
  @import "~/assets/scss/pages/_marinas.scss";

  @media screen and (max-width: 992px) {
    .marina-image-1 {
      max-width: 100%;
      height: 45.6vw !important;
      object-fit: cover;
    }

    .marina-image-2 {
      max-width: 100%;
      height: 45.6vw !important;
      object-fit: cover;
    }

    .marina-image-3 {
      width: 100%;
      height: 26.66vw !important;
      object-fit: cover;
    }

    .marina-image-4 {
      width: 100%;
      height: 45.6vw !important;
      object-fit: cover;
    }

    .marina-image-5 {
      max-width: 100%;
      height: 72.26vw !important;
      object-fit: cover;
    }

    .home-marina-image-wrapper {
      padding: 16px 6vw 16px 4vw !important;
      width: 100%;
    }

    .home-marina-border-image-2 {
      border-radius: 0 0 90% 0 / 0 0 50% 0;
      padding-left: 10px;
    }

    .home-marina-border-image-4 {
      border-radius: 0 0 0 90%/0 0 0 100%;
    }

    .service-marina-title {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 32px !important;
      line-height: 46px !important;
      color: #000000;
    }

    .service-marina-by {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 18px !important;
      line-height: 28px !important;
      color: #000000;
    }

    .service-marina-subtitle {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 32px !important;
      line-height: 48px !important;
      color: #000000;
    }

    .service-home-marina-wrapper {
      padding: 0em 1vw 0 3vw;
    }

    .service-description-text {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 14px !important;
      line-height: 24px !important;
      color: #000000;
      margin-top: 20px !important;
      margin-right: 2vw !important;
      text-align: justify !important;
      text-align-last: center;
    }
  }

  .marina-image-1 {
    max-width: 100%;
    max-height: 100%;
    min-height: 23vw;
    object-fit: cover;
  }

  .marina-image-2 {
    max-width: 100%;

    min-height: 23vw;
    object-fit: cover;
  }

  .marina-image-3 {
    width: 100%;
    height: 13.125vw;
    object-fit: cover;
  }

  .marina-image-4 {
    width: 100%;
    height: 13.125vw;
    object-fit: cover;
  }

  .marina-image-5 {
    max-width: 100%;
    height: 26.18vw;
    object-fit: cover;
  }

  .home-marina-image-wrapper {
    img {
      padding-bottom: 10px;
    }
  }

  .home-marina-border-image-1 {
    border-radius: 90% 0 0 0 / 50% 0 0 0;
    padding-right: 10px;
  }

  .home-marina-border-image-2 {
    border-radius: 0 0 90% 0 / 0 0 50% 0;
    padding-left: 10px;
  }

  .home-marina-border-image-4 {
    border-radius: 0 0 0 90%/0 0 0 100%;
  }

  .service-marina-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 72px;
    color: #000000;
  }

  .service-marina-by {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 32px;
    color: #000000;
  }

  .service-marina-subtitle {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 56px;
    color: #000000;
  }

  .service-home-marina-wrapper {
    padding: 4em 1vw 0 3vw;
    position: relative;
  }

  .service-description-text {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #000000;
    margin-top: 30px;
    text-align: center;
  }
</style>



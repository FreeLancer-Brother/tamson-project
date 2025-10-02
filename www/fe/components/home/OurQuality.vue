<template>
  <div class="trans-home-quality-info-wrapper">
    <a-row type="flex" :gutter="[30, 16]" class="my-0 py-0" style="margin: 0px 0px !important;">
      <a-col :xs="{ span: 24, order: 1 }" :lg="{ span: 12, order: 0 }" style="padding:0px !important;">
        <div class="d-lg-flex our-quality">
          <a-row>
            <a-col span="12">
              <div class="d-flex flex-column">
                <img
                  class="w-100 border-image-1 our-quality-image-1"
                  :src="`${baseUrl}/${welcomeBottomConfig.image1}`"
                  alt=""
                  v-scroll-reveal.reset="{
                  duration: 2000,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                  }"
                />
                <img
                  class="w-100 border-image-2 our-quality-image-2"
                  :src="`${baseUrl}/${welcomeBottomConfig.image2}`"
                  alt=""
                  v-scroll-reveal.reset="{
                  duration: 2000,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                  }"
                />
              </div>
            </a-col>
            <a-col span="12">
              <div>
                <img
                  class="w-100 border-image-3 our-quality-image-3"
                  :src="`${baseUrl}/${welcomeBottomConfig.image3}`"
                  alt=""
                  v-scroll-reveal.reset="{
                  duration: 2000,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                  }"
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" >
        <div
          class="w-100 pt-4 d-flex justify-content-lg-end align-items-center h-100 trans-home-welcome-left flex-column" style="justify-content: center !important;"
        >
            <div class="trans-title-text-first quote">{{ welcomeBottomConfig.title1[currentLocale] }}</div>
            <div class="trans-title-text-second quote">{{ welcomeBottomConfig.title2[currentLocale] }}</div>
            <div class="trans-home-quality-info"
              v-if="
                welcomeBottomConfig.statistics &&
                welcomeBottomConfig.statistics.length > 0
              "
              >
              <div class="trans-home-quality-info__item"
                v-for="(statistic, index) in welcomeBottomConfig.statistics"
                :key="index"
              >
                <div class="trans-home-quality-info__item-detail quote">{{ statistic.subtitle[currentLocale] }}</div>
				        <div class="trans-home-quality-info__item-title quote">{{ statistic.title[currentLocale] }}</div>
              </div>
            </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: ["homeConfig"],

  components: {},

  computed: {
    welcomeBottomConfig() {
      return this.homeConfig.welcome && this.homeConfig.welcome.bottom
        ? this.homeConfig.welcome.bottom
        : {};
    },
    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },

  data() {
    return {
      baseUrl: process.env.baseUrl,
    };
  },

  methods: {
    getLocalePath(path) {
      return path.indexOf("http://") > -1 || path.indexOf("https://") > -1
        ? path
        : this.localePath(path);
    },
  },
};
</script>

<style lang="scss" scoped>

@media all and (min-width: 1000px) and (max-width: 1080px) {

  .trans-title-text-second {
    font-size: 22px !important;
    line-height: 22px !important;
  }

  .trans-title-text-first {
    font-size: 22px !important;
  }
  .trans-home-quality-info-wrapper {
    .trans-home-quality-info {
      &__item {
        &-title {
          font-size: 30px !important;
          line-height: 48px !important;
        }
        &-detail {
          font-size: 15px !important;
          line-height: 24px !important;
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .our-quality {
    padding-top: 6vw !important;
  }
  .trans-title-text-wrapper {
    width: 100%;
  }
  .trans-title-text-second {
    font-size: 28px !important;
    line-height: 48px !important;
  }

  .trans-title-text-first {
    font-size: 28px !important;
  }
  .trans-home-quality-info-wrapper {
    .trans-home-quality-info {
      &__item {
        &-title {
          font-size: 40px !important;
          line-height: 48px !important;
        }
        &-detail {
          font-size: 16px !important;
          line-height: 24px !important;
        }
      }
    }
    .border-image-1 {
      margin-bottom: 10px;
      border-radius: 0 81% 0 80% / 0 100% 0 100% !important;
      text-align: center;
    }
    .border-image-2 {
      margin-bottom: 10px;
      border-radius: 81% 0 80% 0 / 100% 0 100% 0 !important;

    }
  }
  .our-quality-image-1 {
    height: 40vw !important;
    width: 100%;
    object-fit: cover;
  }

  .our-quality-image-2 {
    height: 40vw !important;
    width: 100%;
    object-fit: cover;
  }

  .our-quality-image-3 {
    height: 80vw !important;
    width: 100%;
    object-fit: cover;
  }
}

.our-quality-image-1 {
  height: 17vw;
  width: 100%;
  object-fit: cover;
}

.our-quality-image-2 {
  height: 17vw;
  width: 100%;
  object-fit: cover;
}

.our-quality-image-3 {
  height: 34.2vw;
  width: 80%;
  object-fit: cover;
}

.trans-title-text-second {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 50px;
  background: #1E201D;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: center;
}

.trans-title-text-first {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  background: #1E201D;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: center;
}
.trans-home-quality-info-wrapper {
  .border-image-1 {
    margin-bottom: 10px;
    border-radius: 0 80% 0 80% / 0 100% 0 100%;
	text-align: center;
  }
  .border-image-2 {
    margin-bottom: 10px;
    border-radius: 80% 0 80% 0 / 100% 0 100% 0;

  }
  .border-image-3 {
    margin-left: 10px;
    border-radius: 0 100% 0 100% / 0 50% 0 50%;
  }

  .trans-home-quality-info {
    margin-top: 20px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    &__item {
      &-title {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 600;
        font-size: 40px;
        line-height: 72px;
        color: #1E201D;
		text-align: center;
      }
      &-detail {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #1E201D;
		text-align: center;
      }
    }
  }
}

@media all and (min-width: 576px) and (max-width: 992px) {
  .trans-home-quality-info__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 1500px) {

  .trans-title-text-second {
    font-size: 36px !important;
    line-height: 56px !important;
  }

  .trans-title-text-first {
    font-size: 36px !important;
    line-height: 56px !important;
  }
  .trans-home-quality-info-wrapper {
    .trans-home-quality-info {
      &__item {
        &-title {
          font-size: 46px !important;
          line-height: 54px !important;
        }
        &-detail {
          font-size: 26px !important;
          line-height: 34px !important;
        }
      }
    }
  }
}
</style>

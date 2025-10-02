<template>
  <div>
    <div
      class="trans-home-marina-wrapper"
      :style="`no-repeat center center; background-size: 100% auto;`"
    >
      <a-row :gutter="[32, 32]" type="flex">
        <a-col
          class="d-flex align-items-center"
          :xs="{ span: 24 }"
          :lg="{ span: 12 }"
        >
          <div
            v-scroll-reveal.reset="{
              duration: 1000,
              distance: '20%',
              origin: 'bottom',
              opacity: 0,
              delay: 0,
            }"
            class="d-flex flex-column align-items-center"
          >
            <div>
              <img src="~/assets/images/common/nell-icon.png" />
            </div>
            <div class="trans-marina-title">
              {{ marinaConfig.title1[currentLocale] }}
            </div>
            <div class="trans-marina-by">
              {{ marinaConfig.title2[currentLocale] }}
            </div>
            <div class="trans-marina-subtitle">
              {{ marinaConfig.subtitle[currentLocale] }}
            </div>
            <div
              class="trans-description-text text-center"
              v-html="marinaConfig.content[currentLocale]"
            ></div>
            <div class="d-flex justify-content-center">
              <nuxt-link
                :to="getLocalePath(marinaConfig.buttonLink)"
                class="trans-marina-explore-button"
              >
                {{ marinaConfig.buttonTitle[currentLocale] }}
              </nuxt-link>
            </div>
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
                v-scroll-reveal.reset="{
                  duration: 1000,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                }"
                class="home-marina-border-image-1 marina-image-1"
                :src="`${baseUrl}/${marinaConfig.image1}`"
              />
            </a-col>
            <a-col span="14">
              <img
                v-scroll-reveal.reset="{
                  duration: 1250,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                }"
                class="marina-image-2"
                :src="`${baseUrl}/${marinaConfig.image2}`"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12" class="d-flex flex-column align-items-end">
              <img
                v-scroll-reveal.reset="{
                  duration: 1500,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                }"
                class="marina-image-3"
                :src="`${baseUrl}/${marinaConfig.image3}`"
              />
              <img
                v-scroll-reveal.reset="{
                  duration: 1500,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                }"
                class="marina-image-4"
                :src="`${baseUrl}/${marinaConfig.image4}`"
              />
            </a-col>
            <a-col span="12">
              <img
                v-scroll-reveal.reset="{
                  duration: 2000,
                  distance: '20%',
                  origin: 'right',
                  opacity: 0,
                  delay: 0,
                }"
                class="home-marina-border-image-2 marina-image-5"
                :src="`${baseUrl}/${marinaConfig.image5}`"
              />
            </a-col>
          </a-row>
          ≈
        </a-col>
      </a-row>
    </div>
    <div class="trans-marina-bottom" />
  </div>
</template>

<script>
export default {
  props: ["homeConfig"],

  components: {},

  computed: {
    marinaConfig() {
      return this.homeConfig.services && this.homeConfig.services.section1
        ? this.homeConfig.services.section1
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

<style lang="scss">
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
    height: 26.66vw !important;
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

  .trans-marina-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 32px !important;
    line-height: 46px !important;
    color: #e4c09f;
  }

  .trans-marina-by {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px !important;
    line-height: 28px !important;
    color: #e4c09f;
  }

  .trans-marina-subtitle {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 32px !important;
    line-height: 48px !important;
    color: #e4c09f;
  }

  .trans-home-marina-wrapper {
    padding: 0em 1vw 0 3vw;
  }

  .trans-description-text {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px !important;
    line-height: 24px !important;
    color: #1E201D;
    margin-top: 20px !important;
    margin-right: 2vw !important;
    text-align: center !important;
  }

  .trans-marina-explore-button {
    padding: 12px 32px;
    background: #e4c09f;
    backdrop-filter: blur(300px);
    border-radius: 0px 24px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #1E201D;
    width: fit-content;
    margin-top: 40px;
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

.trans-marina-title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 72px;
  color: #e4c09f;
}

.trans-marina-by {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 32px;
  color: #e4c09f;
}

.trans-marina-subtitle {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 56px;
  color: #e4c09f;
}

.trans-home-marina-wrapper {
  padding: 4em 1vw 0 3vw;
  background: url(~/assets/images/home/marina/image-6.jpg);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -199px;
    width: 200px;
    height: 90%;
    background: #e4c09f;
    filter: blur(160px);
  }
}

.trans-description-text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #1E201D;
  margin-top: 30px;
  text-align: center;
}

.trans-marina-explore-button {
  padding: 12px 32px;
  background: #e4c09f;
  backdrop-filter: blur(300px);
  border-radius: 0px 24px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #1E201D;
  width: fit-content;
  margin-top: 40px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ffffff !important;
  }
}
</style>

<template>
  <div class="trans-home-welcome">
    <a-row type="flex" :gutter="[30, 16]" class="my-0 py-0">
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <div
                class="
            trans-home-welcome-left
            h-100
            d-flex
            flex-column
            justify-content-center
          "
                style="align-items:center !important;"
        >
          <div class="trans-title-text-first quote">{{ welcomeTopConfig.title1[currentLocale] }}</div>
          <div class="trans-title-text-second quote">{{ welcomeTopConfig.title2[currentLocale] }}</div>
          <div class="trans-description-text quote" v-html="welcomeTopConfig.content[currentLocale]"></div>
          <nuxt-link
                  class="trans-welcome-explore-button"
                  :to="getLocalePath(welcomeTopConfig.buttonLink)"
          >{{ welcomeTopConfig.buttonTitle[currentLocale] }}</nuxt-link
          >
        </div>
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" style="padding: 0px 15px !important;">
        <div class="d-flex trans-home-welcome-right" >
          <div>
            <img
                    class="custom-image-1 welcome-image-1"
                    :src="`${baseUrl}/${welcomeTopConfig.image1}`"
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
          <div>
            <img
                    v-scroll-reveal.reset="{
                duration: 1000,
                distance: '20%',
                origin: 'right',
                opacity: 0,
                delay: 0,
              }"
                    :src="`${baseUrl}/${welcomeTopConfig.image2}`"
                    class="custom-image-2 welcome-image-2"
                    alt=""
            />
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
      welcomeTopConfig() {
        return this.homeConfig.welcome && this.homeConfig.welcome.top
                ? this.homeConfig.welcome.top
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

  .trans-home-welcome {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    &-left {
      padding-left: 4vw;
      transform: translateY(-10%);
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      .custom-image-1 {
        border-radius: 0 0 0 100% / 0 0 0 50%;
      }
      .custom-image-2 {
        border-radius: 0 0 0 0 / 0 0 0 0;
      }
    }
  }

  .welcome-image-1 {
    height: 38vw;
    width: 100%;
    object-fit: cover;
  }

  .welcome-image-2 {
    height: 38vw;
    width: 100%;
    object-fit: cover;
  }

  .trans-title-text-second {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 70px;
    background: #1E201D;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .trans-title-text-first {
    margin-top: 2rem;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
    background: #1E201D;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    padding:50px 0 0 0;
  }

  .trans-description-text {
    font-family: "Montserrat";
    font-style: normal;
    font-size: 18px;
    line-height: 28px;
    color: #1E201D;
    margin-top: 40px;
    text-align: center;
  }

  .trans-welcome-explore-button {
    padding: 12px 32px;
    background: #1E201D;
    backdrop-filter: blur(300px);
    border-radius: 0px 24px;
    font-family: "Montserrat";
    font-style: normal;
    font-size: 18px;
    line-height: 28px;
    color: #d9d9d9 !important;
    width: fit-content;
    margin-top: 40px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #ffffff !important;
    }
    @media all and (min-width: 576px) and (max-width: 992px) {
      margin-left: auto !important;
      margin-right: auto !important;
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
    .trans-description-text {
      font-size: 24px !important;
      line-height: 34px !important;
    }
  }


  @media all and (min-width: 1000px) and (max-width: 1080px) {

    .trans-title-text-second {
      font-size: 30px!important;
      line-height: 30px!important;
    }

    .trans-title-text-first {
      font-size: 30px!important;
      line-height: 30px!important;
    }

    .trans-description-text {
      font-size: 16px!important;
      line-height: 26px!important;
    }

  }


  @media screen and (max-width: 992px) {
    .welcome-image-1 {
      height: 80vw !important;
      width: 100%;
      object-fit: cover;
    }

    .welcome-image-2 {
      height: 80vw !important;
      width: 100%;
      object-fit: cover;
    }

    .trans-home-welcome {
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      margin-right: 2vw;
      padding-top: 100px;
    }

    .trans-title-text-second {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 32px !important;
      line-height: 48px;
      background: #1E201D;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-align: center;
    }

    .trans-title-text-first {
      margin-top: 2rem;
      padding-top: 30px;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 32px !important;
      line-height: 48px;
      background: #1E201D;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-align: center;
    }

    .trans-description-text {
      font-family: "Montserrat";
      font-style: normal;
      font-size: 14px;
      line-height: 20px;
      color: #1E201D;
      margin-top: 40px;
      margin-right: 20px;
      text-align: center;
    }

    .trans-welcome-explore-button {
      margin: 40px 0 0 0 !important;
      align-items: center;
    }
  }

</style>

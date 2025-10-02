<template>
  <div class="trans-home-service-wrapper">
    <a-row :gutter="[16, 16]" type="flex">
      <a-col
        class="d-lg-flex justify-content-lg-center flex-lg-column"
        :xs="{ span: 24 }"
        :lg="{ span: 10 }"
        v-scroll-reveal.reset="{
          duration: 1000,
          distance: '20%',
          origin: 'bottom',
          opacity: 0,
          delay: 0,
        }"
      >
        <div class="trans-title-text-first">
          {{ serviceConfig.title1[currentLocale] }}
        </div>
        <div class="trans-title-text-second">
          {{ serviceConfig.title2[currentLocale] }}
        </div>
        <div class="position-relative">
          <div
            class="trans-description-text"
            v-html="serviceConfig.content[currentLocale]"
          ></div>
          <img
            class="trans-home-service-overlay-1"
            src="~/assets/images/home/service/overlay-1.webp"
          />
        </div>
        <div class="d-flex justify-content-center justify-content-lg-start">
          <nuxt-link
            :to="getLocalePath(serviceConfig.buttonLink)"
            class="trans-service-explore-button"
          >
            {{ serviceConfig.buttonTitle[currentLocale] }}
          </nuxt-link>
        </div>
      </a-col>
      <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 12, offset: 2 }">
        <div class="d-flex justify-content-end position-relative">
          <img
            class="trans-home-service-overlay-2"
            src="~/assets/images/home/service/overlay-2.webp"
          />
          <img
            v-scroll-reveal.reset="{
              duration: 1000,
              distance: '20%',
              origin: 'right',
              opacity: 0,
              delay: 0,
            }"
            class="home-sevice-border-image-1"
            :src="`${baseUrl}/${serviceConfig.image}`"
          />
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
    serviceConfig() {
      return this.homeConfig.services && this.homeConfig.services.section2
        ? this.homeConfig.services.section2
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
.home-sevice-border-image-1 {
  border-radius: 40% 0 0 0 /30% 0 0 0;
  height: 66.25vw;
  width: 100%;
  object-fit: cover;
}

.trans-home-service-overlay-1 {
  position: absolute;
  top: 0;
  left: -2vw;
  transform: translateY(-25%);
  z-index: -1;
}

.trans-home-service-overlay-2 {
  position: absolute;
  top: -10%;
  left: -25%;
}

@media screen and (max-width: 992px) {
  .home-sevice-border-image-1 {
    height: 156vw !important;
    width: 100%;
    object-fit: cover;
  }

  .trans-home-service-wrapper {
    padding: 0 2vw !important;
  }

  // .trans-title-text-second {
  //   font-size: 32px !important;
  //   line-height: 48px !important;
  //   text-align: center !important;
  // }

  // .trans-title-text-first {
  //   font-size: 32px !important;
  //   line-height: 48px !important;
  //   text-align: center !important;
  // }

  .trans-description-text {
    font-size: 14px !important;
    text-align: center !important;
  }

  .trans-service-explore-button {
    margin-bottom: 40px !important;
  }
}

.trans-home-service-wrapper {
  padding-left: 1vw;
}

// .trans-title-text-second {
//   font-family: "Montserrat";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 48px;
//   line-height: 70px;
//   background: linear-gradient(
//     181.28deg,
//     #435864 0%,
//     #435864 20.83%,
//     #f5ca97 77.08%,
//     #f0ece8 100%
//   );
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
//   text-fill-color: transparent;
// }

// .trans-title-text-first {
//   font-family: "Montserrat";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 48px;
//   line-height: 56px;
//   background: linear-gradient(
//     181.28deg,
//     #435864 0%,
//     #435864 20.83%,
//     #f5ca97 77.08%,
//     #f0ece8 100%
//   );
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
//   text-fill-color: transparent;
// }

.trans-description-text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 25px;
  text-align: left;
}

.trans-service-explore-button {
  padding: 12px 32px;
  background: #e4c09f;
  backdrop-filter: blur(300px);
  border-radius: 0px 24px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
  width: fit-content;
  margin-top: 40px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ffffff !important;
  }
}
</style>

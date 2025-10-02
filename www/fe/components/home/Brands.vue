<template>
  <div class="trans-home-brands-wrapper">
    <div class="trans-home-brands-title w-100 text-center quote">{{ brandsConfig.title[currentLocale] }}</div>
    <div class="d-flex justify-content-center mt-4 mb-5">
      <div class="trans-home-brands-description text-center quote" v-html="brandsConfig.content[currentLocale]"></div>
    </div>

    <div>
      <a-row v-if="brands && brands.length > 0">
        <a-col
          v-for="(brand, index) in brands"
          :key="index"
          v-scroll-reveal="{
            duration: 800,
            distance: '20%',
            origin: index % 2 == 0 ? 'left' : 'right',
            opacity: 1,
            delay: 0,
            reset: false
          }"
          :xs="{ span: 24 }"
          :lg="{
            span: index + 1 === brands.length && index % 2 === 0 ? 24 : 12,
          }"
        >
          <nuxt-link
            class="w-100 trans-home-brands-image"
            :to="localePath(`/brands/${brand.slug}`)"
          >
            <img
              class="w-100 trans-home-brands-background"
              :src="`${baseUrl}/${brand.image}`"
            />
            <div class="trans-home-brands-logo">
              <img :src="`${baseUrl}/${brand.logo}`" />
              <div
                class=""
                v-html="brand.content[currentLocale]"
              ></div>
            </div>
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["homeConfig", "brands"],

  components: {},

  computed: {
    brandsConfig() {
      return this.homeConfig.brands || {};
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
@media screen and (max-width: 992px) {
  .trans-home-brands-logo {
    font-size: 14px !important;
    line-height: 20px !important;
    img {
      max-width: 50% !important;
      opacity: 1 !important;
    }
    div {
      width: 50%;
      text-align: center;
      visibility: hidden;
    }
  }

  .trans-home-brands-title {
    font-size: 32px !important;
    line-height: 48px !important;
  }
  .trans-home-brands-description {
    font-size: 14px !important;
    line-height: 24px !important;
    width: 90% !important;
  }
  .trans-home-brands-image {
    &:hover {
      .trans-home-brands-logo {
        div {
          display: none !important;
          opacity: 1;
        }
      }
    }
  }
}

.trans-home-brands-logo {
  position: absolute;
  z-index: 1;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    width: 50%;
    text-align: center;
    transition: opacity 1s ease-in;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }
  img {
    max-width: 40%;
    opacity: 0;
/*
    transition: all 0.3s;
*/
  }
}

.trans-home-brands-image {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    .trans-home-brands-background {
      transition: all 0.3s;
      filter: blur(17px);
    }
    .trans-home-brands-logo {
      div {
        display: block;
        opacity: 1;
        height: auto;
      }
      img {
        max-width: 40%;
        opacity: 1;
        transition: all 1.5s ease-in-out;
      }
    }
  }
}

.trans-home-brands-wrapper {
  margin-top: 80px;
}
.trans-home-brands-title {
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
}
.trans-home-brands-description {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.12px;
  color: #1E201D;
  width: 75%;
}
</style>
>

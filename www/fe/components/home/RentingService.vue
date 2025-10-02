<template>
  <div class="position-relative trans-home-renting-wrapper">
    <div class="trans-home-renting-background">
      <img
        class="renting-service-image"
        :src="`${baseUrl}/${rentingConfig.image}`"
      />
    </div>

    <div
      v-scroll-reveal.reset="{ duration: 1200, opacity: 0, delay: 0 }"
      class="trans-home-rentin-overlay"
    />
    <div
      v-scroll-reveal.reset="{
        duration: 2000,
        distance: '20%',
        origin: 'bottom',
        opacity: 0,
        delay: 0,
      }"
      class="trans-home-renting-content"
    >
      <div class="">
        <div
          class="trans-description-text"
          v-html="rentingConfig.content[currentLocale]"
        ></div>
        <div class="d-flex justify-content-center justify-content-lg-start">
          <nuxt-link
            :to="getLocalePath(rentingConfig.buttonLink)"
            class="trans-renting-service-explore-button"
          >
            {{ rentingConfig.buttonTitle[currentLocale] }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["homeConfig"],

  components: {},

  computed: {
    rentingConfig() {
      return this.homeConfig.services && this.homeConfig.services.section3
        ? this.homeConfig.services.section3
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
  .renting-service-image {
    width: 100%;
    object-fit: cover;
    height: 192vw !important;
  }

  .trans-home-renting-content {
    padding-left: 0 !important;
    width: 100% !important;
  }

  .trans-title-text-first {
    font-size: 32px !important;
    line-height: 48px !important;
  }

  .trans-description-text {
    font-size: 14px !important;
    line-height: 24px !important;
    text-align: center !important;
  }
}

.renting-service-image {
  width: 100%;
  object-fit: cover;
  height: 62.5vw;
}

.trans-home-rentin-overlay {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: #1E201D;
}

.trans-home-renting-wrapper {
  display: flex;
  align-items: center;
  background: #132224b2;
}

.trans-home-renting-background {
  width: 100%;
  img {
    width: 100%;
  }
}

.trans-home-renting-content {
  padding-left: 1vw;
  position: absolute;
  z-index: 2;
  width: 50%;
}

.trans-title-text-first {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 64px;
  line-height: 72px;
  color: #1E201D;
}

.trans-description-text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #1E201D;
  margin-top: 25px;
  text-align: left;
}

.trans-renting-service-explore-button {
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

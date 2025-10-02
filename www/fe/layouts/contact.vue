<template>
  <div class="trans-app">
    <Header />
    <!-- <div class="trans-divider" /> -->
    <Nuxt />
    <FloatButtons />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'

import Footer from '~/components/common/Footer.vue'
import Header from '~/components/common/Header.vue'
import FloatButtons from '~/components/common/FloatButtons.vue'

export default {
  head() {
    return {
      ...(
        this.commonConfig && this.commonConfig.seo ? {
          title: this.commonConfig.seo.title[this.currentLocale],
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.commonConfig.seo.description[this.currentLocale],
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.commonConfig.seo.keyword[this.currentLocale],
            },
          ],
        } : {}
      ),
      link: [{ rel: "icon", type: "image/x-icon", href: this.commonConfig.faviconImage ? `${this.baseUrl}/${this.commonConfig.faviconImage}` : "/favicon.ico" }],
    };
  },

  components: {
    Footer,
    Header,
    FloatButtons,
  },

  data() {
    return {
      baseUrl: process.env.baseUrl,
    };
  },

  computed: {
    commonConfig() {
      return this.$store.state.configs.common || {};
    },

    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },

  mounted () {

  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>

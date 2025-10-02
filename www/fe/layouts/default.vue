<template>
  <div class="trans-app">
    <Header />
    <!-- <div class="trans-divider" /> -->
    <Nuxt />
    <StayConnected />
    <FloatButtons />
    <Footer />
  </div>
</template>

<script>
import Vue from "vue";

import Footer from "~/components/common/Footer.vue";
import Header from "~/components/common/Header.vue";
import StayConnected from "~/components/common/StayConnected.vue";
import FloatButtons from "~/components/common/FloatButtons.vue";

export default {
/*
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
      link: [{ rel: "icon", type: "image/x-icon", href: "https://tamsonyachting.com/favicon.ico" }],

            script: [{src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8398843657531156', defer: true, crossorigin: "anonymous"}]
    };
  },
*/

  head() {
    const links = [
      { rel: "manifest", href: "/site.webmanifest"},
      { rel: "mask-icon", href: "/safari-pinned-tab.svg",color:"#5bbad5"},
      { rel: "icon", type: "image/png", href: "/favicon-16x16.png", size:"16x16" },
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", size:"32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes:"180x180" }
    ];

    const commonConfigSEO = this.commonConfig && this.commonConfig.seo;

    return {
      ...(commonConfigSEO ? {
        title: commonConfigSEO.title[this.currentLocale],
        meta: [
          {
            hid: "description",
            name: "description",
            content: commonConfigSEO.description[this.currentLocale],
          },
          {
            hid: "keywords",
            name: "keywords",
            content: commonConfigSEO.keyword[this.currentLocale],
          },
        ],
      } : {}),
      link: links,
      script: [{src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8398843657531156', defer: true, crossorigin: "anonymous"}]
    };
  },


  components: {
    Footer,
    Header,
    StayConnected,
    FloatButtons,
  },

  data() {
    return {
      baseUrl: process.env.baseUrl,
    };
  },

  computed: {
    commonConfig() {
      console.log(this.$store.state.configs.common.faviconImage)
      return this.$store.state.configs.common || {};
    },

    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },

  mounted() {},
};
</script>

<style lang="scss">
  @import "~/assets/scss/layouts/_default.scss";
</style>

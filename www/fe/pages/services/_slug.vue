<template>
  <div class="trans-service-wrapper">
    <ServiceType1 v-if="serviceData && serviceData._id && serviceData.type == 1" :serviceData="serviceData" :homeConfig="homeConfig" />
    <ServiceType2 v-else-if="serviceData && serviceData._id && serviceData.type == 2" :serviceData="serviceData" />
    <ServiceType3 v-else-if="serviceData && serviceData._id && serviceData.type == 3" :serviceData="serviceData" />
  </div>
</template>

<script>
  import ServiceType1 from '~/components/services/Type1.vue'
  import ServiceType2 from '~/components/services/Type2.vue'
  import ServiceType3 from '~/components/services/Type3.vue'

  export default {
    head() {
      return this.serviceData && this.serviceData.seo ? {
        title: this.serviceData.seo.title[this.currentLocale],
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.serviceData.seo.description[this.currentLocale],
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.serviceData.seo.keyword[this.currentLocale],
          },
        ],
      } : {};
    },

    layout: "default",

    components: {
      ServiceType1,
      ServiceType2,
      ServiceType3,
    },

    computed: {
      currentLocale() {
        return (this.$i18n.locale || "").toLowerCase();
      },
    },

    data() {
      return {
        baseUrl: process.env.baseUrl,
      };
    },

    async asyncData({ query, params, $axios }) {
      try {
        const { slug } = params;
        const serviceData = await $axios.$get(`/frontend/services/${slug}`);
        const homeConfig = await $axios.$get(`/frontend/configs/home`);
        return {
          serviceData: (serviceData && serviceData.data) || null,
          homeConfig: (homeConfig && homeConfig.data) || null,
        };
      } catch (error) {
        console.error('error', error);
      }

    },
  };
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="trans-footer-wrapper">
    <div>
      <a-row type="flex">
        <a-col :xs="{ span: 24 }" :lg="{ span: 6 }" style="padding-top: 8%">
          <div class="d-flex flex-column items-center mx-auto">
            <img
              class="trans-footer-logo"
              v-if="footerConfig.logo"
              :src="`${baseUrl}/${footerConfig.logo}`"
            />
            <div>
              <a
                      v-if="footerConfig.phoneNumber"
                      :href="`tel:${footerConfig.phoneNumber}`"
                      class="trans-footer-detail"
              >
                {{ footerConfig.phoneNumber || "" }}
              </a>
            </div>
            <div>
              <a
                      v-if="footerConfig.email"
                      :href="`mailto:${footerConfig.email}`"
                      class="trans-footer-detail"
              >
                {{ footerConfig.email || "" }}
              </a>
            </div>
          </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 6 }" style="padding-top: 8%">
          <div class="d-flex flex-column items-center mx-auto">
            <div class="trans-footer-title">{{ $t("header.brands") }}</div>
            <div v-if="brandMenuData && brandMenuData.length > 0">
              <nuxt-link
                v-for="(brand, index) in brandMenuData"
                :key="index"
                :to="localePath(`/brands/${brand.slug}`)"
                class="trans-footer-detail"
              >
                {{ brand.name }}
              </nuxt-link>
          </div>
          </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 6 }" style="padding-top: 8%">
          <div class="d-flex flex-column items-center mx-auto">
            <div class="trans-footer-title">{{ $t("footer.info") }}</div>
            <nuxt-link
              :to="localePath(`/about-us`)"
              class="trans-footer-detail"
            >
              {{ $t("header.aboutUs") }}
            </nuxt-link>
            <nuxt-link
              v-for="(service, index) in serviceMenuData"
              :key="index"
              :to="localePath(`/services/${service.slug}`)"
              class="trans-footer-detail"
              >{{ service.name[currentLocale] }}</nuxt-link
            >
            <nuxt-link :to="localePath(`/news`)" class="trans-footer-detail">
              {{ $t("header.news") }}
            </nuxt-link>
            <nuxt-link
              :to="localePath(`/contact-us`)"
              class="trans-footer-detail"
            >
              {{ $t("header.contact") }}
            </nuxt-link>
          </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 6 }" style="padding-top: 8%">
          <div class="d-flex flex-column items-center mx-auto">
            <div class="d-flex align-items-center">
              <img
                class="trans-footer-icon"
                src="~/assets/images/footer/location-icon.png"
                alt="Location"
              />
              <div class="trans-footer-detail" style="margin: 0">
                {{ footerConfig.location || "" }}
              </div> 
            </div>
			<div style="padding: 10px"></div>
			<div class="d-flex align-items-center">
              <img
                class="trans-footer-icon"
                src="~/assets/images/footer/location-icon.png"
                alt="Location 2"
              />
              <div class="trans-footer-detail" style="margin: 0">
                {{ footerConfig.location2 || "" }}
              </div>
			  
            </div>
          </div>
          <div style="padding: 10px"></div>
          <div class="d-flex items-center mx-auto trans-footer-social">
            <nuxt-link :to="localePath(`/`)">
              <img
                      class="trans-footer-icon"
                      src="~/assets/images/header/home-icon.png"
                      alt="Home"
              />
            </nuxt-link>
            <a :href="footerConfig.facebookLink" target="_blank">
              <img
                      class="trans-footer-icon"
                      src="~/assets/images/header/facebook-icon.png"
                      alt="Facebook"
              />
            </a>
            <a :href="footerConfig.youtubeLink" target="_blank">
              <img
                      class="trans-footer-icon"
                      src="~/assets/images/header/youtube-icon.png"
                      alt="Youtube"
              />
            </a>
            <a :href="footerConfig.instagramLink" target="_blank">
              <img
                      class="trans-footer-icon"
                      src="~/assets/images/header/instagram-icon.png"
                      alt="Instagram"
              />
            </a>
            <change-language />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>  
</template>

<script>
import ChangeLanguage from "./ChangeLanguage.vue";
export default {
  components: { ChangeLanguage },
  data() {
    return {
      baseUrl: process.env.baseUrl,
    };
  },

  computed: {
    brandMenuData() {
      return this.$store.state.brandMenuData || [];
    },

    footerConfig() {
      return this.$store.state.configs.footer || {};
    },

    serviceMenuData() {
      return this.$store.state.serviceMenuData || [];
    },

    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/_footer.scss";
</style>

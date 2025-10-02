<template>
  <div class="services">
    <div class="title">
      <p>{{ serviceData.name[currentLocale] }}</p>
    </div>
    <div class="banner">
      <img class="w-100" :src="`${baseUrl}/${serviceData.image}`" />
    </div>
    <div class="services">
      <div class="services-detail">
        <div class="service-title">{{ $t("services.service") }}</div>
        <div class="service-list" v-if="serviceData.services && serviceData.services.length > 0">
          <div class="service-item" v-for="(service, index) in serviceData.services" :key="index">
            <img :src="`${baseUrl}/${service.image}`" @error="imageServiceDefault" />
            <h3>{{ service.title[currentLocale] }}</h3>
			      <div v-html="service.content[currentLocale]"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 60px;">
      <!-- <a-row :gutter="[16, 16]" type="flex">
	  	<a-col class="d-lg-flex justify-content-lg-center flex-lg-column" :xs="{ span: 24 }" :lg="{ span: 10 }">
          <div class="position-relative">
			<div class="service-head-text">Yacht Service Center By Tam Son Yachting</div>
            <div class="service-description-text">To strive for a professional One-stop Shop, Tam Son Yachting is pleased to launch our very first YACHT SERVICE CENTER at 244 Bui Van Ba, Tan Thuan Dong, District 7, Ho Chi Minh City in 2019. With well-trained technicians and foreign experts from the world’s leading brands, we are confident to bring you the professional and attentive services to ensure that your yachts are always in the best condition. We provide all technical services of annual maintenance, yacht repair and operating for all type of boats and yachts up to 100 ft in length.</div>
          </div>
        </a-col>
        <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 12, offset: 2 }">
          <div class="d-flex justify-content-end position-relative">
            <img class="service-border-image-1" src="~/assets/images/services/frame-92.jpg"/>
          </div>
        </a-col>
      </a-row> -->

      <a-row type="flex" :gutter="[30, 16]" class="my-0 py-0">
        <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
          <div
            v-scroll-reveal="{
            duration: 2000,
            distance: '100%',
            origin: 'bottom',
            opacity: 0,
            delay: 0,
            reset: false
          }"
                  class="
            h-100
            d-flex
            flex-column
            justify-content-center
          "
                  style="
		  align-items:center !important;
		  "
          >
            <div class="service-head-text">{{ serviceData.title[currentLocale] }}</div>

            <div class="service-description-text" v-html="serviceData.content[currentLocale]"></div>

          </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" style="padding: 0px 15px !important;">
          <div class="d-flex justify-content-end position-relative" >
            <img class="service-border-image-1" :src="`${baseUrl}/${serviceData.servicesHeadImage}`"/>
          </div>
        </a-col>
      </a-row>


    </div>
  </div>
</template>

<script>
export default {
  props: ["serviceData"],

  components: {},

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

  methods: {
    imageServiceDefault (event) {
      event.target.src = "~/assets/images/services/layer.png";
    }
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_services.scss";

.service-description-text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
  padding: 0 24px;
  text-align: center;
  display: block;
  justify-content: center;
}
.service-head-text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  color: #000000;
  margin-top: 25px;
  padding: 0 24px;
  display: flex;
  text-align: center;
  justify-content: center;
}
.service-border-image-1 {
  height: 35vw;
  width: 100%;
  object-fit: cover;
}
</style>

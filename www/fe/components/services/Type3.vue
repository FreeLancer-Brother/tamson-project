<template>
  <div class="charter">
    <div class="title">
      <p>{{ serviceData.name[currentLocale] }}</p>
    </div>
    <div class="banner position-relative">
      <img class="d-lg-block w-100" :src="`${baseUrl}/${serviceData.image}`" />
      <!-- <div class="main-content"> -->
        <!-- <iframe src="https://amzsocial.com/charter.pdf#toolbar=0" width="100%" height="500px"></iframe> -->
      <!-- </div> -->
    </div>
    <div class="description text-center mt-5" v-html="serviceData.content[currentLocale]"></div>

    <div class="products-wrapper mt-4" v-if="serviceData.products && serviceData.products.length > 0">
      <div class="product mt-2 mb-5" v-for="(product, index) in serviceData.products" :key="index">
        <a-row class="inner d-flex flex-wrap">
          <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="content item d-flex align-items-center">
            <div class="caption">
              <h2 class="tend mb-1">
                {{ product.name[currentLocale] }}
              </h2>
              <div class="product-info">
                <ul class="product-spec">
                  <li v-if="product.length">
                    <span class="tend">{{ $t('services.products.length') }}</span>
                    <span><img class="ico-yacht" src="~/assets/images/icons/ico-yacht.png" /> {{ product.length }}</span>
                  </li>
                  <li v-if="product.year">
                    <span class="tend">{{ $t('services.products.year') }}</span>
                    <span><img class="ico-calendar" src="~/assets/images/icons/ico-calendar.png" /> {{ product.year }}</span>
                  </li>
                  <li v-if="product.cabin">
                    <span class="tend">{{ $t('services.products.cabin') }}</span>
                    <span><img class="ico-cabin" src="~/assets/images/icons/ico-cabin.png" /> {{ product.cabin }}</span>
                  </li>
                </ul>
                <div class="product-des">
                  <span>{{ $t('services.products.description') }}:</span>
                  <div v-html="product.content[currentLocale]"></div>
                </div>
                <div class="product-area">
                  <span>{{ $t('services.products.area') }}:</span> {{ product.area }}
                </div>
                <div class="product-price">
                  <span>{{ $t('services.products.price') }}:</span> {{ product.price }}
                </div>
              </div>
            </div>
          </a-col>
          <a-col :xs="{ span: 24 }" :lg="{ span: 12 }"  class="item">
            <div :class="`img-wrap show-type-${product.show}`">
              <a-row>
                <a-col span="12">
                  <div class="d-flex flex-column">
                    <img class="w-100 border-image-1 product-image-1" :src="`${baseUrl}/${product.image1}`" alt=""
                      v-scroll-reveal="{
                                  duration: 3000,
                                  distance: '100%',
                                  origin: 'right',
                                  opacity: 0,
                                  delay: 0,
                                  reset: false,
                      }"
                    />
                    <img class="w-100 border-image-2 product-image-2" :src="`${baseUrl}/${product.image2}`" alt=""
                      v-scroll-reveal="{
                                  duration: 3000,
                                  distance: '100%',
                                  origin: 'right',
                                  opacity: 0,
                                  delay: 0,
                                  reset: false,
                      }"
                    />
                  </div>
                </a-col>
                <a-col span="12">
                  <div>
                    <img class="w-100 border-image-3 product-image-3" :src="`${baseUrl}/${product.image3}`" alt=""
                      v-scroll-reveal="{
                                  duration: 3000,
                                  distance: '100%',
                                  origin: 'right',
                                  opacity: 0,
                                  delay: 0,
                                  reset: false,
                      }"
                    />
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="description text-center mt-4" v-html="serviceData.content2[currentLocale]"></div>

    <div class="slide-wrapper mt-5">
      <div class="section-title text-center mb-4">
        <p>{{ $t('services.ourGallery') }}</p>
      </div>
      <slick class="slide" ref="slick" :options="slickOptions"
        v-if="serviceData.galleries && serviceData.galleries.length > 0">
        <div class="slide-content" v-for="(gallery, index) in serviceData.galleries" :key="index">
          <img class="w-100" :src="`${baseUrl}/${gallery}`" />
        </div>
      </slick>
      <div class="slide-prev" @click="prev">
        <img src="~/assets/images/about-us/slide-prev.svg" />
      </div>
      <div class="slide-next" @click="next">
        <img src="~/assets/images/about-us/slide-next.svg" />
      </div>
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
      slickOptions: {
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: "18em",
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false
            }
          }
        ]
      },
    };
  },

  methods: {
    next() {
      if (this.$refs.slick) this.$refs.slick.next();
    },

    prev() {
      if (this.$refs.slick) this.$refs.slick.prev();
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_renting.scss";
</style>

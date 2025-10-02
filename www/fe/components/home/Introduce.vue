<template>
  <div class="introduce-container">
    <slick
      v-if="slideBanners && slideBanners.length > 0"
      class="introduce-slide"
      ref="slick"
      :options="slickOptions"
      @afterChange="handleChangeSlide"
    >
      <div v-for="(slideBanner, index) in slideBanners" :key="index">
        <div class="introduce-slide-content" :style="`${slideBanner.image ? `background-image: url(${baseUrl}/${slideBanner.image});` : ''}`">
		
		<div style="pointer-events: none;width: 100%;position: absolute;height: 100%;background-color: #1E201D59;z-index: 100;"></div>
		
			<div v-if="slideBanner.video" class="video" style="pointer-events: none; width: 100%;position: absolute;"><video loop  autoplay="" playsinline  muted name="media" style="height: 100%;width: 100%;"><source :src="`${slideBanner.video ? (baseUrl+'/'+slideBanner.video) : ''  }`" type="video/mp4"></video></div>
          <h3 style="z-index: 101">{{ slideBanner.title[currentLocale] }}</h3> 
          <div
            class="introduce-slide-content-description"
            v-html="slideBanner.subtitle[currentLocale]"
			style="z-index: 101"
          ></div>
          <!--<div class="introduce-slide-content-buttons" style="z-index: 101">
            <nuxt-link :to="getLocalePath(slideBanner.button1Link)">
              {{ slideBanner.button1Title[currentLocale] }}
            </nuxt-link>
            <nuxt-link :to="getLocalePath(slideBanner.button2Link)">
              {{ slideBanner.button2Title[currentLocale] }}
            </nuxt-link>
          </div>-->
        </div>
      </div>   
    </slick>
    <div :style="`${totalSlide <2 ? 'display: none' : ''}`" class="introduce-slide-controls">
      <div class="introduce-slide-controls-prev" @click="prev()">
        <img src="~/assets/images/home/introduce/slide-prev.svg" />
      </div>
      <div class="introduce-slide-controls-page">
        {{ currentSlide + 1 }}/{{ totalSlide }}
      </div>
      <div class="introduce-slide-controls-next" @click="next()">
        <img src="~/assets/images/home/introduce/slide-next.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["homeConfig"],

  components: {},

  computed: {
    slideBanners() {
      return this.homeConfig.headBanner || [];
    },
    totalSlide() {
      return (this.homeConfig.headBanner || []).length;
    },
    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },

  data() {
    return {
      currentSlide: 0,
      slickOptions: {
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
      },
      baseUrl: process.env.baseUrl,
    };
  },

  methods: {
    getLocalePath(path) {
      return path.indexOf("http://") > -1 || path.indexOf("https://") > -1
        ? path
        : this.localePath(path);
    },

    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    handleChangeSlide(_, __, slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalSlide) {
        this.currentSlide = slideIndex;
      }
    },
  },
};
</script>

<style lang="scss">
.introduce-container {
  position: relative;

  .introduce-float-buttons {
    position: absolute;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    a:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .introduce-slide-controls {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #435864;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    backdrop-filter: blur(300px);
    border-radius: 16px 16px 0px 0px;

    .introduce-slide-controls-next,
    .introduce-slide-controls-prev {
      padding: 24px;
      cursor: pointer;
    }

    .introduce-slide-controls-page {
      font-family: "Montserrat";
      font-weight: 400;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
    }
  }

  .introduce-slide {
    .introduce-slide-content {
      height: 100vh;
      widows: 100vw;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      * {
        position: relative;
      }

      &::before {
        content: "";
        width: 60%;
        height: 60%;
        position: absolute;
        background: radial-gradient(
          50% 50% at 50% 50%,
          rgba(62, 90, 105, 0.81) 27.08%,
          rgba(63, 91, 105, 0) 100%
        );
      }

      h3 {
        font-family: "Montserrat";
        font-weight: 600;
        font-size: 48px;
        line-height: 56px;
        color: #ffffff;
        margin-bottom: 16px;
        text-align: center;
      }

      .introduce-slide-content-description {
        font-family: "Montserrat";
        font-size: 26px;
        letter-spacing: 2px;
        line-height: 28px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 0;
		width: 80%;
      }

      .introduce-slide-content-buttons {
        margin-top: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        a {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-sizing: border-box;
          min-width: 15em;
          padding: 12px 20px;
          text-align: center;
          font-family: "Montserrat";
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #ffffff;
          &:hover {
            color: #e4c09f;
          }

          &:first-child {
            border-bottom-left-radius: 24px;
          }

          &:last-child {
            border-top-right-radius: 24px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .introduce-container {
    position: relative;

    .introduce-float-buttons {
      position: absolute;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      a:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    .introduce-slide-controls {
      .introduce-slide-controls-next,
      .introduce-slide-controls-prev {
        padding: 16px;
        cursor: pointer;
      }

      .introduce-slide-controls-page {
        font-family: "Montserrat";
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #ffffff;
      }
    }

    .introduce-slide {
      .introduce-slide-content {
        height: 62vh;
        h3 {
          font-family: "Montserrat";
          font-weight: 400;
          font-size: 24px;
          line-height: 32px;
          color: #ffffff;
          margin-bottom: 16px;
          text-align: center;
        }

        .introduce-slide-content-description {
          font-family: "Montserrat";
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          color: #ffffff;
          margin-bottom: 0;
          width: 80%;
        }

        .introduce-slide-content-buttons {
          margin-top: 40px;
          margin-bottom:20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 95%;
          justify-content: center;
          
          a {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-sizing: border-box;
            width: 100%;
            padding: 14px 5px;
            text-align: center;
            font-family: "Montserrat";
            font-weight: 600;
            font-size: 12px;
            line-height: 24px;
            color: #e4c09f;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

            &:first-child {
              border-bottom-left-radius: 24px;
            }

            &:last-child {
              border-top-right-radius: 24px;
            }
          }
        }
      }
    }
  }
}
</style>

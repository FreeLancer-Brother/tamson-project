<template>
  <div class="trans-yacht-type-wrapper">
    <div v-if="brand && brand._id" class="trans-yacht-type-title">
      {{ brand.name }}
	    <div class="trans-brands-info">
            <div
                class=""
                v-html="brand.content[currentLocale]">
			</div>
        </div>
    </div>
    <a-row
		  type="flex"
		  v-if="brand && brand.yatchTypes && brand.yatchTypes.length > 0"
	  >
      <a-col
        v-for="yatchType in brand.yatchTypes"
        :key="yatchType._id"
        :xs="{ span: 24 }"
        :lg="{ span: 12 }"
        class="trans-yacht-type-column"
      >
        <div class="position-relative">
          <div class="w-100">
            <img class="w-100" :src="`${baseUrl}/${yatchType.image}`"/>
          </div>
          <div class="trans-yacht-type-item">
            <div
              class="
                w-100
                h-100
                position-relative
                trans-yacht-type-item__wrapper
              "
            >
              <nuxt-link class="trans-yacht-type-item__content" :to="localePath(`/yatch-types/${yatchType.slug}`)" >
                <div class="trans-yacht-type-name">
                  {{ yatchType.name[currentLocale] }}
                </div>
                <div class="trans-yacht-type-info"
                  v-html="yatchType.content[currentLocale]"
                ></div>
                <nuxt-link
                  :to="localePath(`/yatch-types/${yatchType.slug}`)"
                  class="trans-yacht-type-explore-button"
                >
                  {{ $t("brands.exploreMore") }}
                </nuxt-link>
              </nuxt-link>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="trans-yacht-type-banner text-center" v-if="brand && (brand.headline || brand.video) && (!brand.yatchTypes || brand.yatchTypes.length == 0)">
      <div style="padding-bottom: 50px">
        <a :href="`${brand.link}`" target="_blank" class="trans-yacht-type-btn" >
          {{ $t("brands.seeMore") }}
        </a>
      </div>
      <div>
        <video v-if="brand.video" loop autoplay="" playsinline muted name="media" style="height: 100%;width: 100%;">
        <source :src="`${brand.video ? (baseUrl+'/'+brand.video) : ''  }`" type="video/mp4">
      </video>
        <img v-if="brand.headline && !brand.video" class="img-fluid" :src="`${baseUrl}/${brand.headline}`" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  layout: "default",

  head() {
    return this.brand && this.brand.seo
      ? {
          title: this.brand.seo.title[this.currentLocale],
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.brand.seo.description[this.currentLocale],
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.brand.seo.keyword[this.currentLocale],
            },
          ],
        }
      : {};
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
    const { slug } = params;
    const brandData = await $axios.$get(`/frontend/brands/${slug}`);
    return { brand: (brandData && brandData.data) || null };
  },
};
</script>

<style lang="scss" scoped>
.trans-yacht-type-column {
  &:hover {
    .trans-yacht-type-explore-button {
      display: block;
    }
    img {
      transform: scale(1.3);
      filter: blur(10px) brightness(50%)!important;
    }
    .trans-yacht-type-item {
      transition: all 0.8s;
      // background-color: #0000003d;
      &__content {
		    width:80%;
        margin: 0;
        position: relative;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
  }
  flex: 50%;
  overflow: hidden;
  img {
    transition: all 0.8s;
    cursor: pointer;
  }
}

.trans-yacht-type-item {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  padding: 30px;
  &__content {
    bottom: 0;
    left: 0;
    position: absolute;
    transition: all 0.8s;
    opacity: 0;
  }
}

.trans-yacht-type-wrapper {
  padding-top: 100px;
  background-color:#000000;
}

.trans-yacht-type-title {
	text-align: center;

  font-family: "Montserrat";
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 5px;
  text-align:center;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  color: #ffffff;
    background-color:#000000;
    background-size: cover;
	padding: 64px 24px 42px;
    background-position: top;
}

.trans-yacht-type-name {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 48px;
  color: #ffffff;
}

.trans-yacht-type-info {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.trans-yacht-type-explore-button {
  padding: 12px 32px;
  background: #ffffff;
  backdrop-filter: blur(300px);
  border-radius: 0px 24px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
  width: fit-content;
  margin-top: 20px;
  display: none;
  transition: all 0.8s;
  cursor: pointer;
}

.trans-brands-info {
  font-family: "Montserrat";
  text-transform: none !important;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  letter-spacing: 2px;
  padding: 0 10% 0 10%;

}

.trans-yacht-type-banner {
  position: relative;

  img {
    width: 100%;
    opacity: 0.5;
  }
}

.trans-yacht-type-btn {
  position: relative;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: #fff;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
}

.trans-yacht-type-btn:hover {
  background-color: #e4c09f;
  color: #fff;
}


.trans-yacht-type-item {
      &:hover
      &__content {
        opacity: 1;
        transition: opacity 3s ease-in-out;
      }
    }

@media screen and (max-width: 1280px) {
.trans-yacht-type-column {
  &:hover {
    .trans-yacht-type-item {
      transition: all 0.5s;
      // background-color: #0000003d;
      &__content {
        width:100%;
        transform: translate(1%, -100%);
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
  }
}
}

@media screen and (max-width: 992px) {
  .trans-yacht-type-column {
    flex: 100% !important;
    overflow: hidden;
    &:hover {
      .trans-yacht-type-item__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .trans-yacht-type-item {
        transition: all 0.5s;
        width: 100%;
        height: 100%;
      }
      .trans-yacht-type-info {
        display: none;
      }
      .trans-yacht-type-name {
        display: none;
      }
      .trans-yacht-type-explore-button {
        font-size: 16px;
        padding: 8px 16px;
      }
    }
    .trans-yacht-type-info {
      ::v-deep p {
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        display: -webkit-box !important;
      }
      ::v-deep p {
        &:nth-child(n + 3) {
          display: none !important;
        }
      }
    }
  }

  .trans-yacht-type-wrapper {
    padding-top: 64px !important;
  }

  .trans-yacht-type-item {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    padding: 30px;
    &__content {
      bottom: 0;
      left: 0;
      position: absolute;
      /*transition: all 0.8s;*/
      opacity: 1;
    }
  }

  .trans-yacht-type-info {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400 !important;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    visibility: hidden;
    position: absolute;
  }

  .trans-yacht-type-title {
    font-size: 24px !important;
    line-height: 32px !important;
  }
  .trans-yacht-type-name {
    font-size: 24px !important;
    line-height: 32px !important;
  }

  .trans-yacht-type-explore-button {
    &:hover {
      padding: 12px 32px;
      background: #e4c09f;
      backdrop-filter: blur(300px);
      border-radius: 0px 24px;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #ffffff;
      width: fit-content;
      margin-top: 20px;
      display: none;
      transition: all 0.8s;
      cursor: pointer;
    }
  }

  .trans-brands-info {
    padding: 0%;
  }
}

</style>

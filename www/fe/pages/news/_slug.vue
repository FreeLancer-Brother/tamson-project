<template>
  <div class="trans-news-detail-wrapper">
    <div v-if="newData" class="w-100 header">
      <div class="trans-news-go-back" @click="handleGoBack">
        {{ "<" }} {{ $t("news.back") }}
      </div>
      <div class="title">
        {{ newData.title[currentLocale] }}
      </div>
      <a-row :gutter="[32, 16]" class="mt-1">
        <a-col :lg="{ span: 16 }">
          <div class="d-flex align-items-center">
            <div class="news-button">
              {{ newData.type.toUpperCase() }}
            </div>
            <div class="news-post-time">
              {{ $t("news.postedIn") }}
              {{ moment(newData.createdAt).format("DD/MM/YYYY") }}
            </div>
          </div>
        </a-col>
        <a-col class="d-none d-lg-flex" :lg="{ span: 8 }">
          <div class="news-relate-post-text">
            {{ $t("news.relatedPosts") }}
          </div>
        </a-col>
      </a-row>
    </div>
    <div v-if="newData" class="main-content">
      <a-row :gutter="[32, 0]">
        <a-col :lg="{ span: 16 }">
          <div>
            <img class="w-100 mb-5" :src="`${baseUrl}/${newData.image}`" />
          </div>
          <div class="content" v-html="newData.content[currentLocale]"></div>
        </a-col>
        <a-col span="24" class="d-lg-none">
          <div class="news-relate-post-text">
            {{ $t("news.relatedPosts") }}
          </div>
        </a-col>
        <a-col :lg="{ span: 8 }">
          <a-row
            v-for="newItem in relatedNews"
            :key="newItem._id"
            :gutter="[16, 16]"
          >
            <a-col span="12">
              <nuxt-link :to="localePath(`/news/${newItem.slug}`)">
                <img class="w-100" :src="`${baseUrl}/${newItem.image}`" />
              </nuxt-link>
            </a-col>
            <a-col span="12">
                <nuxt-link class="news-relate-post-title" :to="localePath(`/news/${newItem.slug}`)">
                  {{ newItem.title[currentLocale] }}
                </nuxt-link>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  head() {
    return this.newData && this.newData.seo ? {
      title: this.newData.seo.title[this.currentLocale],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.newData.seo.description[this.currentLocale],
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.newData.seo.keyword[this.currentLocale],
        },
      ],
    } : {};
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

  methods: {
    moment,
    handleGoBack() {
      this.$router.back();
    },
  },

  async asyncData({ params, $axios }) {
    const { slug } = params;
    const newData = await $axios.$get(`/frontend/news/${slug}`);
    return {
      newData: (newData && newData.data) || null,
      relatedNews: (newData && newData.relatedNews) || [],
    };
  },
};
</script>

<style lang="scss">
.trans-news-detail-wrapper {
  .header {
    padding: 130px 2vw 15px 2vw;
    background-color:#0F0F1E;
    background-size: cover;
    background-position: top;
  }
  .main-content {
    padding: 27px 2vw 27vw 2vw;

    .content {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #000000 !important;

      & * {
        color: #000000 !important;
      }

      figure.image {
        text-align: center;

        img {
          width: 100%;
          display: block;
        }
      }

    }
  }
  .title {
    font-family: "Montserrat";
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    color: #ffffff;
	letter-spacing: 5px;
    margin-top: 15px;
  }
  .news-button {
    cursor: pointer;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 12px;
  }
  .news-post-time {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 20px;
  }
  .news-detail-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #ffffff;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .news-detail-description {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    margin-top: 15px;
  }
  .news-relate-post-text {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.8);
  }
  .news-relate-post-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000;
  }
}
.trans-news-go-back {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  text-decoration-line: underline;
  color: #000000;
}
@media only screen and (max-width: 992px) {
  .trans-news-detail-wrapper {
    .header {
      padding: 80px 2vw 30px 2vw;
    }
    .title {
      font-size: 24px;
      line-height: 32px;
      margin-top: 15px;
	  letter-spacing: 5px;
    }

    .news-relate-post-text {
      margin: 30px 0 20px 0;
    }

    .news-relate-post-title {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>

<template>
  <div class="news">
    <div class="title">
      <p>{{ $t("news.title") }}</p>
    </div>
    <a-row type="flex" :gutter="[24, 24]" class="new-list">
      <a-col
        v-for="newItem in news"
        :key="newItem._id"
        :lg="{ span: 8 }"
        :xs="{ span: 24 }"
      >
        <nuxt-link :to="localePath(`/news/${newItem.slug}`)" class="new-item">
          <div class="new-thumb">
            <div class="new-time">
              {{ moment(newItem.createdAt).format("DD") }}<br />{{
                moment(newItem.createdAt).format("MMM").toUpperCase()
              }}
            </div>
            <img :src="`${baseUrl}/${newItem.image}`" />
          </div>
          <div class="new-detail">
            <h3>{{ newItem.title[currentLocale] }}</h3>
            <p class="new-detail-description">
              {{ newItem.shortContent[currentLocale] }}
            </p>
            <div class="trans-new-button">
              <nuxt-link
                class="new-read-more"
                :to="localePath(`/news/${newItem.slug}`)"
                >{{ $t("news.readMore") }}</nuxt-link
              >
            </div>
            <div class="new-tag-list">
              <a class="new-tag-item" href="#">{{
                newItem.type.toUpperCase()
              }}</a>
            </div>
          </div>
        </nuxt-link>
      </a-col>
    </a-row>
    <div class="pagination">
      <a
        v-for="page in totalPage"
        :key="page"
        :class="`pagination-item ${
          page == currentPage ? 'pagination-active' : ''
        }`"
        :href="page == currentPage ? '#' : localePath(`/news?p=${page}`)"
      >
        {{ page }}
      </a>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  head() {
    return this.newsConfig && this.newsConfig.seo
      ? {
          title: this.newsConfig.seo.title[this.currentLocale],
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.newsConfig.seo.description[this.currentLocale],
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.newsConfig.seo.keyword[this.currentLocale],
            },
          ],
        }
      : {};
  },

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
    moment,
  },

  async asyncData({ query, params, $axios }) {
    const pageSize = 6;
    const page = Number(query.p || 1);
    const newData = await $axios.$get(
      `/frontend/news?page=${page}&pageSize=${pageSize}`
    );
    const newsConfigData = await $axios.$get(`/frontend/configs/news`);
    return {
      news: (newData && newData.data) || [],
      currentPage: page,
      totalPage: Math.ceil(((newData && newData.total) || 0) / pageSize),
      newsConfig: (newsConfigData && newsConfigData.data) || null,
    };
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_news.scss";
</style>

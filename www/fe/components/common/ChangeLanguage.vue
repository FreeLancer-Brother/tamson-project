<template>
  <div class="trans-change-language-wrapper d-flex align-items-center">
    <div class="trans-change-language-title">
      {{ currentLocale }}
    </div>
    <img
      class="trans-change-language-icon"
      src="~/assets/images/common/arrow-down.png"
      alt=""
    />
    <div class="trans-change-language-menu">
      <nuxt-link
        class="trans-change-language-menu-item"
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        >{{ locale.code.toUpperCase() }}</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentLocale() {
      return (this.$i18n.locale || "").toUpperCase();
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
};
</script>

<style lang="scss">
.trans-change-language {
  &-icon {
    width: 10px;
    height: auto;
    margin-left: 8px;
  }
  &-wrapper {
    margin: 0 1vw;
    cursor: pointer;
    position: relative;

    &:hover {
      & .trans-change-language-menu {
        padding: 10px 0;
        height: auto;
        overflow: hidden;
      }
    }
  }
  &-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #ffffff;
  }
  &-menu {
    position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(300px);
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    height: 0;
    overflow: hidden;

    &-item {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
      padding: 8px 25px;

      &:hover {
        color: #e4c09f;
      }
    }
  }
}

@media all and (min-width: 1000px) and (max-width: 1080px) {
  .trans-change-language-title{
	font-size: 10px;
  }
}

</style>

<template>
  <div class="trans-float-buttons-wrapper">
    <a :href="floatButtonsConfig.smsLink" target="_blank">
      <img src="~/assets/images/home/introduce/telegram-icon.png" />
    </a>
    <a :href="floatButtonsConfig.callLink" target="_blank">
      <img src="~/assets/images/home/introduce/call-icon.png" />
    </a>
    <a :href="floatButtonsConfig.messageLink" target="_blank">
      <img src="~/assets/images/home/introduce/messenger-icon.png" />
    </a>
    <a :href="floatButtonsConfig.zalo" target="_blank">
      <img src="~/assets/images/home/introduce/zalo-icon.png" />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.baseUrl,
    };
  },

  computed: {
    floatButtonsConfig() {
      return this.$store.state.configs.floatButtons || {};
    },
  },
};
</script>

<style lang="scss">
.trans-float-buttons-wrapper {
  position: fixed;
  z-index: 999;
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
</style>

<template>
  <div class="w-100">
    <div class="trans-product-lines-item__overlay" />
    <div class="w-100">
      <img class="w-100" :src="imageLink">
    </div>
    <div
      class="
            trans-product-lines-item
            d-flex
            flex-column
            align-items-center
            w-100
          "
    >
      <div class="trans-product-lines-item__name">
        Product Name
      </div>
      <div class="trans-product-lines-item__detail">
        View detail
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [{
    imageLink: String
  }]
}
</script>

<style lang="scss" scoped>
.trans-product-lines-item {
  position: absolute;
  bottom: 0;
  z-index: 1;
  transform: translateY(-50%);
  &__name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #ffffff;
  }
  &__detail {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #e4c09f;
    margin-top: 10px;
    cursor: pointer;
  }
  &__overlay {
    position: absolute;
    height: calc(100vw / 4);
    bottom: -2px;
    background: linear-gradient(270deg, rgba(19, 34, 36, 0) 0%, rgba(19, 34, 36, 0.703125) 49.69%, #132224 98.56%);
transform: rotate(-90deg);
    width: 100%;
  }
}
</style>

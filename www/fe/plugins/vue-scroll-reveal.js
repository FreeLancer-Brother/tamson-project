import VueScrollReveal from "vue-scroll-reveal";
import Vue from "vue";
// Using ScrollReveal's default configuration
Vue.use(VueScrollReveal);

// OR specifying custom default options for all uses of the directive
Vue.use(VueScrollReveal, {
  class: "v-scroll-reveal", // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 800,
  opacity : 1,
  mobile: false,
});

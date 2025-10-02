<template>
  <div>
    <introduce :homeConfig="homeConfig" />
    <welcome :homeConfig="homeConfig" />
    <our-quality :homeConfig="homeConfig" />
    <div class="trans-divider-large" />
    <brands :homeConfig="homeConfig" :brands="brands" />
  </div>
</template>

<script>
import Vue from "vue";
import Welcome from "~/components/home/Welcome.vue";
import OurQuality from "~/components/home/OurQuality.vue";
import Brands from "~/components/home/Brands.vue";
import Marina from "~/components/home/Marina.vue";
import RentingService from "~/components/home/RentingService.vue";
import Introduce from "~/components/home/Introduce.vue";
import Service from "~/components/home/Service.vue";
export default {
  head() {
    return this.homeConfig && this.homeConfig.seo ? {
      title: this.homeConfig.seo.title[this.currentLocale],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.homeConfig.seo.description[this.currentLocale],
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.homeConfig.seo.keyword[this.currentLocale],
        },
      ],
    } : {};
  },

  components: {
    Welcome,
    OurQuality,
    Brands,
    //Marina,
    //Service,
    //RentingService,
    Introduce,
  },
  layout: "default",

  computed: {
    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },

  updated() {
    this.$nextTick(function () {
      gsap.registerPlugin(SplitText, ScrollTrigger);
    })
  },

  mounted() {
    if (process.browser && window) {
      gsap.registerPlugin(SplitText, ScrollTrigger);
      this.textReveal();
    }
  },

  methods: {
    textReveal() {
      if (document.readyState !== "loading") {
        this.setupSplits();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          this.setupSplits();
        });
      }
    },

    setupSplits() {
      let splitWords = function (selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (el) {
          el.dataset.splitText = el.textContent;
          el.innerHTML = el.textContent
            .split(/\s/)
            .map(function (word) {
              return word
                .split("-")
                .map(function (word) {
                  return '<span class="word">' + word + "</span>";
                })
                .join('<span class="hyphen">-</span>');
            })
            .join('<span class="whitespace"> </span>');
        });
      };

      let splitLines = function (selector) {
        var elements = document.querySelectorAll(selector);

        splitWords(selector);

        elements.forEach(function (el) {
          var lines = getLines(el);

          var wrappedLines = "";
          lines.forEach(function (wordsArr) {
            wrappedLines += '<span class="line"><span class="words">';
            wordsArr.forEach(function (word) {
              wrappedLines += word.outerHTML;
            });
            wrappedLines += "</span></span>";
          });
          el.innerHTML = wrappedLines;
        });
      };

      let getLines = function (el) {
        var lines = [];
        var line;
        var words = el.querySelectorAll("span");
        var lastTop;
        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          if (word.offsetTop != lastTop) {
            // Don't start with whitespace
            if (!word.classList.contains("whitespace")) {
              lastTop = word.offsetTop;

              line = [];
              lines.push(line);
            }
          }
          line.push(word);
        }
        return lines;
      };

      splitLines(".quote");

      let revealText = document.querySelectorAll(".quote");

      let revealLines = revealText.forEach((element) => {
        const lines = element.querySelectorAll(".words");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            toggleActions: "restart none none reset"
          },
        });
        tl.set(element, { autoAlpha: 1 });
        tl.from(lines, 1, {
          yPercent: 100,
          ease: Power3.out,
          stagger: 0.25,
          delay: 0.1,
        });
      });
    }
  },

  data() {
    return {
      baseUrl: process.env.baseUrl,
    };
  },

  async asyncData({ $axios }) {
    const data = await Promise.all([
      $axios.$get(`/frontend/configs/home`),
      $axios.$get(`/frontend/header/brand`),
    ]);
    const homeConfigData = data[0];
    const brandsData = data[1];
    return {
      homeConfig: (homeConfigData && homeConfigData.data) || null,
      brands: (brandsData && brandsData.data) || [],
    };
  },
};
</script>


<style lang="scss">
  @import "~/assets/scss/pages/_home.scss";

  .trans-home-welcome, .trans-home-quality-info-wrapper, .trans-home-brands-wrapper {
    .words {
      background: #1e201d;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .trans-home-quality-info-wrapper {
      .trans-home-quality-info__item-title {
        .words {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          line-height: 72px;
          color: #1e201d;
          text-align: center;
        }
      }

      .trans-home-quality-info__item-detail {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #1e201d;
        text-align: center;
      }
    }
  }
</style>

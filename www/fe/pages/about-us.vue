<template>
  <div class="about-us page-container">
    <div class="title">
      <p>{{ $t("header.aboutUs") }}</p>
    </div>
    <div class="banner">
      <img
        class="d-none d-lg-block"
        :src="`${baseUrl}/${aboutUsConfig.bannerImage}`"
      />
      <img class="d-lg-none" :src="`${baseUrl}/${aboutUsConfig.bannerImage}`" />
    </div>
    <div class="main-content">
      <h3 v-scroll-reveal="{
                duration: 3000,
                distance: '100%',
                origin: 'bottom',
                delay: 0,
                opacity: 0,
                reset: false,
                }" class="">{{ aboutUsConfig.title[currentLocale] }}</h3>
      <div class="content">
		    <div class="trans-product-detail-info__person" style="text-align: center;">
				<img :src="`${baseUrl}/${aboutUsConfig.avatar}`" style="width:350px; height:auto;"
                    v-scroll-reveal="{
					duration: 3000,
					distance: '100%',
					origin: 'left',
					opacity: 0,
					delay: 0,
					reset: false,
					}">
				<div class="trans-product-detail-info__person-name" style="font-size:20px; font-weight: bold;" >{{ aboutUsConfig.namePerson[currentLocale] }}</div>
				<div class="trans-product-detail-info__person-role effect" style="font-size:20px;" >{{ aboutUsConfig.position }}</div>
			</div>
        <div
                v-scroll-reveal="{
                duration: 3000,
                distance: '100%',
                origin: 'bottom',
                delay: 0,
                opacity: 0,
                reset: false,
                }"
                class="description" v-html="aboutUsConfig.content[currentLocale]">
        </div>
      </div>
    </div>
    <div v-scroll-reveal="{
                duration: 3000,
                distance: '100%',
                origin: 'bottom',
                delay: 0,
                opacity: 0,
                reset: false,
                }"
         class="ant-colcontent" style="padding-bottom: 50px;">
      <h3 style="font-size: 40px;text-align: center;padding-bottom: 50px;">{{ aboutUsConfig.titleMember[currentLocale] }}</h3>
      <div class="content-member" v-html="aboutUsConfig.contentMember[currentLocale]"></div>

      <div class="d-flex flex-lg-row flex-column members-wrap">
        <div class="members-item" v-for="member in aboutUsConfig.members" :key="member.key">
          <img :src="`${baseUrl}/${member.avatar}`" class="w-100" style="padding-bottom: 10px;">
          <div class="trans-product-detail-info__person-name text-uppercase" style="font-weight: bold;">{{ member.namePerson[currentLocale] }}</div>
          <div class="trans-product-detail-info__person-role">{{ member.positionPerson }}</div>
        </div>
      </div>
	  </div>
  </div>
</template>

<script>

export default {
  updated() {
    this.$nextTick(function () {
      gsap.registerPlugin(SplitText, ScrollTrigger);
      this.textRevealAbout();
    })
  },

  mounted() {
    if (process.browser && window) {
      gsap.registerPlugin(SplitText, ScrollTrigger);
      this.textRevealAbout();
    }
  },

  head() {
    return this.aboutUsConfig && this.aboutUsConfig.seo
      ? {
          title: this.aboutUsConfig.seo.title[this.currentLocale],
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.aboutUsConfig.seo.description[this.currentLocale],
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.aboutUsConfig.seo.keyword[this.currentLocale],
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
      currentSlide: 0,
      totalSlide: 4,
      slickOptions: {
        arrows: false,
        dots: false,
        infinite: false,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
      },
      baseUrl: process.env.baseUrl,
    };
  },

  methods: {
    handleScroll() {
      document.getElementById("stay-connected").scrollIntoView({
        behavior: "smooth",
      });
    },
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

    textRevealAbout() {
      if (document.readyState !== "loading") {
        this.setupSplitsAbout();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          this.setupSplitsAbout();
        });
      }
    },

    setupSplitsAbout() {
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
          delay: 0.3,
        });
      });
    }
  },

  async asyncData({ $axios }) {
    const aboutUsConfigData = await $axios.$get(`/frontend/configs/about-us`);
    return {
      aboutUsConfig: (aboutUsConfigData && aboutUsConfigData.data) || null,
    };
  },
};
</script>

<style lang="scss">
  @import "~/assets/scss/pages/_about-us.scss";
</style>

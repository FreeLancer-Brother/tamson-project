<template>
  <div class="trans-home-welcome">
    <a-row type="flex" :gutter="[30, 16]" class="my-0 py-0">
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <div
          v-scroll-reveal.reset="{
            duration: 2000,
            distance: '20%',
            origin: 'bottom',
            opacity: 0,
            delay: 0,
          }"
          class="
            trans-home-welcome-left
            h-100
            d-flex
            flex-column
            justify-content-center
          "
		  style="
		  align-items:center !important;
		  "
        >
          <div class="trans-title-text-first split">
            {{ welcomeTopConfig.title1[currentLocale] }}
          </div>
          <div class="trans-title-text-second split">
            {{ welcomeTopConfig.title2[currentLocale] }}
          </div>
          <div
            class="trans-description-text split"
            v-html="welcomeTopConfig.content[currentLocale]"
          ></div>
          <nuxt-link
            class="trans-welcome-explore-button"
            :to="getLocalePath(welcomeTopConfig.buttonLink)"
            >{{ welcomeTopConfig.buttonTitle[currentLocale] }}</nuxt-link
          >
        </div>
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" style="padding: 0px 15px !important;">
        <div class="d-flex trans-home-welcome-right" >
          <div>
            <img
              class="custom-image-1 welcome-image-1"
              :src="`${baseUrl}/${welcomeTopConfig.image1}`"
              alt=""
              v-scroll-reveal.reset="{
                duration: 2000,
                distance: '20%',
                origin: 'right',
                opacity: 0,
                delay: 0,
              }"
            />
          </div>
          <div>
            <img
              v-scroll-reveal.reset="{
                duration: 1000,
                distance: '20%',
                origin: 'right',
                opacity: 0,
                delay: 0,
              }"
              :src="`${baseUrl}/${welcomeTopConfig.image2}`"
              class="custom-image-2 welcome-image-2"
              alt=""
            />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: ["homeConfig"],

  components: {},

  computed: {
    welcomeTopConfig() {
      return this.homeConfig.welcome && this.homeConfig.welcome.top
        ? this.homeConfig.welcome.top
        : {};
    },
    currentLocale() {
      return (this.$i18n.locale || "").toLowerCase();
    },
  },

  data() {
    return {
      baseUrl: process.env.baseUrl,
    };
  },

  mounted(){
    // gsap.registerPlugin(SplitText, ScrollTrigger);
    // this.textReveal();
  },

  methods: {
    getLocalePath(path) {
      return path.indexOf("http://") > -1 || path.indexOf("https://") > -1
        ? path
        : this.localePath(path);
    },

    textReveal() {
      // tslint:disable-next-line:no-console
      console.log('>>>>>>>>:welcome:>>>>>>>>', 'textReveal','<<<<<<<<<<<<<<<<<<');
      window.addEventListener("load", function () {
        // tslint:disable-next-line:no-console
        console.log('>>>>>>>>:welcome:>>>>>>>>', 'window load','<<<<<<<<<<<<<<<<<<');

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

        splitLines(".split");

        let revealText = document.querySelectorAll(".split");

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
      });
    }
  },
};
</script>

<style lang="scss" scoped>


@media all and (min-width: 1000px) and (max-width: 1080px) {

  .trans-title-text-second {
    font-size: 30px!important;
    line-height: 30px!important;
  }

  .trans-title-text-first {
    font-size: 30px!important;
    line-height: 30px!important;
  }

  .trans-description-text {
    font-size: 16px!important;
    line-height: 26px!important;
  }

}


@media screen and (max-width: 992px) {
  .welcome-image-1 {
    height: 80vw !important;
    width: 100%;
    object-fit: cover;
  }

  .welcome-image-2 {
    height: 80vw !important;
    width: 100%;
    object-fit: cover;
  }

  .trans-home-welcome {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    margin-right: 2vw;
    padding-top: 100px;
  }

  .trans-title-text-second {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    background: #1E201D;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
	text-align: center;
  }

  .trans-title-text-first {
	margin-top: 2rem;
    padding-top: 30px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    background: #1E201D;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
	text-align: center;
  }

  .trans-description-text {
    font-family: "Montserrat";
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1E201D;
    margin-top: 40px;
    margin-right: 20px;
	text-align: center;
  }

  .trans-welcome-explore-button {
    margin: 40px 0 0 0 !important;
	align-items: center;
  }
}

.trans-home-welcome {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  &-left {
    padding-left: 4vw;
    transform: translateY(-10%);
  }
  &-right {
    display: flex;
    justify-content: flex-end;
    .custom-image-1 {
      border-radius: 0 0 0 100% / 0 0 0 50%;
    }
    .custom-image-2 {
      border-radius: 0 0 0 0 / 0 0 0 0;
    }
  }
}

.welcome-image-1 {
  height: 38vw;
  width: 100%;
  object-fit: cover;
}

.welcome-image-2 {
  height: 38vw;
  width: 100%;
  object-fit: cover;
}

.trans-title-text-second {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 70px;
  background: #1E201D;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  .line {
    display: block;

    .words {
      display: block;
    }
  }
}

.trans-title-text-first {
  margin-top: 2rem;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 56px;
  background: #1E201D;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  padding:50px 0 0 0;

  .line {
    display: block;

    .words {
      display: block;
    }
  }
}

.trans-description-text {
  font-family: "Montserrat";
  font-style: normal;
  font-size: 18px;
  line-height: 28px;
  color: #1E201D;
  margin-top: 40px;
  text-align: center;
}

.trans-welcome-explore-button {
  padding: 12px 32px;
  background: #1E201D;
  backdrop-filter: blur(300px);
  border-radius: 0px 24px;
  font-family: "Montserrat";
  font-style: normal;
  font-size: 18px;
  line-height: 28px;
  color: #d9d9d9 !important;
  width: fit-content;
  margin-top: 40px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ffffff !important;
  }
  @media all and (min-width: 576px) and (max-width: 992px) {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
@media (min-width: 1500px) {

  .trans-title-text-second {
    font-size: 36px !important;
    line-height: 56px !important;
  }

  .trans-title-text-first {
    font-size: 36px !important;
    line-height: 56px !important;
  }
  .trans-description-text {
    font-size: 24px !important;
    line-height: 34px !important;
  }
}

</style>

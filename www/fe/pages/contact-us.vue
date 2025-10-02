<template>
  <div class="trans-contact-us-wrapper">
    <div class="title">
      <p>{{ $t("contacts.contactUs") }}</p>
    </div>
    <div class="trans-contract-us-content">
      <!-- <div class="trans-contract-us-content__title">
        {{ $t("contacts.contactUs") }}
      </div> -->
      <div class="trans-contract-us-content__contract-group">
        <div class="d-flex align-items-center">
          <img src="~/assets/images/contract-us/phone-icon.png" />
          <a :href="`tel:${contactUsConfig.phone}`">{{
            contactUsConfig.phone
            }}</a>
        </div>
        <div class="d-flex align-items-center">
          <img src="~/assets/images/contract-us/email-icon.png" />
          <a :href="`mailto:${contactUsConfig.email}`">{{
            contactUsConfig.email
            }}</a>
        </div>
        <div class="d-flex align-items-center">
          <img src="~/assets/images/contract-us/facebook-icon.png" />
          <a :href="contactUsConfig.facebookLink" target="_blank">{{
            contactUsConfig.facebookName
            }}</a>
        </div>
      </div>
      <div class="stay-connected-wrapper-right">
        <form id="contactForm" action="#" @submit="handleSubmit">
          <div>
            <input
                    v-model="formData.fullname"
                    required
                    :placeholder="$t('contacts.fullname')"
                    name="fullname"
                    type="text"
            />
            <input
                    v-model="formData.phone"
                    required
                    :placeholder="$t('contacts.phoneNumber')"
                    name="phone"
                    type="text"
            />
            <input
                    v-model="formData.email"
                    required
                    :placeholder="$t('contacts.email')"
                    name="email"
                    type="email"
            />
          </div>
          <div>
              <textarea
                      v-model="formData.comment"
                      required
                      :placeholder="$t('contacts.yourComment')"
                      name="comment"
              />
          </div>
        </form>
        <div
                class="d-flex justify-content-center mb-3"
        >
          <button :disabled="isSubmiting" form="contactForm" type="submit">
            <a-spin v-if="isSubmiting" class="mr-3" />{{
            $t("contacts.submit")
            }}
          </button>
        </div>
        <p class="text-success" v-if="isSubmited">{{ $t('common.sendSuccess') }}</p>
      </div>
    </div>
    <div class="trans-contact-us-map-background" v-html="contactUsConfig.map"></div>
  </div>
</template>

<script>
export default {
  head() {
    return this.contactUsConfig && this.contactUsConfig.seo
      ? {
          title: this.contactUsConfig.seo.title[this.currentLocale],
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.contactUsConfig.seo.description[this.currentLocale],
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.contactUsConfig.seo.keyword[this.currentLocale],
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

  layout: "contact",

  data() {
    return {
      isSubmiting: false,
      isSubmited: false,
      formData: {
        fullname: "",
        phone: "",
        email: "",
        comment: "",
      },
      baseUrl: process.env.baseUrl,
    };
  },

  methods: {
    handleChange(e) {
      const { name, value } = e.target;

      if (name && value) {
        this.formData[name] = value;
      }
    },

    async handleSubmit(e) {
      e.preventDefault();
      this.isSubmiting = true;
      try {
        const response = await this.$axios.post("/frontend/contacts/submit", {
          ...this.formData,
          type: "web",
        });
        if (response && response.data) {
          console.log(response.data);
          this.formData = {
            fullname: "",
            phone: "",
            email: "",
            comment: "",
          };
          this.isSubmited = true;

          setTimeout(() => {
            this.isSubmited = false;
          }, 2000);
        } else {
          this.isSubmited = false;
        }
      } catch (error) {
        this.isSubmited = false;
      }
      this.isSubmiting = false;
    },
  },

  async asyncData({ $axios }) {
    const contactUsConfigData = await $axios.$get(
      `/frontend/configs/contact-us`
    );
    return {
      contactUsConfig:
        (contactUsConfigData && contactUsConfigData.data) || null,
    };
  },
};
</script>

<style>
.mapouter {
  width: 100% !important;
}
.gmap_canvas {
  width: 100% !important;
  height: 100% !important;
}

.mapouter .gmap_canvas iframe {
  width: 100% !important;
  height: 100% !important;
}
</style>

<style lang="scss" scoped>

.trans-contact-us-wrapper {
  .title {
    padding-top: 100px;
    background-color:#000000;
    background-size: cover;
    background-position: top;
	
	p {
      padding: 64px 24px 42px;
      margin: 0;
      font-family: "Montserrat";
      font-weight: 600;
      font-size: 36px;
      line-height: 56px;
      color: #ffffff;
	  letter-spcaing: 5px;
	  text-align: center;
	  text-transform: uppercase;
    }
  }

  .trans-contact-us-content {
    position: relative;
  }
}
.trans-contract-us-content {
  background: #000000;
  padding: 20px 30px;
  &__title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 64px;
    background: #ffffff;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-align: center;
  }
  &__contract-group {
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    img {
      margin-right: 6px;
    }
    a,
    div {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
    }
  }
}

.stay-connected-wrapper-right {
  margin-top: 40px;
  form {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;

      &:first-child {
        margin-right: 16px;
      }

      input,
      textarea {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.8);
        padding: 12px 16px;
        color: #ffffff;
        font-family: "Montserrat";
        font-size: 16px;
        width: 25em;

        &:focus,
        &:active {
          outline: none;
        }
      }

      input:not(:last-child) {
        margin-bottom: 16px;
      }

      textarea {
        height: 100%;
      }
    }
  }

  button[type="submit"] {
    margin-top: 48px;
    background: #ffffff;
    border-radius: 0px 24px;
    border: 0 none;
    padding: 12px 32px;
    font-family: "Montserrat";
    font-size: 18px;
    line-height: 28px;
    color: #000000;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: #a7a7a7 !important;
	  color: #ffffff !important;
    }
  }
}

@media screen and (max-width: 992px) {
  .trans-contact-us-wrapper {
    margin-top: 0px;
    position: relative;
    align-items: center;
  }
  .trans-contract-us-content {
    transform: translateY(0);
    left: 0;
    width: 100%;
    &__title {
      font-size: 24px;
      line-height: 46px;
    }
    &__contract-group {
      display: flex;
      flex-direction: column;
      div {
        margin: 1% 0 1% 0;
      }
    }

  }

  .stay-connected-wrapper-right {
    margin-top: 40px;
    form {
      flex-direction: column;

      div {
        display: flex;
        flex-direction: column;

        &:first-child {
          margin-right: 0;
        }

        input,
        textarea {
          width: 100%;

          &:focus,
          &:active {
            outline: none;
          }
        }

        input:not(:last-child) {
          margin-bottom: 16px;
        }

        textarea {
          height: 200px;
          margin-top: 10px;
        }
      }
    }

    button[type="submit"] {
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
}
</style>

<template>
  <div id="stay-connected" class="stay-connected-wrapper">
    <div class="stay-connected-wrapper-left">
      <h3>{{ $t("contacts.stayConnected") }}</h3>
      <p>
        {{ $t("contacts.message") }}
      </p>
    </div>
    <div class="stay-connected-wrapper-right">
      <form id="stayConnectedForm" action="#" @submit="handleSubmit">
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
      <div class="d-flex justify-content-center justify-content-lg-start mb-3">
        <button :disabled="isSubmiting" form="stayConnectedForm" type="submit">
          <a-spin v-if="isSubmiting" class="mr-3" />{{ $t("contacts.submit") }}
        </button>
      </div>
      <span class="text-success" v-if="isSubmited">
        {{ $t("common.sendSuccess") }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
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
          type: this.$nuxt.$route.path || "none",
        });
        if (response && response.data) {
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
};
</script>

<style lang="scss">

@media all and (min-width: 1000px) and (max-width: 1080px) {

    .stay-connected-wrapper-right {
      form {
          input,
          textarea {
            width: 17em !important;;
          }
        }
    }
}



@media screen and (max-width: 992px) {
  .stay-connected-wrapper {
    padding: 40px 2vw !important;
    display: flex;
    flex-direction: column !important;

    .stay-connected-wrapper-left {
      padding-right: 0 !important;

      h3 {
        font-size: 32px !important;
        line-height: 48px !important;
        margin-bottom: 20px !important;
        text-align: center;
      }

      p {
        font-size: 14px !important;
        line-height: 20px !important;
        text-align: center !important;
        margin-bottom: 20px !important;
      }
    }

    .stay-connected-wrapper-right {
      width: 100% !important;
      form {
        flex-direction: column !important;

        div {
          &:first-child {
            margin-right: 0 !important;
          }

          input,
          textarea {
            width: 100% !important;
          }

          input {
            margin-bottom: 16px !important;
          }

          textarea {
            height: 200px !important;
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
      }
    }
  }
}

.stay-connected-wrapper {
  padding: 80px 2vw;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background: #000000;

  .stay-connected-wrapper-left {
    padding-right: 10%;

    h3 {
      background: #ffffff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-family: "Montserrat";
      font-weight: 600;
      font-size: 32px;
      line-height: 56px;
      margin-bottom: 32px;
    }

    p {
      font-family: "Montserrat";
      font-size: 16px !important;
      line-height: 24px;
      color: #ffffff;
      margin: 0;
    }
  }

  .stay-connected-wrapper-right {
    form {
      display: flex;
      flex-direction: row;
      align-items: stretch;

      div {
        display: flex;
        flex-direction: column;

        &:first-child {
          margin-right: 16px;
        }

        input,
        textarea {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 1);
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
        color: #ACACAC !important;
      }
    }
  }
}
</style>

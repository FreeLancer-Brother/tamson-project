export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/EasePack.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.min.js' },
      { src: '/vendor/SplitText.min.js' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/antd-ui",
    { src: "@/plugins/vue-slick", mode: "client" },
    { src: "@/plugins/vue-scroll-reveal", mode: "client", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Noto Sans": {
            wght: [400, 500, 600],
          },
          Montserrat: {
            wght: [400, 500, 600, 700, 800],
          },
        },
        subsets: ["latin"],
        display: "swap",
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "nuxt-speedkit",
    "nuxt-animejs",
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "bootstrap-vue/nuxt",
  ],

  speedkit: {
    detection: {
      performance: true,
      browserSupport: true,
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 },
      },
      timing: {
        fcp: 800,
        dcl: 1200,
      },
    },

    fonts: [
      {
        family: "Noto Sans",
        locals: ["Noto Sans"],
        fallback: ["Arial", "sans-serif"],
        variances: [],
      },
      {
        family: "Montserrat",
        locals: ["Montserrat"],
        fallback: ["Arial", "sans-serif"],
        variances: [],
      },
    ],

    componentAutoImport: false,
    componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    lazyOffset: {
      component: "0%",
      asset: "0%",
    },

    loader: {
      dataUri: null,
      size: "100px",
      backgroundColor: "grey",
    },
  },

  // image: {
  //   screens: {
  //     default: 320,
  //     xxs: 480,
  //     xs: 576,
  //     sm: 768,
  //     md: 996,
  //     lg: 1200,
  //     xl: 1367,
  //     xxl: 1600,
  //     '4k': 1921
  //   },

  //   domains: ['img.youtube.com', 'i.vimeocdn.com'],

  //   alias: {
  //     youtube: 'https://img.youtube.com',
  //     vimeo: 'https://i.vimeocdn.com',
  //   }
  // },

  i18n: {
    /* module options */
    locales: [
      { code: "en", iso: "en-US", file: "en.js" },
      { code: "vi", iso: "vi-VN", file: "vi.js" },
    ],
    defaultLocale: "vi",
    langDir: "~/locales/",
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: "vi",
      redirectOn: "root",
      useCookie: true,
      cookieCrossOrigin: false,
      cookieDomain: null,
      cookieKey: "i18n_redirected",
      cookieSecure: false,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_ROOT || "/",
  },

  env: {
    baseUrl: process.env.API_ROOT || "/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
		  javascriptEnabled: true
		},
	  vue: {
         prettify: false
      }
    },
	  filenames: {
		app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
		chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
		css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
		img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
		font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
		video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
    },
    extractCSS: true,
  },

  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  },

  filters: {
    strippedContent: function (string) {
      return string.replace(/<\/?[^>]+>/gi, " ");
    },
  },
};

import { BACKEND_ENDPOINT } from "./constants";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  base: `${BACKEND_ENDPOINT}`,
  authentication: `${BACKEND_ENDPOINT}` + "/auth/login",
  users: `${BACKEND_ENDPOINT}` + "/users",
  news: `${BACKEND_ENDPOINT}` + "/news",
  upload_image: `${BACKEND_ENDPOINT}` + "/upload/image",
  upload_video: `${BACKEND_ENDPOINT}` + "/upload/video",
  uploadCK: `${BACKEND_ENDPOINT}` + "/upload/ckeditor",
  brands: BACKEND_ENDPOINT + "/brands",
  yatchTypes: BACKEND_ENDPOINT + "/yatch-types",
  productLines: BACKEND_ENDPOINT + "/product-lines",
  products: BACKEND_ENDPOINT + "/products",
  emailAccount: BACKEND_ENDPOINT + "/email-accounts",
  contact: BACKEND_ENDPOINT + "/contacts",
  services: BACKEND_ENDPOINT + "/services",
  configs: BACKEND_ENDPOINT + "/configs",
  auth: BACKEND_ENDPOINT + "/auth",
};

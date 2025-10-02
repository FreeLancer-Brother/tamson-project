import { BACKEND_ENDPOINT } from "../config/constants";
import _, { first } from "lodash";
import { uuid } from "uuidv4";
export const getLinkToServer = (url) => {
  console.log("START REPLACE ", url)

  if (typeof url === 'object' || Array.isArray(url)) {
    url = _.get(url, "url", url);
    console.log("START REPLACE OBJECCT ", url)
  }

  if (url && url[0] && url[0].url) {
    url = url[0].url;
    console.log("START REPLACE OBJECCT ", url)
  }
  let final_result = _.replace(url, BACKEND_ENDPOINT, "");
  final_result = _.replace(final_result, "//", "/");
  final_result = _.replace(final_result, "//", "/");
  final_result = _.replace(final_result, "//", "/");
  final_result = _.replace(final_result, "//", "/");
  console.log("FINAL REPLACE OBJECCT ", final_result)
  return final_result;

};

export const getValue = (data, field, language = "VI") => {
  const dataField = _.get(data, `${field}`);
  const matchLanguage = _.find(
    dataField,
    (item) => _.toLower(item.language) === _.toLower(language)
  );
  return _.get(matchLanguage, "content", "");
};

export const getFullLinkImage = (url) => {
  if (_.indexOf(url, '/') !== 0) {
    return `${BACKEND_ENDPOINT}/${url}`;
  }
  return `${BACKEND_ENDPOINT}${url}`;
};

export const convertImageToObject = (url) => {
  if (!url) {
    return "";
  }
  return {
    uid: uuid(),
    status: "done",
    name: _.last(_.split(url, "/")),
    url: getFullLinkImage(url),
  };
};

export const stringToSlug = (str = "") => {
  if (!str) return "";

  // trim + lowercase
  str = str.trim().toLowerCase();

  str = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");

  return str
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+|-+$/g, "");
};

export const mixContent = (vi, en) => {
  return [
    {
      language: "VI",
      content: vi,
    },
    {
      language: "EN",
      content: en,
    },
  ];
};

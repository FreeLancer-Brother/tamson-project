import agent from "./agent";
import api from "../config/api";
import _ from "lodash";
function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        loader.file.then((file) => {
          body.append("upload", file);
          agent
            .post(api.uploadCK, body, config)
            .then((res) => {
              resolve({
                default: _.get(res, "data.url"),
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    },
  };
}
export default function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

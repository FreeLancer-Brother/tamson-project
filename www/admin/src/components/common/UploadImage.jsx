import { Upload, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import ImgCrop from "antd-img-crop";
import styled from "styled-components";
import api from "../../config/api";
import agent from "../../libs/agent";
import _ from "lodash";
import { InboxOutlined } from "@ant-design/icons";
import { uuid } from "uuidv4";
const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;
const { Dragger } = Upload;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

async function fileUpload(files, onProgress) {
  const formData = new FormData();
  formData.append("files", files);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      onProgress && onProgress();
    },
  };
  const data = await agent.post(api.upload_image, formData, config);
  return data;
}

const UploadImage = ({
  height,
  width,
  maxImage = 45,
  fileListData,
  onChange,
}) => {
  const StyledUpload = styled(Upload)`
    .ant-upload-select-picture-card {
      width: ${width};
      height: ${height};
    }
    .ant-upload-list-picture-card-container {
      width: ${width};
      height: ${height};
    }
  `;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const uploadingRef = useRef(new Set());

  useEffect(() => {
    if (fileListData?.length) {
      const normalizedList = _.map(fileListData, (file) => ({ ...file }));
      setFileList(normalizedList);
      setUploadedFiles(normalizedList);
    } else {
      setFileList([]);
      setUploadedFiles([]);
    }
  }, [fileListData]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = async ({ fileList: currentFileList }) => {
    setFileList(currentFileList);
    const pendingUploads = _.filter(
      currentFileList,
      (file) =>
        file.originFileObj &&
        !file.url &&
        !uploadingRef.current.has(file.uid)
    );

    for (const file of pendingUploads) {
      uploadingRef.current.add(file.uid);
      try {
        await handleRequestMultiple(file);
      } finally {
        uploadingRef.current.delete(file.uid);
      }
    }
  };

  const handleRemove = (data) => {
    const newData = _.filter(uploadedFiles, (file) => file.uid !== data.uid);
    setUploadedFiles(newData);
    onChange && onChange(newData);
  };

  const handleRequestSingle = async ({
    file,
    filename,
    onError,
    onSuccess,
  }) => {
    try {
      console.log("upload", file);
      const data = await fileUpload(file);
      const success = _.get(data, "data.success", false);
      const uri = _.get(_.first(_.get(data, "data.data")), "uri");
      console.log("end-upload:", success);
      if (success) {
        onSuccess({
          status: success ? "done" : "error",
          url: success ? `${BACKEND}/${uri}` : "",
          name: filename,
          uid: uuid(),
        });
      } else {
        onError({
          uid: uuid(),
          status: "error",
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleRequestMultiple = async (file) => {
    try {
      const data = await fileUpload(file.originFileObj, () => {
        setFileList((prev) =>
          _.map(prev, (item) =>
            item.uid === file.uid ? { ...item, status: "uploading" } : item
          )
        );
      });

      const success = _.get(data, "data.success", false);
      const uri = _.get(_.first(_.get(data, "data.data")), "uri");
      const updatedFile = {
        status: success ? "done" : "error",
        url: success ? `${BACKEND}/${uri}` : "",
        name: file.name,
        uid: file.uid,
      };

      setFileList((prev) =>
        _.map(prev, (item) => (item.uid === file.uid ? updatedFile : item))
      );

      setUploadedFiles((prev) => {
        const filtered = _.filter(prev, (item) => item.uid !== file.uid);
        const next = success ? [...filtered, updatedFile] : filtered;
        onChange && onChange(next);
        return next;
      });

      if (success) {
        message.success(`${file.name} file uploaded successfully.`);
      } else {
        message.error(`${file.name} file upload failed.`);
      }
    } catch (error) {
      message.error(error.message);
      setFileList((prev) =>
        _.map(prev, (item) =>
          item.uid === file.uid ? { ...item, status: "error" } : item
        )
      );
      setUploadedFiles((prev) => {
        const filtered = _.filter(prev, (item) => item.uid !== file.uid);
        onChange && onChange(filtered);
        return filtered;
      });
    }
  };

  const handleSingleOnChange = (info) => {
    const { status, response } = info.file;
    if (status !== "uploading") {
      console.log(response);
      onChange && onChange(_.compact([response]));
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      {fileList.length ? (
        <>
          {/* <ImgCrop rotate> */}
          <StyledUpload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
            maxCount={maxImage}
            multiple={true}
            accept="image/png,image/jpeg"
          >
            {fileList.length < maxImage ? uploadButton : null}
          </StyledUpload>
          {/* </ImgCrop> */}
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </>
      ) : (
        <Dragger
          onChange={handleSingleOnChange}
          customRequest={handleRequestSingle}
          accept="image/png,image/jpeg"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      )}
    </>
  );
};

export default UploadImage;

import { Upload, message, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import ImgCrop from "antd-img-crop";
import styled from "styled-components";
import api from "../../config/api";
import agent from "../../libs/agent";
import { getToken } from "../../helpers/token";
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
  const data = await agent.post(api.upload_video, formData, config);
  return data;
}

const UploadVideo = ({
  height,
  width,
  maxVideo = 4,
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
  const [previewVideo, setPreviewVideo] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
	  console.log("CHECK FILELIST LOAD",fileList,fileListData)
    if (fileListData?.length) {
		
      setFileList([fileListData]);
	  setPreviewVideo(fileListData);
    } else {
		if (fileList){
			//handleRemoveVideo();
			//setFileList([]);
		}
		
    }
	
  }, [fileListData]);
	 
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
		file.preview = window.URL.createObjectURL(file);
		
    }
	console.log("START PREVIEW URL",file)
    setPreviewVideo(file.url || file.preview);
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

 

  const handleRemove = (data) => {
    const newData = _.filter(fileListData, (file) => file.uid !== data.uid);
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
	  console.log("CHECK UPLOAD URI",data.data.data.uri)
      const uri = data.data.data.uri  ? data.data.data.uri  : ""
     
      if (success) {
        onSuccess({
          status: success ? "done" : "error",
          url: success ? `${BACKEND}/${uri}` : "",
          name: filename,
          uid: uuid(),
        });
		console.log("UPLOAD SUCCESS, set URL",uri);
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

  
 const handleRemoveVideo = (info) => {
	
   setFileList([]);
   onChange && onChange([]);
  };
  const handleSingleOnChange = (info) => {
    const { status, response } = info.file;
    if (status !== "uploading") {
      console.log(response);
      onChange && onChange(_.compact([response]));
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
		var binaryData = [];
		binaryData.push(info.file.originFileObj);

		setPreviewVideo(window.URL.createObjectURL(new Blob(binaryData, {type: "video/mp4"})))

    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      {fileList.length>0 ? (
        <>
			<div style={{"position" : "absolute", "right" : "4px", "top" : "4px", "z-index" : "1000"}}>
				<button onClick={handleRemoveVideo}  className="btn btn-primary" style={{"font-size" : "10px"}}>X</button>
			</div>
          <video style={{"height" : "100%", "width" : "100%"}} autoPlay={true} loop={false} controls={true}  playsInline
    muted  >

			  <source type="video/mp4"  src={previewVideo}></source>
			</video>
        </>
      ) : (
        <Dragger
          onChange={handleSingleOnChange}
          customRequest={handleRequestSingle}
          accept="video/mp4,video/webm"
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

export default UploadVideo;

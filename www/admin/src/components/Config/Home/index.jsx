import { Tabs, Form, Input, Row, Col, Button, message, Spin } from "antd";
import UploadImage from "../../common/UploadImage";
import UploadVideo from "../../common/UploadVideo";
import { useNavigate } from "react-router-dom";
import {
  stringToSlug,
  mixContent,
  getLinkToServer,
  getLinkToServerRaw,
  getValue,
  convertImageToObject,
} from "../../../helpers/common";
import { useMemo, useEffect, useState, useCallback } from "react";
import agent from "../../../libs/agent";
import api from "../../../config/api";
import _ from "lodash";
import { uuid } from "uuidv4";
import WelcomeComponent from "./Welcome.jsx";
import Brands from "./Brand";
import Services from "./Service";
import Seo from "./Seo";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadPlugin from "../../../libs/CKUpload";
const { TabPane } = Tabs;

const processHeaderBanner = (data) => {
	console.log("PROCESSING DATA",data)
  return _.map(data, (item) => ({
    image: _.get(item, "image") ?  _.compact([convertImageToObject(_.get(item, "image"))]) : "",
    video: _.get(item, "video") ? api.base+"/"+_.get(item, "video") : "",
    titleVi: getValue(item, "title", "VI"),
    titleEn: getValue(item, "title", "EN"),
    subtitleVi: getValue(item, "subtitle", "VI"),
    subtitleEn: getValue(item, "subtitle", "EN"),
    button1TitleVi: getValue(item, "button1Title", "VI"),
    button1TitleEn: getValue(item, "button1Title", "EN"),
    button1Link: _.get(item, "button1Link"),
    button2TitleVi: getValue(item, "button2Title", "VI"),
    button2TitleEn: getValue(item, "button2Title", "VI"),
    button2Link: _.get(item, "button2Link"),
    id: uuid(),
  }));
};

const HomeConfig = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [headerBanners, setHeaderBanners] = useState([]);
  const [loadingHeaderBanner, setLoadingHeaderBanner] = useState(false);
  const [oldData, setOldData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await agent.get(`${api.configs}/home`);
        const data = _.get(response, "data.data.configValue");
        setOldData(data);
        const headerBannerData = processHeaderBanner(
          _.get(data, "headBanner", [])
        );
        setHeaderBanners(headerBannerData);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleRemove = (collection, id) => {
    let getCollection = [];
    let setFunc = null;
    switch (collection) {
      case "headerBanner":
        getCollection = headerBanners;
        setFunc = setHeaderBanners;
        break;
      //   case "tab":
      //     getCollection = tabContents;
      //     setFunc = setTabContents;
      //     break;
      //   case "designer":
      //     getCollection = designers;
      //     setFunc = setDesigners;
      default:
        break;
    }
    const newCollection = _.filter(getCollection, (item) => item.id !== id);
    setFunc(newCollection);
  };

  const handleAddHeaderBanner = () => {
    const newHeaderBanners = [
      ...headerBanners,
      {
        image: [],
        video: [],
        titleVi: "",
        titleEn: "",
        subtitleVi: "",
        subtitleEn: "",
        button1TitleVi: "",
        button1TitleEn: "",
        button1Link: "",
        button2TitleVi: "",
        button2TitleEn: "",
        button2Link: "",
        id: uuid(),
      },
    ];
    setHeaderBanners(newHeaderBanners);
  };

  const onChangeHeaderBanner = (id, label, value) => {
    const newHeaderBanners = _.map(headerBanners, (item) => {
      if (item.id === id) {
        item[label] = value;
		
      }
      return item;
    });
    setHeaderBanners(newHeaderBanners);
  };

  const onSaveHeaderBanner = async () => {
	  console.log("SAVING",headerBanners);


		
    const processData = _.map(headerBanners, (item) => ({
      image: getLinkToServer(_.first(item.image)),
      video: getLinkToServer(item.video),
      title: mixContent(item.titleVi, item.titleEn),
      subtitle: mixContent(item.subtitleVi, item.subtitleEn),
      button1Title: mixContent(item.button1TitleVi, item.button1TitleEn),
      button2Title: mixContent(item.button2TitleVi, item.button2TitleEn),
      button1Link: item.button1Link,
      button2Link: item.button2Link,
    }));
	console.log("after process",processData);
    try {
      setLoadingHeaderBanner(true);
	  console.log("CHECK SAVE",headerBanners)
      const response = await agent.put(`${api.configs}/home`, {
        configValue: _.assignIn(oldData, {
          headBanner: processData,
        }),
      });
      if (_.get(response, "data.success")) {
        message.success("Update Head Banner successfully");
      }
    } catch (error) {
      const getMessage = _.get(error, "response.data.message", error.message);
      message.error(getMessage);
    } finally {
      setLoadingHeaderBanner(false);
    }
  };

  const renderHeaderBanner = useMemo(() => {
    return headerBanners.map((item) => (
      <Row gutter={[16, 0]} id={item.id}>
        <Col span="12">
          <Form.Item label="Title (VI)" required>
            <Input
              value={_.get(item, "titleVi")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "titleVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Title (EN)" required>
            <Input
              value={_.get(item, "titleEn")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "titleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Sub Title (VI)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, "subtitleVi")}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeHeaderBanner(item.id, "subtitleVi", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Sub Title (EN)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, "subtitleEn")}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeHeaderBanner(item.id, "subtitleEn", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Button 1 Title (VI)" required>
            <Input
              value={_.get(item, "button1TitleVi")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "button1TitleVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Button 1 Title (EN)" required>
            <Input
              value={_.get(item, "button1TitleEn")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "button1TitleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Button 1 link" required>
            <Input
              value={_.get(item, "button1Link")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "button1Link", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Button 2 Title (VI)" required>
            <Input
              value={_.get(item, "button2TitleVi")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "button2TitleVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Button 2 Title (EN)" required>
            <Input
              value={_.get(item, "button2TitleEn")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "button2TitleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Button 2 link" required>
            <Input
              value={_.get(item, "button2Link")}
              onChange={(e) =>
                onChangeHeaderBanner(item.id, "button2Link", e.target.value)
              }
            />
          </Form.Item>
        </Col>
		
        <Col span="8">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={_.get(item, `image`)}
              onChange={(value) =>
                onChangeHeaderBanner(item.id, "image", value)
              }
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
		 <Col span="8">
          <Form.Item label="Video" required>
            <UploadVideo
              fileListData={_.get(item, `video`)}
              onChange={(value) =>
                onChangeHeaderBanner(item.id, "video", value)
              }
              maxVideo={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item label="&nbsp;">
            <Button
              onClick={() => handleRemove("headerBanner", item.id)}
              type="dashed"
            >
              Remove
            </Button>
          </Form.Item>
        </Col>
        <hr style={{ width: "100%" }} />
      </Row>
    ));
  }, [headerBanners]);

  const TAB_DATA = [
    {
      id: 1,
      label: "Header Banner",
      render: <Form layout="vertical">{renderHeaderBanner}</Form>,
    },
    {
      id: 2,
      label: "Welcome",
      render: <WelcomeComponent />,
    },
    {
      id: 3,
      label: "Brands",
      render: <Brands />,
    },
    {
      id: 4,
      label: "Services",
      render: <Services />,
    },
    {
      id: 5,
      label: "SEO",
      render: <Seo />,
    },
  ];

  const handleAdd = (id) => {
    if (id === 1) {
      handleAddHeaderBanner();
    }
  };

  return loading ? (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spin />
    </div>
  ) : (
    <Tabs destroyInactiveTabPane>
      {TAB_DATA.map((item) => (
        <TabPane tab={item.label} key={item.id}>
          {item.id === 1 ? (
            <div className="d-flex align-items-center justify-content-between w-100">
              <Button
                className="mb-3"
                type="primary"
                onClick={() => handleAdd(item.id)}
              >
                Add
              </Button>
              <Button
                loading={loadingHeaderBanner}
                className="mb-3"
                type="primary"
                onClick={onSaveHeaderBanner}
              >
                Save
              </Button>
            </div>
          ) : null}

          {item.render}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default HomeConfig;

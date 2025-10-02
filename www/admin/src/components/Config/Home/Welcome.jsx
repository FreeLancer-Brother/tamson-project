import { Form, Input, Row, Col, Button, message, Spin } from "antd";
import UploadImage from "../../common/UploadImage";
import {
  stringToSlug,
  mixContent,
  getLinkToServer,
  getValue,
  convertImageToObject,
} from "../../../helpers/common";
import { useMemo, useEffect, useState, useCallback } from "react";
import agent from "../../../libs/agent";
import api from "../../../config/api";
import _ from "lodash";
import { uuid } from "uuidv4";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadPlugin from "../../../libs/CKUpload";

const DEFAULT_STATS = [1, 2, 3, 4].map((item) => ({
  titleVi: "",
  titleEn: "",
  subtitleVi: "",
  subtitleEn: "",
  id: uuid(),
}));

const processWelcome = (data) => {
  const topData = _.get(data, "top", {});
  const bottomData = _.get(data, "bottom", {});
  return {
    topTitle1Vi: getValue(topData, "title1", "VI"),
    topTitle1En: getValue(topData, "title1", "EN"),
    topTitle2Vi: getValue(topData, "title2", "VI"),
    topTitle2En: getValue(topData, "title2", "EN"),
    topContentVi: getValue(topData, "content", "VI"),
    topContentEn: getValue(topData, "content", "EN"),
    topButtonTitleVi: getValue(topData, "buttonTitle", "VI"),
    topButtonTitleEn: getValue(topData, "buttonTitle", "EN"),
    topButtonLink: _.get(topData, "buttonLink"),
    topImage1: _.compact([convertImageToObject(_.get(topData, "image1"))]),
    topImage2: _.compact([convertImageToObject(_.get(topData, "image2"))]),
    bottomTitle1Vi: getValue(bottomData, "title1", "VI"),
    bottomTitle1En: getValue(bottomData, "title1", "EN"),
    bottomTitle2Vi: getValue(bottomData, "title2", "VI"),
    bottomTitle2En: getValue(bottomData, "title2", "EN"),
    bottomImage1: _.compact([
      convertImageToObject(_.get(bottomData, "image1")),
    ]),
    bottomImage2: _.compact([
      convertImageToObject(_.get(bottomData, "image2")),
    ]),
    bottomImage3: _.compact([
      convertImageToObject(_.get(bottomData, "image3")),
    ]),
    statistics: _.map(_.get(bottomData, "statistics", []), (item) => ({
      titleVi: getValue(item, "title", "VI"),
      titleEn: getValue(item, "title", "EN"),
      subtitleVi: getValue(item, "subtitle", "VI"),
      subtitleEn: getValue(item, "subtitle", "EN"),
      id: uuid(),
    })),
  };
};

const Welcome = () => {
  const [topImage1, setTopImage1] = useState([]);
  const [topImage2, setTopImage2] = useState([]);
  const [bottomImage1, setBottomImage1] = useState([]);
  const [bottomImage2, setBottomImage2] = useState([]);
  const [bottomImage3, setBottomImage3] = useState([]);
  const [statistics, setStatistics] = useState([1, 2, 3, 4]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [topContentVi, setTopContentVi] = useState("");
  const [topContentEn, setTopContentEn] = useState("");
  const [oldData, setOldData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await agent.get(`${api.configs}/home`);
        const data = _.get(response, "data.data.configValue");
        setOldData(data);
        const welcomeData = processWelcome(_.get(data, "welcome"));
        setTopImage1(_.get(welcomeData, "topImage1"));
        setTopImage2(_.get(welcomeData, "topImage2"));
        setBottomImage1(_.get(welcomeData, "bottomImage1"));
        setBottomImage2(_.get(welcomeData, "bottomImage2"));
        setBottomImage3(_.get(welcomeData, "bottomImage3"));
        form.setFieldsValue({
          topTitle1Vi: _.get(welcomeData, "topTitle1Vi"),
          topTitle1En: _.get(welcomeData, "topTitle1En"),
          topTitle2Vi: _.get(welcomeData, "topTitle2Vi"),
          topTitle2En: _.get(welcomeData, "topTitle2En"),

          topButtonTitleVi: _.get(welcomeData, "topButtonTitleVi"),
          topButtonTitleEn: _.get(welcomeData, "topButtonTitleEn"),
          topButtonLink: _.get(welcomeData, "topButtonLink"),
          bottomTitle1Vi: _.get(welcomeData, "bottomTitle1Vi"),
          bottomTitle1En: _.get(welcomeData, "bottomTitle1En"),
          bottomTitle2Vi: _.get(welcomeData, "bottomTitle2Vi"),
          bottomTitle2En: _.get(welcomeData, "bottomTitle2En"),
        });
        setTopContentVi(_.get(welcomeData, "topContentVi", ""));
        setTopContentEn(_.get(welcomeData, "topContentEn", ""));
        const stats = _.get(welcomeData, "statistics.length")
          ? _.get(welcomeData, "statistics")
          : DEFAULT_STATS;
        setStatistics(stats);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleSave = () => {
    form
      .validateFields()
      .then(async (values) => {
        const newData = {
          ...values,
          statistics,
          topImage1,
          topImage2,
          bottomImage1,
          bottomImage2,
          bottomImage3,
        };
        const processData = {
          top: {
            title1: mixContent(newData.topTitle1Vi, newData.topTitle1En),
            title2: mixContent(newData.topTitle2Vi, newData.topTitle2En),
            content: mixContent(topContentVi, topContentEn),
            buttonTitle: mixContent(
              newData.topButtonTitleVi,
              newData.topButtonTitleEn
            ),
            buttonLink: _.get(newData, "topButtonLink"),
            image1: getLinkToServer(_.first(newData.topImage1)),
            image2: getLinkToServer(_.first(newData.topImage2)),
          },
          bottom: {
            title1: mixContent(newData.bottomTitle1Vi, newData.bottomTitle1En),
            title2: mixContent(newData.bottomTitle2Vi, newData.bottomTitle2En),
            image1: getLinkToServer(_.first(newData.bottomImage1)),
            image2: getLinkToServer(_.first(newData.bottomImage2)),
            image3: getLinkToServer(_.first(newData.bottomImage3)),
            statistics: _.map(statistics, (item) => ({
              title: mixContent(item.titleVi, item.titleEn),
              subtitle: mixContent(item.subtitleVi, item.subtitleEn),
            })),
          },
        };
        try {
          setSaving(true);
          const response = await agent.put(`${api.configs}/home`, {
            configValue: _.assignIn(oldData, {
              welcome: processData,
            }),
          });
          if (_.get(response, "data.success")) {
            message.success("Update Head Banner successfully");
          }
        } catch (error) {
          const getMessage = _.get(
            error,
            "response.data.message",
            error.message
          );
          message.error(getMessage);
        } finally {
          setSaving(false);
        }
      })
      .catch((err) => {});
  };

  const handleChangeStatistic = (id, label, value) => {
    const newStatistics = _.map(statistics, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setStatistics(newStatistics);
  };

  const renderStatistics = useMemo(() => {
    return statistics.map((item) => (
      <Row id={item.id} gutter={[16, 0]}>
        <Col span="6">
          <Form.Item label="Title (VI)" required>
            <Input
              value={item.titleVi}
              onChange={(e) =>
                handleChangeStatistic(item.id, "titleVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label="Title (EN)" required>
            <Input
              value={item.titleEn}
              onChange={(e) =>
                handleChangeStatistic(item.id, "titleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label="SubTitle (VI)" required>
            <Input
              value={item.subtitleVi}
              onChange={(e) =>
                handleChangeStatistic(item.id, "subtitleVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label="SubTitle (EN)" required>
            <Input
              value={item.subtitleEn}
              onChange={(e) =>
                handleChangeStatistic(item.id, "subtitleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
      </Row>
    ));
  }, [statistics]);

  return loading ? (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spin />
    </div>
  ) : (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 0]}>
        <Col span="24" className="d-flex justify-content-between">
          <h5>Top</h5>
          <Button loading={saving} onClick={handleSave} type="primary">
            Save
          </Button>
        </Col>
        <Col span="12">
          <Form.Item
            name="topTitle1Vi"
            label="Title 1 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="topTitle1En"
            label="Title 1 (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="topTitle2Vi"
            label="Title 2 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="topTitle2En"
            label="Title 2 (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Content (VI)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={topContentVi}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTopContentVi(data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Content (EN)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={topContentEn}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTopContentEn(data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="topButtonTitleVi"
            label="Button Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="topButtonTitleEn"
            label="Button Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="topButtonLink"
            label="Button Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Image 1" required>
            <UploadImage
              fileListData={topImage1}
              onChange={setTopImage1}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Image 2" required>
            <UploadImage
              fileListData={topImage2}
              onChange={setTopImage2}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>

        <hr style={{ width: "100%" }} />
        <Col span="24">
          <h5>Bottom</h5>
        </Col>
        <Col span="12">
          <Form.Item
            name="bottomTitle1Vi"
            label="Title 1 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="bottomTitle1En"
            label="Title 1 (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="bottomTitle2Vi"
            label="Title 2 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="bottomTitle2En"
            label="Title 2 (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 1" required>
            <UploadImage
              fileListData={bottomImage1}
              onChange={setBottomImage1}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 2" required>
            <UploadImage
              fileListData={bottomImage2}
              onChange={setBottomImage2}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 3" required>
            <UploadImage
              fileListData={bottomImage3}
              onChange={setBottomImage3}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="24">
          <h6>Bottom Statistic</h6>
        </Col>
        <Col span="24">{renderStatistics}</Col>
      </Row>
    </Form>
  );
};

export default Welcome;

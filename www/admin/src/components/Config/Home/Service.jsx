import { Form, Input, Row, Col, Spin, message, Button } from "antd";
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
const Services = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [section1Image1, setSection1Image1] = useState([]);
  const [section1Image2, setSection1Image2] = useState([]);
  const [section1Image3, setSection1Image3] = useState([]);
  const [section1Image4, setSection1Image4] = useState([]);
  const [section1Image5, setSection1Image5] = useState([]);
  const [section1Image6, setSection1Image6] = useState([]);
  const [section2Image, setSection2Image] = useState([]);
  const [section3Image, setSection3Image] = useState([]);
  const [section1ContentVi, setSection1ContentVi] = useState("");
  const [section1ContentEn, setSection1ContentEn] = useState("");
  const [section2ContentVi, setSection2ContentVi] = useState("");
  const [section2ContentEn, setSection2ContentEn] = useState("");
  const [section3ContentVi, setSection3ContentVi] = useState("");
  const [section3ContentEn, setSection3ContentEn] = useState("");
  const [oldData, setOldData] = useState();

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await agent.get(`${api.configs}/home`);
        const data = _.get(response, "data.data.configValue");
        setOldData(data);
        const serviceData = _.get(data, "services");
        const section1 = _.get(serviceData, "section1", {});
        const section2 = _.get(serviceData, "section2", {});
        const section3 = _.get(serviceData, "section3", {});
        setSection1Image1(
          _.compact([convertImageToObject(_.get(section1, "image1"))])
        );
        setSection1Image2(
          _.compact([convertImageToObject(_.get(section1, "image2"))])
        );
        setSection1Image3(
          _.compact([convertImageToObject(_.get(section1, "image3"))])
        );
        setSection1Image4(
          _.compact([convertImageToObject(_.get(section1, "image4"))])
        );
        setSection1Image5(
          _.compact([convertImageToObject(_.get(section1, "image5"))])
        );
        setSection1Image6([
          convertImageToObject(_.get(section1, "background")),
        ]);
        setSection2Image(
          _.compact([convertImageToObject(_.get(section2, "image"))])
        );
        setSection3Image(
          _.compact([convertImageToObject(_.get(section3, "image"))])
        );
        form.setFieldsValue({
          section1Title1Vi: getValue(section1, "title1", "VI"),
          section1Title1En: getValue(section1, "title1", "EN"),
          section1Title2Vi: getValue(section1, "title2", "VI"),
          section1Title2En: getValue(section1, "title2", "EN"),
          section1SubtitleVi: getValue(section1, "subtitle", "VI"),
          section1SubtitleEn: getValue(section1, "subtitle", "EN"),

          section1ButtonTitleVi: getValue(section1, "buttonTitle", "VI"),
          section1ButtonTitleEn: getValue(section1, "buttonTitle", "EN"),
          section1ButtonLink: _.get(section1, "buttonLink"),
          section2Title1Vi: getValue(section2, "title1", "VI"),
          section2Title1En: getValue(section2, "title1", "EN"),
          section2Title2Vi: getValue(section2, "title2", "VI"),
          section2Title2En: getValue(section2, "title2", "EN"),

          section2ButtonTitleVi: getValue(section2, "buttonTitle", "VI"),
          section2ButtonTitleEn: getValue(section2, "buttonTitle", "EN"),
          section2ButtonLink: _.get(section2, "buttonLink"),
          section3TitleVi: getValue(section3, "title", "VI"),
          section3TitleEn: getValue(section3, "title", "EN"),

          section3ButtonTitleVi: getValue(section3, "buttonTitle", "VI"),
          section3ButtonTitleEn: getValue(section3, "buttonTitle", "EN"),
          section3ButtonLink: _.get(section3, "buttonLink"),
        });
        setSection1ContentVi(getValue(section1, "content", "VI"));
        setSection1ContentEn(getValue(section1, "content", "EN"));
        setSection2ContentVi(getValue(section2, "content", "VI"));
        setSection2ContentEn(getValue(section2, "content", "EN"));
        setSection3ContentVi(getValue(section3, "content", "VI"));
        setSection3ContentEn(getValue(section3, "content", "EN"));
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
        const processData = {
          section1: {
            title1: mixContent(
              values.section1Title1Vi,
              values.section1Title1En
            ),
            title2: mixContent(
              values.section1Title2Vi,
              values.section1Title2En
            ),
            subtitle: mixContent(
              values.section1SubtitleVi,
              values.section1SubtitleEn
            ),
            content: mixContent(section1ContentVi, section1ContentEn),
            buttonTitle: mixContent(
              values.section1ButtonTitleVi,
              values.section1ButtonTitleEn
            ),
            buttonLink: values.section1ButtonLink,
            image1: getLinkToServer(_.first(section1Image1)),
            image2: getLinkToServer(_.first(section1Image2)),
            image3: getLinkToServer(_.first(section1Image3)),
            image4: getLinkToServer(_.first(section1Image4)),
            image5: getLinkToServer(_.first(section1Image5)),
            background: getLinkToServer(_.first(section1Image6)),
          },
          section2: {
            title1: mixContent(
              values.section2Title1Vi,
              values.section2Title1En
            ),
            title2: mixContent(
              values.section2Title2Vi,
              values.section2Title2En
            ),
            content: mixContent(section2ContentVi, section2ContentEn),
            buttonTitle: mixContent(
              values.section2ButtonTitleVi,
              values.section2ButtonTitleEn
            ),
            buttonLink: values.section2ButtonLink,
            image: getLinkToServer(_.first(section2Image)),
          },
          section3: {
            title: mixContent(values.section3TitleVi, values.section3TitleEn),

            content: mixContent(section3ContentVi, section3ContentEn),
            buttonTitle: mixContent(
              values.section3ButtonTitleVi,
              values.section3ButtonTitleEn
            ),
            buttonLink: values.section3ButtonLink,
            image: getLinkToServer(_.first(section3Image)),
          },
        };
        try {
          setSaving(true);
          const response = await agent.put(`${api.configs}/home`, {
            configValue: _.assignIn(oldData, {
              services: processData,
            }),
          });
          if (_.get(response, "data.success")) {
            message.success("Update Service successfully");
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

  return loading ? (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spin />
    </div>
  ) : (
    <Form form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col span="24" className="d-flex justify-content-between">
          <h5>Section 1</h5>
          <Button loading={saving} onClick={handleSave} type="primary">
            Save
          </Button>
        </Col>
        <Col span="12">
          <Form.Item
            name="section1Title1Vi"
            label="Title 1 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section1Title1En"
            label="Title 1 (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section1Title2Vi"
            label="Title 2 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section1Title2En"
            label="Title 2 (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section1SubtitleVi"
            label="Sub Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section1SubtitleEn"
            label="Sub Title (EN)"
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
              data={section1ContentVi}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSection1ContentVi(data);
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
              data={section1ContentEn}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSection1ContentEn(data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section1ButtonTitleVi"
            label="Button Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section1ButtonTitleEn"
            label="Button Title (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section1ButtonLink"
            label="Button Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 1" required>
            <UploadImage
              fileListData={section1Image1}
              onChange={setSection1Image1}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 2" required>
            <UploadImage
              fileListData={section1Image2}
              onChange={setSection1Image2}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 3" required>
            <UploadImage
              fileListData={section1Image3}
              onChange={setSection1Image3}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 4" required>
            <UploadImage
              fileListData={section1Image4}
              onChange={setSection1Image4}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Image 5" required>
            <UploadImage
              fileListData={section1Image5}
              onChange={setSection1Image5}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Background" required>
            <UploadImage
              fileListData={section1Image6}
              onChange={setSection1Image6}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>

        <hr style={{ width: "100%" }} />
        <Col span="24">
          <h5>Section 2</h5>
        </Col>
        <Col span="12">
          <Form.Item
            name="section2Title1Vi"
            label="Title 1 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section2Title1En"
            label="Title 1 (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section2Title2Vi"
            label="Title 2 (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section2Title2En"
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
              data={section2ContentVi}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSection2ContentVi(data);
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
              data={section2ContentEn}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSection2ContentEn(data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section2ButtonTitleVi"
            label="Button Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section2ButtonTitleEn"
            label="Button Title (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section2ButtonLink"
            label="Button Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="24">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={section2Image}
              onChange={setSection2Image}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>

        <hr style={{ width: "100%" }} />

        <Col span="24">
          <h5>Section 3</h5>
        </Col>
        <Col span="12">
          <Form.Item
            name="section3TitleVi"
            label="Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="section3TitleEn"
            label="Title (EN)"
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
              data={section3ContentVi}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSection3ContentVi(data);
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
              data={section3ContentEn}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSection3ContentEn(data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section3ButtonTitleVi"
            label="Button Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section3ButtonTitleEn"
            label="Button Title (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="section3ButtonLink"
            label="Button Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="24">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={section3Image}
              onChange={setSection3Image}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Services;

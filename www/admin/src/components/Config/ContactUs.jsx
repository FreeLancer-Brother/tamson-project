import { Form, Input, Row, Col, Button, message, Select } from "antd";
import UploadImage from "../common/UploadImage";
import { useParams, useNavigate } from "react-router-dom";
import {
  stringToSlug,
  mixContent,
  getLinkToServer,
  getValue,
  convertImageToObject,
} from "../../helpers/common";
import { useMemo, useEffect, useState, useCallback } from "react";
import agent from "../../libs/agent";
import api from "../../config/api";
import _ from "lodash";
import { setSaving } from "../../app/reducers/configReducer";
import { useSelector, useDispatch } from "react-redux";
import { SeoCommon } from "../common";

const ContactUsConfig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { saving, activeKey } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  useEffect(() => {
    if (saving && activeKey === "3") {
      form
        .validateFields()
        .then(async (values) => {
          const { phone, email, facebookName, facebookLink } = values;
          if (!_.get(image, "length", 0)) {
            return message.error("Image is required");
          }
          const postData = {
            configValue: {
              seo: {
                title: mixContent(values.seoTitleVi, values.seoTitleEn),
                description: mixContent(
                  values.seoDescriptionVi,
                  values.seoDescriptionEn
                ),
                keyword: mixContent(values.seoKeywordVi, values.seoKeywordEn),
              },
              phone,
              email,
              facebookName,
              facebookLink,
              backgroundImage: getLinkToServer(_.first(image)),
              map: values.map,
            },
          };
          try {
            const response = await agent.put(`${api.configs}/contact-us`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update contact us successfully");
            }
          } catch (error) {
            const getMessage = _.get(
              error,
              "response.data.message",
              error.message
            );

            message.error(getMessage);
          }
        })
        .catch((err) => {})
        .finally(() => dispatch(setSaving(false)));
    }
  }, [saving]);

  useEffect(() => {
    async function getData() {
      const response = await agent.get(`${api.configs}/contact-us`);
      const data = _.get(response, "data.data.configValue");
      const seoData = _.get(data, "seo", {});
      form.setFieldsValue({
        phone: _.get(data, "phone"),
        email: _.get(data, "email"),
        facebookName: _.get(data, "facebookName"),
        facebookLink: _.get(data, "facebookLink"),
        seoTitleEn: getValue(seoData, "title", "EN"),
        seoTitleVi: getValue(seoData, "title", "VI"),
        seoDescriptionVi: getValue(seoData, "description", "VI"),
        seoDescriptionEn: getValue(seoData, "description", "EN"),
        seoKeywordVi: getValue(seoData, "keyword", "VI"),
        seoKeywordEn: getValue(seoData, "keyword", "EN"),
        map: _.get(data, "map", ""),
      });
      setImage(_.compact([convertImageToObject(_.get(data, "backgroundImage"))]));
    }
    try {
      getData();
    } catch (error) {
      message.error(error.message);
    }
  }, []);

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 0]}>
        <Col span="24">
          <Form.Item label="Background Image" required>
            <UploadImage
              fileListData={image}
              onChange={setImage}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="facebookLink"
            label="Facebook Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="facebookName"
            label="Facebook Name"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label={
              <div>
                Google Map{" "}
                <a
                  rel="noreferrer"
                  href="https://www.embedgooglemap.net/"
                  target="_blank"
                >
                  Copy from here
                </a>
              </div>
            }
            name="map"
            required
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        {SeoCommon()}
      </Row>
    </Form>
  );
};

export default ContactUsConfig;

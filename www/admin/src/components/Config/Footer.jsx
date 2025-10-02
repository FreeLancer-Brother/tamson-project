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

const FooterConfig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { saving, activeKey } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  useEffect(() => {
    if (saving && activeKey === "5") {
      form
        .validateFields()
        .then(async (values) => {
          const { phoneNumber, email, location, location2, facebookLink, youtubeLink,instagramLink } =
            values;
          if (!_.get(image, "length", 0)) {
            return message.error("Image is required");
          }
          const postData = {
            configValue: {
              phoneNumber,
              email,
              location,
              location2,
              facebookLink,
              youtubeLink,
              instagramLink,
              logo: getLinkToServer(_.first(image)),
            },
          };
          try {
            const response = await agent.put(`${api.configs}/footer`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update footer successfully");
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
      const response = await agent.get(`${api.configs}/footer`);
      const data = _.get(response, "data.data.configValue");
      form.setFieldsValue({
        phoneNumber: _.get(data, "phoneNumber"),
        email: _.get(data, "email"),
        location: _.get(data, "location"),
        location2: _.get(data, "location2"),
        facebookLink: _.get(data, "facebookLink"),
        youtubeLink: _.get(data, "youtubeLink"),
        instagramLink: _.get(data, "instagramLink"),
      });
      setImage(_.compact([convertImageToObject(_.get(data, "logo"))]));
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
          <Form.Item label="Logo" required>
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
            name="phoneNumber"
            label="Phone Number"
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
            name="location"
            label="Location"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
		   <Col span="12">
          <Form.Item
            name="location2"
            label="Location 2"
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
            name="youtubeLink"
            label="Youtube Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
		  <Col span="12">
          <Form.Item
            name="instagramLink"
            label="Instagram Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FooterConfig;

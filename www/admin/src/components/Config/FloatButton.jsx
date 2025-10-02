import { Form, Input, Row, Col, Button, message, Select } from "antd";
import UploadImage from "../common/UploadImage";
import { useParams, useNavigate } from "react-router-dom";

import { useMemo, useEffect, useState } from "react";
import agent from "../../libs/agent";
import api from "../../config/api";
import _ from "lodash";
import { uuid } from "uuidv4";
import { setSaving } from "../../app/reducers/configReducer";
import { useSelector, useDispatch } from "react-redux";

const FloatButtonConfig = () => {
  const { id } = useParams();
  const { saving, activeKey } = useSelector((state) => state.config);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (saving && activeKey === "6") {
      form
        .validateFields()
        .then(async (values) => {
          const { smsLink, callLink, messageLink, zaloLink } = values;
          const postData = {
            configValue: {
              smsLink: smsLink,
              callLink: callLink,
              messageLink: messageLink,
              zalo: zaloLink,
            },
          };
          try {
            const response = await agent.put(`${api.configs}/float-buttons`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update float button successfully");
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
      const response = await agent.get(`${api.configs}/float-buttons`);
      const data = _.get(response, "data.data.configValue");
      form.setFieldsValue({
        smsLink: _.get(data, "smsLink", ""),
        callLink: _.get(data, "callLink", ""),
        messageLink: _.get(data, "messageLink", ""),
        zaloLink: _.get(data, "zalo", "Example"),
      });
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
        <Col span="12">
          <Form.Item
            name="smsLink"
            label="Sms Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="callLink"
            label="Call Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="messageLink"
            label="Message Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="zaloLink"
            label="Zalo Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FloatButtonConfig;

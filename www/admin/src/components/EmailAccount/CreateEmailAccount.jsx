import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Space,
  Switch,
  message,
  InputNumber,
} from "antd";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import agent from "../../libs/agent";
import api from "../../config/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import _ from "lodash";
import { StyledTitle } from "../common";
import UploadImage from "../common/UploadImage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  getFullLinkImage,
  getLinkToServer,
  convertImageToObject,
  getValue,
} from "../../helpers/common";

const CreateEmailAccount = ({ setLoadingOverlay }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getNews() {
      try {
        setLoadingOverlay(true);
        const response = await agent.get(`${api.emailAccount}/${id}`);
        const data = _.get(response, "data.data");
        if (!data) {
          message.error("Account not found");
          navigate("/manage/email-accounts");
          return;
        }
        form.setFieldsValue({
          email: _.get(data, "email"),
          mailServerAddress: _.get(data, "mailServerAddress"),
          mailServerPort: _.get(data, "mailServerPort"),
          isTls: _.get(data, "isTls"),
          name: _.get(data, "name"),
          password: _.get(data, "password"),
        });
        setLoadingOverlay(false);
      } catch (error) {
        setLoadingOverlay(false);
        const getMessage = _.get(error, "response.data.message", error.message);
        message.error(getMessage);
      }
    }
    if (id) {
      getNews();
    }
  }, [id]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const {
          name,
          password,
          email,
          mailServerAddress,
          mailServerPort,
          isTls,
        } = values;
        const postData = {
          email,
          name,
          password,
          mailServerAddress,
          mailServerPort,
          isTls: !!isTls,
        };

        try {
          setLoading(true);
          if (id) {
            const response = await agent.put(`${api.emailAccount}/${id}`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update email account successfully");
            }
          } else {
            const response = await agent.post(api.emailAccount, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Create email account successfully");
            }
          }
          navigate("/manage/email-accounts");
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
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <StyledTitle>{id ? "EDIT" : "CREATE"} EMAIL ACCOUNT</StyledTitle>
        <div>
          <Button
            style={{ marginRight: "1em" }}
            type="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button loading={loading} type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={[32, 0]}>
          <Col span="12">
            <Form.Item label="Name" name="name" required>
              <Input placeholder="Input name" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Email" name="email" required>
              <Input placeholder="Input email" type="email" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Password" name="password" required>
              <Input.Password placeholder="Input password" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Server Address" name="mailServerAddress" required>
              <Input placeholder="Input Server Address" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Server Port" name="mailServerPort" required>
              <InputNumber className="w-100" placeholder="Input Server Port" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              label="TSL/SSL"
              name="isTls"
              required
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateEmailAccount;

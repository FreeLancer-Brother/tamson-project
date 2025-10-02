import { Form, Input, Row, Col, Spin, message, Button } from "antd";
import { mixContent, getValue } from "../../../helpers/common";
import { useEffect, useState } from "react";
import agent from "../../../libs/agent";
import api from "../../../config/api";
import _ from "lodash";
const Brand = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [oldData, setOldData] = useState();
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await agent.get(`${api.configs}/home`);
        const data = _.get(response, "data.data.configValue");
        setOldData(data);
        const brandData = _.get(data, "brands");

        form.setFieldsValue({
          titleVi: getValue(brandData, "title", "VI"),
          titleEn: getValue(brandData, "title", "EN"),
          contentVi: getValue(brandData, "content", "VI"),
          contentEn: getValue(brandData, "content", "EN"),
        });
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
        };
        const processData = {
          title: mixContent(newData.titleVi, newData.titleEn),
          content: mixContent(newData.contentVi, newData.contentEn),
        };
        try {
          setSaving(true);
          const response = await agent.put(`${api.configs}/home`, {
            configValue: _.assignIn(oldData, {
              brands: processData,
            }),
          });
          if (_.get(response, "data.success")) {
            message.success("Update Brands successfully");
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
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 0]}>
        <Col span="24" className="d-flex justify-content-end w-100">
          <Button loading={saving} onClick={handleSave} type="primary">
            Save
          </Button>
        </Col>
        <Col span="12">
          <Form.Item
            name="titleVi"
            label="Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="titleEn"
            label="Title (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="contentVi"
            label="Content (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="contentEn"
            label="Content (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Brand;

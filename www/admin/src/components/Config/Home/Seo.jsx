import { Form, Input, Row, Col, Spin, message, Button } from "antd";
import { mixContent, getValue } from "../../../helpers/common";
import { useEffect, useState } from "react";
import agent from "../../../libs/agent";
import api from "../../../config/api";
import _ from "lodash";
import { SeoCommon } from "../../common";
const Seo = () => {
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
        const seoData = _.get(data, "seo");
        form.setFieldsValue({
          seoTitleEn: getValue(seoData, "title", "EN"),
          seoTitleVi: getValue(seoData, "title", "VI"),
          seoDescriptionVi: getValue(seoData, "description", "VI"),
          seoDescriptionEn: getValue(seoData, "description", "EN"),
          seoKeywordVi: getValue(seoData, "keyword", "VI"),
          seoKeywordEn: getValue(seoData, "keyword", "EN"),
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
        const processData = {
          title: mixContent(values.seoTitleVi, values.seoTitleEn),
          description: mixContent(
            values.seoDescriptionVi,
            values.seoDescriptionEn
          ),
          keyword: mixContent(values.seoKeywordVi, values.seoKeywordEn),
        };
        try {
          setSaving(true);
          const response = await agent.put(`${api.configs}/home`, {
            configValue: _.assignIn(oldData, {
              seo: processData,
            }),
          });
          if (_.get(response, "data.success")) {
            message.success("Update Home Seo successfully");
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
        {SeoCommon()}
      </Row>
    </Form>
  );
};

export default Seo;

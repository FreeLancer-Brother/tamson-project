import { Form, Input, Row, Col, Spin, message, Button } from "antd";
import { mixContent, getValue } from "../../helpers/common";
import { useEffect, useState } from "react";
import agent from "../../libs/agent";
import api from "../../config/api";
import _ from "lodash";
import { SeoCommon } from "../common";
import { setSaving } from "../../app/reducers/configReducer";
import { useSelector, useDispatch } from "react-redux";
const NewsConfig = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const { saving, activeKey } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  async function getData() {
    try {
      setLoading(true);
      const response = await agent.get(`${api.configs}/news`);
      const data = _.get(response, "data.data.configValue");
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (saving && activeKey === "7") {
      form
        .validateFields()
        .then(async (values) => {
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
            },
          };

          try {
            const response = await agent.put(`${api.configs}/news`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update News Config successfully");
            }
            getData();
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

  return loading ? (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spin />
    </div>
  ) : (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 0]}>{SeoCommon()}</Row>
    </Form>
  );
};

export default NewsConfig;

import { Form, Input, Row, Col, Spin, message, Button, Select } from "antd";
import { useEffect, useState } from "react";
import agent from "../../libs/agent";
import api from "../../config/api";
import _ from "lodash";
import { SeoCommon } from "../common";
import { setSaving } from "../../app/reducers/configReducer";
import { useSelector, useDispatch } from "react-redux";
import UploadImage from "../common/UploadImage";
import { useParams, useNavigate } from "react-router-dom";
import {
  mixContent,
  getLinkToServer,
  getValue,
  convertImageToObject,
} from "../../helpers/common";

const { Option } = Select;

const CommonConfig = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [emailAccountOptions, setEmailAccountOptions] = useState([]);
  const [selectedEmailAccount, setSelectedEmailAccount] = useState("");
  const { saving, activeKey } = useSelector((state) => state.config);
  const [favicon, setFavicon] = useState([]);
  const dispatch = useDispatch();

  async function getData() {
    try {
      setLoading(true);
      const response = await agent.get(`${api.configs}/common`);
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
      setSelectedEmailAccount(_.get(data, "mainEmailContact"));
      setFavicon(_.compact([convertImageToObject(_.get(data, "faviconImage"))]));
      const _response = await agent.get(`${api.emailAccount}/options`);
      const _data = _.get(_response, "data.data");
      if (_data) setEmailAccountOptions(_data);
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
    if (saving && activeKey === "8") {
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
              mainEmailContact: selectedEmailAccount,
              faviconImage: getLinkToServer(_.first(favicon)),
            },
          };

          try {
            const response = await agent.put(`${api.configs}/common`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update Common Config successfully");
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
      <Row gutter={[16, 0]}>
        <SeoCommon />
        <Col span="12">
          <Form.Item
            label="Main Email use for contact"
            name="mainEmailContact"
            valuePropName="option"
            required
          >
            <Select
              placeholder="Select a yacht"
              value={selectedEmailAccount}
              onChange={setSelectedEmailAccount}
            >
              {(emailAccountOptions || []).map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name} {`<${item.email}>`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Favicon" required>
            <UploadImage
              fileListData={favicon}
              onChange={setFavicon}
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

export default CommonConfig;

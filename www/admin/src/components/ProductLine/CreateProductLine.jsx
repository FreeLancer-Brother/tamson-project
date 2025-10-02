import { Form, Input, Row, Col, Button, message, Select } from "antd";
import { StyledTitle, SeoCommon } from "../common";
import UploadImage from "../common/UploadImage";
import { useParams, useNavigate } from "react-router-dom";
import {
  stringToSlug,
  mixContent,
  getLinkToServer,
  getValue,
  convertImageToObject,
} from "../../helpers/common";
import { useCallback, useEffect, useState } from "react";
import agent from "../../libs/agent";
import api from "../../config/api";
import _ from "lodash";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadPlugin from "../../libs/CKUpload";

const CreateProductLine = ({ setLoadingOverlay }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listYatchType, setListYatchType] = useState([]);
  const [selectedYatchType, setSelectedYatchType] = useState("");
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  useEffect(() => {
    async function getYachtType() {
      try {
        setLoadingOverlay(true);
        const response = await agent.get(`${api.productLines}/${id}`);
        const data = _.get(response, "data.data");
        if (!data) {
          message.error("Product line not found");
          navigate("/manage/product-lines");
          return;
        }
        const seoData = _.get(data, "seo", {});
        form.setFieldsValue({
          nameVi: getValue(data, "name", "VI"),
          nameEn: getValue(data, "name", "EN"),
          seoTitleEn: getValue(seoData, "title", "EN"),
          seoTitleVi: getValue(seoData, "title", "VI"),
          seoDescriptionVi: getValue(seoData, "description", "VI"),
          seoDescriptionEn: getValue(seoData, "description", "EN"),
          seoKeywordVi: getValue(seoData, "keyword", "VI"),
          seoKeywordEn: getValue(seoData, "keyword", "EN"),
          order: _.get(data, "order", 0),
        });
        setContentVi(getValue(data, "content", "VI"));
        setContentEn(getValue(data, "content", "EN"));
        setSelectedYatchType(_.get(data, "yatchType"));
        setImage(_.compact([convertImageToObject(_.get(data, "image"))]));
        setLoadingOverlay(false);
      } catch (error) {
        setLoadingOverlay(false);
        const getMessage = _.get(error, "response.data.message", error.message);
        message.error(getMessage);
      }
    }
    if (id) {
      getYachtType();
    }
  }, [id]);

  useEffect(() => {
    async function getBrands() {
      const response = await agent.get(api.yatchTypes, {
        params: {
          page: 1,
          pageSize: 2000,
        },
      });
      setListYatchType(_.get(response, "data.data", []));
    }
    try {
      getBrands();
    } catch (error) {
      message.error(error.message);
    }
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { nameVi, nameEn, order } = values;

        if (!_.get(image, "length", 0)) {
          return message.error("Image is missing");
        }
        if (!selectedYatchType) {
          return message.error("Please select one yacht type");
        }
        try {
          setLoading(true);

          const postData = {
            content: mixContent(contentVi, contentEn),
            name: mixContent(nameVi, nameEn),
            image: getLinkToServer(_.first(image)),
            yatchType: selectedYatchType,
            order,
            seo: {
              title: mixContent(values.seoTitleVi, values.seoTitleEn),
              description: mixContent(
                values.seoDescriptionVi,
                values.seoDescriptionEn
              ),
              keyword: mixContent(values.seoKeywordVi, values.seoKeywordEn),
            },
          };

          if (id) {
            const response = await agent.put(`${api.productLines}/${id}`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update product line successfully");
            }
          } else {
            const response = await agent.post(api.productLines, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Create product line successfully");
            }
          }
          navigate("/manage/product-lines");
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
        <StyledTitle>{id ? "EDIT" : "CREATE"} PRODUCT LINE</StyledTitle>
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
        <Row gutter={[16, 0]}>
          <Col span="12">
            <Form.Item
              name="nameVi"
              label="Name (VI)"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name="nameEn"
              label="Name (EN)"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span="12">
            <Form.Item name="order" label="Order">
              <Input />
            </Form.Item>
          </Col>
          <Col span="12"></Col>

          <Col span="12">
            <Form.Item label="Content (VN)" required>
              <CKEditor
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                editor={ClassicEditor}
                data={contentVi}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContentVi(data);
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
                data={contentEn}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContentEn(data);
                }}
              />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Yacht Type" required>
              <Select
                placeholder="Select a yacht"
                value={selectedYatchType}
                onChange={setSelectedYatchType}
              >
                {listYatchType.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {getValue(item, "name")}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item name="name" label="Main Image">
              <UploadImage
                fileListData={image}
                onChange={setImage}
                maxImage={1}
                width="200px"
                height="200px"
              />
            </Form.Item>
          </Col>
          {SeoCommon()}
        </Row>
      </Form>
    </div>
  );
};

export default CreateProductLine;

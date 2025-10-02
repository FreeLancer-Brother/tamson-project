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

const CreateYatchType = ({ setLoadingOverlay }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listBrand, setListBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  useEffect(() => {
    async function getYachtType() {
      try {
        setLoadingOverlay(true);
        const response = await agent.get(`${api.yatchTypes}/${id}`);
        const data = _.get(response, "data.data");
        if (!data) {
          message.error("yacht type not found");
          navigate("/manage/yacht-types");
          return;
        }
        const seoData = _.get(data, "seo", {});
        form.setFieldsValue({
          slug: _.get(data, "slug", ""),
          nameVi: getValue(data, "name", "VI"),
          nameEn: getValue(data, "name", "EN"),
          seoTitleEn: getValue(seoData, "title", "EN"),
          seoTitleVi: getValue(seoData, "title", "VI"),
          seoDescriptionVi: getValue(seoData, "description", "VI"),
          seoDescriptionEn: getValue(seoData, "description", "EN"),
          seoKeywordVi: getValue(seoData, "keyword", "VI"),
          seoKeywordEn: getValue(seoData, "keyword", "EN"),
        });
        setContentVi(getValue(data, "content", "VI"));
        setContentEn(getValue(data, "content", "EN"));
        setSelectedBrand(_.get(data, "brand"));
        setImage(_.compact([convertImageToObject(_.get(data, "image"))]));
        setLoadingOverlay(false);
      } catch (error) {
        const getMessage = _.get(error, "response.data.message", error.message);
        message.error(getMessage);
        setLoadingOverlay(false);
      }
    }
    if (id) {
      getYachtType();
    }
  }, [id]);

  useEffect(() => {
    async function getBrands() {
      const response = await agent.get(api.brands, {
        params: {
          page: 1,
          pageSize: 2000,
        },
      });
      setListBrand(_.get(response, "data.data", []));
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
        const { slug, nameVi, nameEn } = values;

        if (!_.get(image, "length", 0)) {
          return message.error("Image is missing");
        }
        if (!selectedBrand) {
          return message.error("Please select one brand");
        }
        try {
          setLoading(true);

          const postData = {
            content: mixContent(contentVi, contentEn),
            name: mixContent(nameVi, nameEn),
            slug,
            image: getLinkToServer(_.first(image)),
            brand: selectedBrand,
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
            const response = await agent.put(`${api.yatchTypes}/${id}`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update yacht type successfully");
            }
          } else {
            const response = await agent.post(api.yatchTypes, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Create yacht type successfully");
            }
          }
          navigate("/manage/yacht-types");
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
      .finally(() => setLoading(true));
  };

  const handleKeyUpName = useCallback(
    _.debounce(() => {
      const name = form.getFieldValue("nameEn");
      const slug = stringToSlug(name);
      form.setFieldsValue({
        slug,
      });
    }, 200),
    []
  );

  return (
    <div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <StyledTitle>{id ? "EDIT" : "CREATE"} YACHT TYPE</StyledTitle>
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
              <Input onKeyUp={handleKeyUpName} />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Brand" required>
              <Select
                placeholder="Select a brand"
                value={selectedBrand}
                onChange={setSelectedBrand}
              >
                {listBrand.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

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

export default CreateYatchType;

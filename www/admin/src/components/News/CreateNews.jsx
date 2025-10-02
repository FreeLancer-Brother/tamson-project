import { Form, Input, Button, Col, Row, message, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import agent from "../../libs/agent";
import api from "../../config/api";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import { StyledTitle, SeoCommon } from "../common";
import UploadImage from "../common/UploadImage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  getLinkToServer,
  convertImageToObject,
  getValue,
  mixContent,
  stringToSlug,
} from "../../helpers/common";
import uploadPlugin from "../../libs/CKUpload";

const User = ({ setLoadingOverlay }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getNews() {
      try {
        setLoading(true);
        setLoadingOverlay(true);
        const response = await agent.get(`${api.news}/${id}`);
        const data = _.get(response, "data.data");
        if (!data) {
          message.error("News not found");
          navigate("/manage/news");
          return;
        }
        const seoData = _.get(data, "seo", {});
        const vietnameseTitle = getValue(data, "title", "VI");
        
        form.setFieldsValue({
          titleVn: vietnameseTitle,
          titleEn: getValue(data, "title", "EN"),
          seoTitleEn: getValue(seoData, "title", "EN"),
          seoTitleVi: getValue(seoData, "title", "VI"),
          seoDescriptionVi: getValue(seoData, "description", "VI"),
          seoDescriptionEn: getValue(seoData, "description", "EN"),
          seoKeywordVi: getValue(seoData, "keyword", "VI"),
          seoKeywordEn: getValue(seoData, "keyword", "EN"),
          slug: _.get(data, 'slug') || stringToSlug(vietnameseTitle), // Ưu tiên slug đã có, nếu không thì tạo mới
        });

        setContentVi(getValue(data, "content", "VI") || "");
        setContentEn(getValue(data, "content", "EN") || "");
        setImage(_.compact([convertImageToObject(_.get(data, "image"))]));
        setLoading(false);
        setLoadingOverlay(false);
      } catch (error) {
        const getMessage = _.get(error, "response.data.message", error.message);
        message.error(getMessage);
        setLoading(false);
        setLoadingOverlay(false);
      }
    }
    if (id) {
      getNews();
    }
  }, [id, form, navigate, setLoadingOverlay]);

  // Sử dụng debounce của lodash để tránh gọi hàm liên tục khi gõ nhanh
  const debouncedSlugGeneration = useCallback(
    _.debounce((value) => {
      const slug = stringToSlug(value);
      form.setFieldsValue({ slug });
    }, 300), // Đợi 300ms sau khi người dùng ngừng gõ
    [form]
  );

  const handleTitleVnChange = (e) => {
    debouncedSlugGeneration(e.target.value);
  };


  const handleSubmit = () => {
    if (!image.length) {
      return message.error("Image not found!");
    }
    if (!contentVi) {
      return message.error("Content (VI) not found !");
    }
    if (!contentEn) {
      return message.error("Content (EN) not found !");
    }
    form
      .validateFields()
      .then(async (values) => {
        const postData = {
          type: "NEWS",
          seo: {
            title: mixContent(values.seoTitleVi, values.seoTitleEn),
            description: mixContent(
              values.seoDescriptionVi,
              values.seoDescriptionEn
            ),
            keyword: mixContent(values.seoKeywordVi, values.seoKeywordEn),
          },
          title: [
            {
              language: "VI",
              content: values.titleVn,
            },
            {
              language: "EN",
              content: values.titleEn,
            },
          ],
          content: [
            {
              language: "VI",
              content: contentVi,
            },
            {
              language: "EN",
              content: contentEn,
            },
          ],
          image: getLinkToServer(_.first(image)),
          slug: values.slug,
        };

        try {
          setLoading(true);
          if (id) {
            await agent.put(`${api.news}/${id}`, { ...postData });
            message.success("Update news successfully");
          } else {
            await agent.post(api.news, { ...postData });
            message.success("Create news successfully");
          }
          navigate("/manage/news");
        } catch (error) {
          const getMessage = _.get(
            error,
            "response.data.message",
            error.message
          );
          message.error(getMessage);
        } finally {
            setLoading(false);
        }
      })
      .catch((err) => {
          console.log("Validation Failed:", err);
      });
  };

  return (
    <div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <StyledTitle>{id ? "EDIT" : "CREATE"} NEWS</StyledTitle>
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
            <Form.Item label="Title (VI)" name="titleVn" required>
              <Input placeholder="Input title" onChange={handleTitleVnChange} />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Title (EN)" name="titleEn" required>
              <Input placeholder="Input title" />
            </Form.Item>
          </Col>

          <Col span="24">
            <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span="12">
            <Form.Item label="Content (VI)" required>
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
          <Col span="24">
            <Form.Item label="Image" required>
              <UploadImage
                maxImage={1}
                width="200px"
                height="200px"
                fileListData={image}
                onChange={setImage}
              />
            </Form.Item>
          </Col>

          {SeoCommon()}
        </Row>
      </Form>
    </div>
  );
};

export default User;

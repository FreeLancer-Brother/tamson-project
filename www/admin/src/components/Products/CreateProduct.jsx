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
import { useMemo, useEffect, useState, useCallback } from "react";
import agent from "../../libs/agent";
import api from "../../config/api";
import _ from "lodash";
import { uuid } from "uuidv4";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadPlugin from "../../libs/CKUpload";

const CreateProduct = ({ setLoadingOverlay }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProductLines, setListProductLines] = useState([]);
  const [selectedProductLine, setSelectedProductLine] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [tabContents, setTabContents] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [interiorDesignVi, setInteriorDesignVi] = useState("");
  const [interiorDesignEn, setInteriorDesignEn] = useState("");
  const [galleries, setGalleries] = useState([]);

  const handleAddSpecifications = () => {
    const newSpe = [
      ...specifications,
      { labelVi: "", labelEn: "", valueVi: "", valueEn: "", id: uuid() },
    ];
    setSpecifications(newSpe);
  };

  useEffect(() => {
    async function getProduct() {
      try {
        setLoadingOverlay(true);
        const response = await agent.get(`${api.products}/${id}`);
        const data = _.get(response, "data.data");
        if (!data) {
          message.error("Product not found");
          navigate("/manage/products");
          return;
        }
        const seoData = _.get(data, "seo", {});
        form.setFieldsValue({
          nameVi: getValue(data, "name", "VI"),
          nameEn: getValue(data, "name", "EN"),
          slug: _.get(data, "slug"),
          order: _.get(data, "order", 0),
          seoTitleEn: getValue(seoData, "title", "EN"),
          seoTitleVi: getValue(seoData, "title", "VI"),
          seoDescriptionVi: getValue(seoData, "description", "VI"),
          seoDescriptionEn: getValue(seoData, "description", "EN"),
          seoKeywordVi: getValue(seoData, "keyword", "VI"),
          seoKeywordEn: getValue(seoData, "keyword", "EN"),
          brochureLink: _.get(data, "brochureLink"),
        });
        setContentVi(getValue(data, "content", "VI"));
        setContentEn(getValue(data, "content", "EN"));
        setInteriorDesignVi(getValue(data, "interiorDesign", "VI"));
        setInteriorDesignEn(getValue(data, "interiorDesign", "EN"));
        setSelectedProductLine(_.get(data, "productLine"));
        setImage(_.compact([convertImageToObject(_.get(data, "image"))]));
        setBannerImage(
          _.compact([convertImageToObject(_.get(data, "bannerImage"))])
        );

        const processGallery = _.compact(
          _.map(_.get(data, "galleries", []), (item) => convertImageToObject(item))
        );

        setGalleries(processGallery);

        const processSpec = _.map(_.get(data, "specifications", []), (item) => {
          return {
            labelVi: getValue(item, "label", "VI"),
            labelEn: getValue(item, "label", "EN"),
            valueVi: getValue(item, "value", "VI"),
            valueEn: getValue(item, "value", "EN"),
            id: uuid(),
          };
        });

        const processTabContent = _.map(
          _.get(data, "tabContents", []),
          (item) => {
            return {
              labelVi: getValue(item, "label", "VI"),
              labelEn: getValue(item, "label", "EN"),
              contentVi: getValue(item, "content", "VI"),
              contentEn: getValue(item, "content", "EN"),
              id: uuid(),
            };
          }
        );

        const processDesigners = _.map(_.get(data, "designers", []), (item) => {
          return {
            positionVi: getValue(item, "position", "VI"),
            positionEn: getValue(item, "position", "EN"),
            name: item.name,
            image: [convertImageToObject(item.image)],
            id: uuid(),
          };
        });

        setSpecifications(processSpec);
        setTabContents(processTabContent);
        setDesigners(processDesigners);
        setLoadingOverlay(false);
      } catch (error) {
        const getMessage = _.get(error, "response.data.message", error.message);
        message.error(getMessage);
        setLoadingOverlay(false);
      }
    }
    if (id) {
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    async function getProductLines() {
      const response = await agent.get(api.productLines, {
        params: {
          page: 1,
          pageSize: 2000,
        },
      });
      setListProductLines(_.get(response, "data.data", []));
    }
    try {
      getProductLines();
    } catch (error) {
      message.error(error.message);
    }
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { nameVi, nameEn, slug, brochureLink, order } = values;

        if (!_.get(image, "length", 0)) {
          return message.error("Image is missing");
        }

        if (!_.get(bannerImage, "length", 0)) {
          return message.error("Banner Image is missing");
        }

        if (!selectedProductLine) {
          return message.error("Please select one product line");
        }
        try {
          setLoading(true);

          const processSpec = _.map(specifications, (item) => {
            if (
              !item.labelVi ||
              !item.labelEn ||
              !item.valueVi ||
              !item.valueEn
            ) {
              return message.error("Some specification missing content");
            }
            return {
              label: mixContent(item.labelVi, item.labelEn),
              value: mixContent(item.valueVi, item.valueEn),
            };
          });

          const processTabContent = _.map(tabContents, (item) => {
            if (!item.labelVi || !item.labelEn) {
              return message.error("Some tab content missing content");
            }
            return {
              label: mixContent(item.labelVi, item.labelEn),
              content: mixContent(item.contentVi, item.contentEn),
            };
          });

          const processDesigners = _.map(designers, (item) => {
            if (
              !item.name ||
              !item.positionEn ||
              !item.positionVi ||
              !_.get(item, "image", "length", 0)
            ) {
              return message.error("Some designer missing content");
            }
            return {
              position: mixContent(item.positionVi, item.positionEn),
              image: getLinkToServer(_.first(item.image)),
              name: item.name,
            };
          });

          const processGallery = _.map(galleries, (link) =>
              getLinkToServer(link)
            );

          const postData = {
            content: mixContent(contentVi, contentEn),
            name: mixContent(nameVi, nameEn),
            image: getLinkToServer(_.first(image)),
            bannerImage: getLinkToServer(_.first(bannerImage)),
            interiorDesign: mixContent(interiorDesignVi, interiorDesignEn),
            productLine: selectedProductLine,
            slug,
            order,
            brochureLink,
            specifications: processSpec,
            tabContents: processTabContent,
            designers: processDesigners,
            galleries: processGallery,
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
            const response = await agent.put(`${api.products}/${id}`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update product successfully");
            }
          } else {
            const response = await agent.post(api.products, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Create product successfully");
            }
          }
          navigate("/manage/products");
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

  const onChangeSpecification = (id, label, value) => {
    const newSpe = _.map(specifications, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setSpecifications(newSpe);
  };

  const handleAddTabContent = () => {
    const newTabs = [
      ...tabContents,
      { labelVi: "", labelEn: "", valueVi: [], valueEn: [], id: uuid() },
    ];
    setTabContents(newTabs);
  };

  const onChangeTabContent = (id, label, value, image = false) => {
    const newTabs = _.map(tabContents, (item) => {
      if (item.id === id) {
        if (image) {
          item.contentVi = value;
          item.contentEn = value;
        } else {
          item[label] = value;
        }
      }
      return item;
    });
    setTabContents(newTabs);
  };

  const handleAddDesigner = () => {
    const newDesigner = [
      ...designers,
      {
        name: "",
        image: [],
        positionVi: "",
        positionEn: "",
        id: uuid(),
      },
    ];
    setDesigners(newDesigner);
  };

  const onChangeDesigner = (id, label, value) => {
    const newDesigners = _.map(designers, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setDesigners(newDesigners);
  };

  const handleRemove = (collection, id) => {
    let getCollection = [];
    let setFunc = null;
    switch (collection) {
      case "spec":
        getCollection = specifications;
        setFunc = setSpecifications;
        break;
      case "tab":
        getCollection = tabContents;
        setFunc = setTabContents;
        break;
      case "designer":
        getCollection = designers;
        setFunc = setDesigners;
      default:
        break;
    }
    const newCollection = _.filter(getCollection, (item) => item.id !== id);
    setFunc(newCollection);
  };

  const renderSpecification = useMemo(() => {
    return specifications.map((item) => (
      <>
        <Col span="5">
          <Form.Item label="Label (VI)" required>
            <Input
              value={_.get(item, "labelVi")}
              onChange={(e) =>
                onChangeSpecification(item.id, "labelVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="5">
          <Form.Item label="Detail (VI)" required>
            <Input
              value={_.get(item, "valueVi")}
              onChange={(e) =>
                onChangeSpecification(item.id, "valueVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="5">
          <Form.Item label="Label (EN)" required>
            <Input
              value={_.get(item, "labelEn")}
              onChange={(e) =>
                onChangeSpecification(item.id, "labelEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="5">
          <Form.Item label="Detail (EN)" required>
            <Input
              value={_.get(item, "valueEn")}
              onChange={(e) =>
                onChangeSpecification(item.id, "valueEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item label="&nbsp;">
            <Button onClick={() => handleRemove("spec", item.id)} type="dashed">
              Remove
            </Button>
          </Form.Item>
        </Col>
      </>
    ));
  }, [specifications]);

  const renderTabContent = useMemo(() => {
    return tabContents.map((item) => (
      <>
        <Col span="12">
          <Form.Item label="Label (VI)" required>
            <Input
              value={_.get(item, `labelVi`)}
              onChange={(e) =>
                onChangeTabContent(item.id, "labelVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Label (EN)" required>
            <Input
              value={_.get(item, `labelEn`)}
              onChange={(e) =>
                onChangeTabContent(item.id, "labelEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="10">
          <Form.Item label="Content (VI)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, `contentVi`)}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeTabContent(item.id, "contentVi", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="10">
          <Form.Item label="Content (EN)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, `contentEn`)}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeTabContent(item.id, "contentEn", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item label="&nbsp;">
            <Button onClick={() => handleRemove("tab", item.id)} type="dashed">
              Remove
            </Button>
          </Form.Item>
        </Col>
      </>
    ));
  }, [tabContents]);

  const renderDesigner = useMemo(() => {
    return designers.map((item) => (
      <>
        <Col span="12">
          <Form.Item label="Name" required>
            <Input
              value={_.get(item, `name`)}
              onChange={(e) =>
                onChangeDesigner(item.id, "name", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Position (VI)" required>
            <Input
              value={_.get(item, `positionVi`)}
              onChange={(e) =>
                onChangeDesigner(item.id, "positionVi", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Position (EN)" required>
            <Input
              value={_.get(item, `positionEn`)}
              onChange={(e) =>
                onChangeDesigner(item.id, "positionEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="8">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={_.get(item, `image`)}
              onChange={(value) => onChangeDesigner(item.id, "image", value)}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item label="&nbsp;">
            <Button
              onClick={() => handleRemove("designer", item.id)}
              type="dashed"
            >
              Remove
            </Button>
          </Form.Item>
        </Col>
      </>
    ));
  }, [designers]);

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
        <StyledTitle>{id ? "EDIT" : "CREATE"} PRODUCT</StyledTitle>
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

          <Col span="24">
            <Form.Item
              name="slug"
              label="Slug"
              rules={[{ required: true, message: "Slug is required" }]}
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
            <Form.Item label="Interior Design (VI)" required>
              <CKEditor
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                editor={ClassicEditor}
                data={interiorDesignVi}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setInteriorDesignVi(data);
                }}
              />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Interior Design (EN)" required>
              <CKEditor
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                editor={ClassicEditor}
                data={interiorDesignEn}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setInteriorDesignEn(data);
                }}
              />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Product Line" required>
              <Select
                placeholder="Select a product line"
                value={selectedProductLine}
                onChange={setSelectedProductLine}
              >
                {listProductLines.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {getValue(item, "name")}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item name="brochureLink" label="Brochure Link">
              <Input />
            </Form.Item>
          </Col>

          <Col span="12">
            <Form.Item name="name" label="Banner Image">
              <UploadImage
                fileListData={bannerImage}
                onChange={setBannerImage}
                maxImage={1}
                width="200px"
                height="200px"
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
          <Col span="24">
            <h4>Specifications</h4>
            <Button type="primary" onClick={handleAddSpecifications}>
              Add
            </Button>
          </Col>
          {renderSpecification}
          <Col span="24">
            <h4 className="mt-4">Tab content</h4>
            <Button
              className="mb-4"
              type="primary"
              onClick={handleAddTabContent}
            >
              Add
            </Button>
          </Col>
          {renderTabContent}

          <Col span="24">
            <Form.Item label="Gallery">
              <UploadImage
                fileListData={galleries}
                onChange={setGalleries}
                width="200px"
                height="200px"
              />
            </Form.Item>
          </Col>

          <Col span="24">
            <h4 className="">Designers</h4>
            <Button className="mb-4" type="primary" onClick={handleAddDesigner}>
              Add
            </Button>
          </Col>

          {renderDesigner}
          {SeoCommon()}
        </Row>
      </Form>
    </div>
  );
};

export default CreateProduct;

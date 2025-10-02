import { Form, Input, Row, Col, Button, message, Select, Spin, InputNumber } from "antd";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import agent from "../../libs/agent";
import api from "../../config/api";
import _ from "lodash";
import { uuid } from "uuidv4";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadPlugin from "../../libs/CKUpload";

function processCollection(collection) {
  return _.map(collection, (item) => ({
    image: getLinkToServer(_.first(item.image)),
    title: mixContent(item.titleVi, item.titleEn),
  }));
}

const CreateService = ({ setLoadingOverlay }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [headImage, setHeadImage] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(0);
  const [services, setServices] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [docks, setDocks] = useState([]);
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [type2ContentVi, setType2ContentVi] = useState("");
  const [type2ContentEn, setType2ContentEn] = useState("");

  const [type3ContentVi, setType3ContentVi] = useState("");
  const [type3ContentEn, setType3ContentEn] = useState("");
  const [type3Content2Vi, setType3Content2Vi] = useState("");
  const [type3Content2En, setType3Content2En] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getService() {
      try {
        setLoadingOverlay(true);
        setLoading(true);
        const response = await agent.get(`${api.services}/${id}`);
        const data = _.get(response, "data.data");
        if (!data) {
          message.error("Service not found");
          navigate("/manage/service");
          return;
        }
        const seoData = _.get(data, "seo", {});
        const getType = _.get(data, "type");
        setType(_.get(data, "type"));

        form.setFieldsValue({
          nameVi: getValue(data, "name", "VI"),
          nameEn: getValue(data, "name", "EN"),
          slug: _.get(data, "slug"),
          seoTitleEn: getValue(seoData, "title", "EN"),
          seoTitleVi: getValue(seoData, "title", "VI"),
          seoDescriptionVi: getValue(seoData, "description", "VI"),
          seoDescriptionEn: getValue(seoData, "description", "EN"),
          seoKeywordVi: getValue(seoData, "keyword", "VI"),
          seoKeywordEn: getValue(seoData, "keyword", "EN"),
        });

        setContentVi(getValue(data, "content", "VI"));
        setContentEn(getValue(data, "content", "EN"));

        setType2ContentVi(getValue(data, "content", "VI"));
        setType2ContentEn(getValue(data, "content", "EN"));

        setType3ContentVi(getValue(data, "content", "VI"));
        setType3ContentEn(getValue(data, "content", "EN"));

        setType3Content2Vi(getValue(data, "content2", "VI"));
        setType3Content2En(getValue(data, "content2", "EN"));

        if (getType === 2) {
          form.setFieldsValue({
            type2TitleVi: getValue(data, "title", "VI"),
            type2TitleEn: getValue(data, "title", "EN"),
          });
        }

        if (getType === 3) {
          form.setFieldsValue({
            type3TitleVi: getValue(data, "title", "VI"),
            type3TitleEn: getValue(data, "title", "EN"),
          });
        }

        setImage(_.compact([convertImageToObject(_.get(data, "image"))]));
        setBackgroundImage([
          _.compact(convertImageToObject(_.get(data, "servicesBackground"))),
        ]);

        const processServices = _.map(_.get(data, "services", []), (item) => {
          return {
            titleVi: getValue(item, "title", "VI"),
            titleEn: getValue(item, "title", "EN"),
            contentVi: getValue(item, "content", "VI"),
            contentEn: getValue(item, "content", "EN"),
            image: _.compact([convertImageToObject(_.get(item, "image"))]),
            id: uuid(),
          };
        });

        const processFacilities = _.map(
          _.get(data, "facilities", []),
          (item) => {
            return {
              titleVi: getValue(item, "title", "VI"),
              titleEn: getValue(item, "title", "EN"),
              image: _.compact([convertImageToObject(_.get(item, "image"))]),
              id: uuid(),
            };
          }
        );

        const processDocks = _.map(_.get(data, "docks", []), (item) => {
          return {
            titleVi: getValue(item, "title", "VI"),
            titleEn: getValue(item, "title", "EN"),
            image: [convertImageToObject(_.get(item, "image"))],
            id: uuid(),
          };
        });

        const processGallery = _.compact(
          _.map(_.get(data, "galleries", []), (item) => convertImageToObject(item))
        );

        const processProducts = _.map(_.get(data, "products", []), (item) => {
          return {
            nameVi: getValue(item, "name", "VI"),
            nameEn: getValue(item, "name", "EN"),
            length: item.length,
            year: item.year,
            cabin: item.cabin,
            area: item.area,
            price: item.price,
            show: item.show,
            contentVi: getValue(item, "content", "VI"),
            contentEn: getValue(item, "content", "EN"),
            image1: _.compact([convertImageToObject(_.get(item, "image1"))]),
            image2: _.compact([convertImageToObject(_.get(item, "image2"))]),
            image3: _.compact([convertImageToObject(_.get(item, "image3"))]),
            id: uuid(),
          };
        });

        setHeadImage(
          _.compact([convertImageToObject(_.get(data, "servicesHeadImage"))])
        );
        setDocks(processDocks);
        setServices(processServices);
        setFacilities(processFacilities);
        setGalleries(processGallery);
        setProducts(processProducts);
      } catch (error) {
        const getMessage = _.get(error, "response.data.message", error.message);
        message.error(getMessage);
        setLoadingOverlay(false);
      } finally {
        setLoadingOverlay(false);
        setLoading(false);
      }
    }
    if (id) {
      getService();
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      setGalleries([]);
      setDocks([]);
      setHeadImage([]);
      form.setFieldsValue("contentVi", "");
      form.setFieldsValue("contentEn", "");
    }
  }, [type]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { slug, nameVi, nameEn, type2TitleVi, type2TitleEn, type3TitleVi, type3TitleEn } = values;

        if (!_.get(image, "length", 0)) {
          return message.error("Main image is missing");
        }
        if (!_.get(backgroundImage, "length", 0)) {
          return message.error("Background image is missing");
        }

        try {
          // const processServices = processCollection(services);
          const processServices = _.map(services, (item) => {
            if (
              !item.titleVi ||
              !item.titleEn ||
              !item.contentVi ||
              !item.contentEn
            ) {
              return message.error("Some service missing content");
            }

            return {
              title: mixContent(item.titleVi, item.titleEn),
              content: mixContent(item.contentVi, item.contentEn),
              image: getLinkToServer(_.first(item.image)),
              id: uuid(),
            };
          });

          const processFacilities = processCollection(facilities);

          const processProducts = _.map(products, (item) => {
            if (
              !item.nameVi ||
              !item.nameEn ||
              !item.contentVi ||
              !item.contentEn
            ) {
              return message.error("Some product missing content");
            }

            return {
              name: mixContent(item.nameVi, item.nameEn),
              length: item.length,
              year: item.year,
              cabin: item.cabin,
              area: item.area,
              price: item.price,
              show: item.show,
              content: mixContent(item.contentVi, item.contentEn),
              image1: getLinkToServer(_.first(item.image1)),
              image2: getLinkToServer(_.first(item.image2)),
              image3: getLinkToServer(_.first(item.image3)),
              id: uuid(),
            };
          });

          const postData = {
            services: processServices,
            facilities: processFacilities,
            products: processProducts,
            type: type,
            name: mixContent(nameVi, nameEn),
            slug,
            image: getLinkToServer(_.first(image)),
            servicesBackground: getLinkToServer(_.first(backgroundImage)),
            seo: {
              title: mixContent(values.seoTitleVi, values.seoTitleEn),
              description: mixContent(
                values.seoDescriptionVi,
                values.seoDescriptionEn
              ),
              keyword: mixContent(values.seoKeywordVi, values.seoKeywordEn),
            },
          };

          if (type !== 2) {
            const processGallery = _.map(galleries, (link) =>
              getLinkToServer(link)
            );
            const processContent = mixContent(contentVi, contentEn);
            postData["galleries"] = processGallery;
            postData["content"] = processContent;
          }

          if (type === 2) {
            const processTitle    = mixContent(type2TitleVi, type2TitleEn);
            const processContent  = mixContent(type2ContentVi, type2ContentEn);

            postData["title"]   = processTitle;
            postData["content"] = processContent;

            const processDocks = processCollection(docks);
            const servicesHeadImage = getLinkToServer(_.first(headImage));

            postData["docks"] = processDocks;
            postData["servicesHeadImage"] = servicesHeadImage;
          }

          if (type === 3) {
            const processContent = mixContent(type3ContentVi, type3ContentEn);
            const processContent2 = mixContent(type3Content2Vi, type3Content2En);
            const processTitle = mixContent(type3TitleVi, type3TitleEn);

            postData["content"] = processContent;
            postData["content2"] = processContent2;
            postData["title"] = processTitle;
          }

          setLoading(true);

          if (id) {
            const response = await agent.put(`${api.services}/${id}`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update service successfully");
            }
          } else {
            const response = await agent.post(api.services, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Create service successfully");
            }
          }
          navigate("/manage/services");
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

  const handleRemove = (collection, id) => {
    let getCollection = [];
    let setFunc = null;
    switch (collection) {
      case "service":
        getCollection = services;
        setFunc = setServices;
        break;
      case "facility":
        getCollection = facilities;
        setFunc = setFacilities;
        break;
      case "dock":
        getCollection = docks;
        setFunc = setDocks;
      case "product":
        getCollection = products;
        setFunc = setProducts;
      default:
        break;
    }
    const newCollection = _.filter(getCollection, (item) => item.id !== id);
    setFunc(newCollection);
  };

  const onChangeServiceContent = (id, label, value) => {
    const newServices = _.map(services, (item) => {
      if (item.id === id) {
          item[label] = value;
      }
      return item;
    });
    setServices(newServices);
  };

  const handleAddService = () => {
    services.push({
      titleVi: "",
      titleEn: "",
      contentVi: "",
      contentEn: "",
      image: [],
      id: uuid(),
    });
    setServices([...services]);
  };

  const onChangeService = (id, label, value) => {
    const newServices = _.map(services, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setServices(newServices);
  };

  const renderServices = useMemo(() => {
    return services.map((item) => (
      <>
        <Col span="12">
          <Form.Item label="Title (VI)" required>
            <Input
              value={_.get(item, `titleVi`)}
              onChange={(e) =>
                onChangeService(item.id, "titleVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Title (EN)" required>
            <Input
              value={_.get(item, `titleEn`)}
              onChange={(e) =>
                onChangeService(item.id, "titleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Description (VI)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, `contentVi`)}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeServiceContent(item.id, "contentVi", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Description (EN)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, `contentEn`)}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeServiceContent(item.id, "contentEn", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="18">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={_.get(item, `image`)}
              onChange={(value) =>
                onChangeService(item.id, "image", value, true)
              }
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label="&nbsp;">
            <Button
              onClick={() => handleRemove("service", item.id)}
              type="danger"
            >
              Remove
            </Button>
          </Form.Item>
        </Col>
      </>
    ));
  }, [services]);

  const handleAddFacility = () => {
    facilities.push({
      titleVi: "",
      titleEn: "",
      image: [],
      id: uuid(),
    });
    setFacilities([...facilities]);
  };

  const onChangeFacility = (id, label, value) => {
    const newFacilities = _.map(facilities, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setFacilities(newFacilities);
  };

  const renderFacilities = useMemo(() => {
    return facilities.map((item) => (
      <Row gutter={[16, 0]} key={item.id}>
        <Col span="12">
          <Form.Item label="Title (VI)" required>
            <Input
              value={_.get(item, `titleVi`)}
              onChange={(e) =>
                onChangeFacility(item.id, "titleVi", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Title (EN)" required>
            <Input
              value={_.get(item, `titleEn`)}
              onChange={(e) =>
                onChangeFacility(item.id, "titleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="8">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={_.get(item, `image`)}
              onChange={(value) =>
                onChangeFacility(item.id, "image", value, true)
              }
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item label="&nbsp;">
            <Button
              onClick={() => handleRemove("facility", item.id)}
              type="dashed"
            >
              Remove
            </Button>
          </Form.Item>
        </Col>
      </Row>
    ));
  }, [facilities]);

  const handleAddDock = () => {
    docks.push({
      titleVi: "",
      titleEn: "",
      image: [],
      id: uuid(),
    });
    setDocks([...docks]);
  };

  const onChangeDock = (id, label, value) => {
    const newDocks = _.map(docks, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setDocks(newDocks);
  };

  const renderDocks = useMemo(() => {
    return docks.map((item) => (
      <Row gutter={[16, 0]} key={item.id}>
        <Col span="12">
          <Form.Item label="Title (VI)" required>
            <Input
              value={_.get(item, `titleVi`)}
              onChange={(e) => onChangeDock(item.id, "titleVi", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Title (EN)" required>
            <Input
              value={_.get(item, `labelEn`)}
              onChange={(e) => onChangeDock(item.id, "titleEn", e.target.value)}
            />
          </Form.Item>
        </Col>

        <Col span="8">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={_.get(item, `image`)}
              onChange={(value) => onChangeDock(item.id, "image", value, true)}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item label="&nbsp;">
            <Button onClick={() => handleRemove("dock", item.id)} type="dashed">
              Remove
            </Button>
          </Form.Item>
        </Col>
      </Row>
    ));
  }, [docks]);

  const onChangeProductContent = (id, label, value) => {
    const newProducts = _.map(products, (item) => {
      if (item.id === id) {
          item[label] = value;
      }
      return item;
    });
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    const newProduct = [
      ...products,
      {
        nameVi: "",
        nameEn: "",
        length: "",
        year: "",
        cabin: "",
        area: "",
        price: "",
        show: "",
        image1: [],
        image2: [],
        image3: [],
        id: uuid(),
      },
    ];
    setProducts(newProduct);
  };

  const onChangeProduct = (id, label, value) => {
    console.log('label', label);
    const newProducts = _.map(products, (item) => {
      if (item.id === id) {
          if(label === 'show') {
            console.log('show', value);
          }

          item[label] = value;
      }
      return item;
    });
    setProducts(newProducts);
  };

  const renderProducts = useMemo(() => {
    return products.map((item) => (
      <>
        <Col span="12">
          <Form.Item label="Name (VI)" required>
            <Input
              value={_.get(item, `nameVi`)}
              onChange={(e) =>
                onChangeProduct(item.id, "nameVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Name (EN)" required>
            <Input
              value={_.get(item, `nameEn`)}
              onChange={(e) =>
                onChangeProduct(item.id, "nameEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="12">
          <Form.Item label="Description (VI)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, `contentVi`)}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeProductContent(item.id, "contentVi", data);
              }}
            />
          </Form.Item>
        </Col>

        <Col span="12">
          <Form.Item label="Description (EN)" required>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data={_.get(item, `contentEn`)}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeProductContent(item.id, "contentEn", data);
              }}
            />
          </Form.Item>
        </Col>

        <Col span="6">
          <Form.Item label="Image 1" required>
            <UploadImage
              fileListData={_.get(item, `image1`)}
              onChange={(value) =>
                onChangeProduct(item.id, "image1", value)
              }
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label="Image 2" required>
            <UploadImage
              fileListData={_.get(item, `image2`)}
              onChange={(value) =>
                onChangeProduct(item.id, "image2", value)
              }
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label="Image 3" required>
            <UploadImage
              fileListData={_.get(item, `image3`)}
              onChange={(value) =>
                onChangeProduct(item.id, "image3", value)
              }
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label="Type display (enter: 1, 2 or 3)">
            <InputNumber
              defaultValue={1}
              min={1}
              max={3}
              step={1}
              value={_.get(item, "show")}
              onChange={(value) => {
                console.log('click', value);
                onChangeProduct(item.id, "show", value);
              }
              }
            />
          </Form.Item>
        </Col>

        <Col span="8">
          <Form.Item label="Length">
            <Input
              value={_.get(item, "length")}
              onChange={(e) =>
                onChangeProduct(item.id, "length", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Year">
            <Input
              value={_.get(item, "year")}
              onChange={(e) =>
                onChangeProduct(item.id, "year", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Cabin">
            <Input
              value={_.get(item, "cabin")}
              onChange={(e) =>
                onChangeProduct(item.id, "cabin", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Area">
            <Input
              value={_.get(item, "area")}
              onChange={(e) =>
                onChangeProduct(item.id, "area", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Price from">
            <Input
              value={_.get(item, "price")}
              place
              onChange={(e) =>
                onChangeProduct(item.id, "price", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="8">
          <Form.Item label="&nbsp;">
            <Button
              onClick={() => handleRemove("product", item.id)}
              type="danger"
            >
              Remove
            </Button>
          </Form.Item>
        </Col>
      </>
    ));
  }, [products]);

  return loading ? (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spin />
    </div>
  ) : (
    <div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <StyledTitle>{id ? "EDIT" : "CREATE"} SERVICE</StyledTitle>
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
            <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span="12">
            <Form.Item label="Type" rules={[{ required: true }]}>
              <Select value={type} onChange={setType}>
                <Select.Option value={1}>Type 1</Select.Option>
                <Select.Option value={2}>Type 2</Select.Option>
                <Select.Option value={3}>Type 3</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {type === 3 ? (
            <>
              <Col span="12">
                <Form.Item required label="Content (VI)">
                  <CKEditor
                    config={{
                      extraPlugins: [uploadPlugin],
                    }}
                    editor={ClassicEditor}
                    data={type3ContentVi}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setType3ContentVi(data);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item required label="Content (EN)">
                  <CKEditor
                    config={{
                      extraPlugins: [uploadPlugin],
                    }}
                    editor={ClassicEditor}
                    data={type3ContentEn}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setType3ContentEn(data);
                    }}
                  />
                </Form.Item>
              </Col>
            </>
          ) : null}
          <Col span="12">
            <Form.Item label="Main Image">
              <UploadImage
                fileListData={image}
                onChange={setImage}
                maxImage={1}
                width="200px"
                height="200px"
              />
            </Form.Item>
          </Col>
          {type !== 3 ? (
            <>
              <Col span="12">
                <Form.Item label="Background">
                  <UploadImage
                    fileListData={backgroundImage}
                    onChange={setBackgroundImage}
                    maxImage={1}
                    width="200px"
                    height="200px"
                  />
                </Form.Item>
              </Col>

              <Col span="24">
                <h5>Services</h5>
                <Button type="primary" onClick={handleAddService}>
                  Add
                </Button>
              </Col>

              {renderServices}

              <Col span="24" className="mt-3">
                <h5>Facilities</h5>
                <Button type="primary" onClick={handleAddFacility}>
                  Add
                </Button>
              </Col>
              <Col span="24">{renderFacilities}</Col>

              <Col span="24" className="mt-3">
                <h5>Type {type} addon info</h5>
              </Col>
              {type === 1 ? (
                <>
                  <Col span="12">
                    <Form.Item name="contentVi" label="Content (VI)">
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
                    <Form.Item name="contentEn" label="Content (EN)">
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
                    <Form.Item label="Gallery">
                      <UploadImage
                        fileListData={galleries}
                        onChange={setGalleries}
                        width="200px"
                        height="200px"
                      />
                    </Form.Item>
                  </Col>
                </>
              ) : null}
              {type === 2 ? (
                <>
                <Col span="12">
                  <Form.Item
                    name="type2TitleVi"
                    label="Title (VI)"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span="12">
                  <Form.Item
                    name="type2TitleEn"
                    label="Title (EN)"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                  <Col span="12">
                    <Form.Item name="contentVi" label="Content (VI)">
                      <CKEditor
                        config={{
                          extraPlugins: [uploadPlugin],
                        }}
                        editor={ClassicEditor}
                        data={type2ContentVi}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setType2ContentVi(data);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span="12">
                    <Form.Item name="contentEn" label="Content (EN)">
                      <CKEditor
                        config={{
                          extraPlugins: [uploadPlugin],
                        }}
                        editor={ClassicEditor}
                        data={type2ContentEn}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setType2ContentEn(data);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span="24">
                    <Form.Item label="Head Image">
                      <UploadImage
                        fileListData={headImage}
                        onChange={setHeadImage}
                        maxImage={1}
                        width="200px"
                        height="200px"
                      />
                    </Form.Item>
                  </Col>

                  <Col span="24" className="mt-3">
                    <h5>Docks</h5>
                    <Button type="primary" onClick={handleAddDock}>
                      Add
                    </Button>
                  </Col>
                  <Col span="24">{renderDocks}</Col>
                </>
              ) : null}
            </>
          ) : null}

          {type === 3 ? (
            <>
              <Col span="24">
                <h4 className="">Products</h4>
                <Button className="mb-4" type="primary" onClick={handleAddProduct}>
                  Add
                </Button>
              </Col>

              {renderProducts}

              <Col span="12">
                <Form.Item name="type3Content2Vi" label="Content 2 (VI)">
                  <CKEditor
                    config={{
                      extraPlugins: [uploadPlugin],
                    }}
                    editor={ClassicEditor}
                    data={type3Content2Vi}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setType3Content2Vi(data);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item name="type3Content2En" label="Content 2 (EN)">
                  <CKEditor
                    config={{
                      extraPlugins: [uploadPlugin],
                    }}
                    editor={ClassicEditor}
                    data={type3Content2En}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setType3Content2En(data);
                    }}
                  />
                </Form.Item>
              </Col>

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

              <Col span="24" className="mt-3">
                <h5>Type {type} addon info</h5>
              </Col>
              <Col span="12">
                <Form.Item
                  name="type3TitleVi"
                  label="Title (VI)"
                  rules={[{ required: true, message: "Title is required" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item
                  name="type3TitleEn"
                  label="Title (EN)"
                  rules={[{ required: true, message: "Title is required" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </>
          ) : null}

          {SeoCommon()}
        </Row>
      </Form>
    </div>
  );
};

export default CreateService;

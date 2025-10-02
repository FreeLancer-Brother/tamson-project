import { Form, Input, Row, Col, Button, message, Spin } from "antd";
import UploadImage from "../common/UploadImage";
import { useParams, useNavigate } from "react-router-dom";
import {
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
import { setSaving } from "../../app/reducers/configReducer";
import { useSelector, useDispatch } from "react-redux";
import { SeoCommon } from "../common";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadPlugin from "../../libs/CKUpload";

const AboutUsConfig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sliders, setSliders] = useState([]);
  const [image, setImage] = useState([]);
  const { saving, activeKey } = useSelector((state) => state.config);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [avatar, setAvatar] = useState([]);

  const [contentMemberVi, setContentMemberVi] = useState("");
  const [contentMemberEn, setContentMemberEn] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (saving && activeKey === "2") {
      form
        .validateFields()
        .then(async (values) => {
          const {
            titleVi, titleEn,
            buttonTitleVi, buttonTitleEn,
            buttonLink,
            nameEn, nameVi,
            position,
            titleMemberVi, titleMemberEn,
          } = values;

          if (!_.get(image, "length", 0)) {
            return message.error("Image is required");
          }
          const processSlider = _.map(sliders, (item) => {
            return {
              title: mixContent(item.titleVi, item.titleEn),
              image: getLinkToServer(_.first(item.image)),
              content: mixContent(item.contentVi, item.contentEn),
              establishedIn: mixContent(
                item.establishedInVi,
                item.establishedInEn
              ),
              establishedBy: item.establishedBy,
            };
          });
          const processMembers = _.map(members, (item) => {
            return {
              namePerson: mixContent(item.namePersonVi, item.namePersonEn),
              avatar: getLinkToServer(_.first(item.avatar)),
              positionPerson: item.positionPerson,
            };
          });
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
              title: mixContent(titleVi, titleEn),
              content: mixContent(contentVi, contentEn),
              buttonTitle: mixContent(buttonTitleVi, buttonTitleEn),
              buttonLink,
              slides: processSlider,
              bannerImage: getLinkToServer(_.first(image)),

              titleMember: mixContent(titleMemberVi, titleMemberEn),
              contentMember: mixContent(contentMemberVi, contentMemberEn),
              namePerson: mixContent(nameVi, nameEn),
              avatar: getLinkToServer(_.first(avatar)),
              position,
              members: processMembers,
            },
          };
          try {
            const response = await agent.put(`${api.configs}/about-us`, {
              ...postData,
            });
            if (_.get(response, "data.success")) {
              message.success("Update about us successfully");
            }
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

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await agent.get(`${api.configs}/about-us`);
        const data = _.get(response, "data.data.configValue");
        const seoData = _.get(data, "seo", {});

        console.log('data', data);
        console.log('members', _.get(data, "members", []));

        form.setFieldsValue({
          titleVi: getValue(data, "title", "VI"),
          titleEn: getValue(data, "title", "EN"),

          buttonTitleVi: getValue(data, "buttonTitle", "VI"),
          buttonTitleEn: getValue(data, "buttonTitle", "EN"),
          buttonLink: _.get(data, "buttonLink"),

          nameVi: getValue(data, "namePerson", "VI"),
          nameEn: getValue(data, "namePerson", "EN"),
          position: _.get(data, "position", ""),

          titleMemberVi: getValue(data, "titleMember", "VI"),
          titleMemberEn: getValue(data, "titleMember", "EN"),

          seoTitleEn: getValue(seoData, "title", "EN"),
          seoTitleVi: getValue(seoData, "title", "VI"),
          seoDescriptionVi: getValue(seoData, "description", "VI"),
          seoDescriptionEn: getValue(seoData, "description", "EN"),
          seoKeywordVi: getValue(seoData, "keyword", "VI"),
          seoKeywordEn: getValue(seoData, "keyword", "EN"),
        });

        setContentVi(getValue(data, "content", "VI"));
        setContentEn(getValue(data, "content", "EN"));
        setImage(_.compact([convertImageToObject(_.get(data, "bannerImage"))]));

        setAvatar(_.compact([convertImageToObject(_.get(data, "avatar"))]));

        setContentMemberVi(getValue(data, "contentMember", "VI"));
        setContentMemberEn(getValue(data, "contentMember", "EN"));

        const processSlides = _.map(_.get(data, "slides", []), (item) => ({
          id: uuid(),
          image: _.compact([convertImageToObject(_.get(item, "image"))]),
          titleVi: getValue(item, "title", "VI"),
          titleEn: getValue(item, "title", "VI"),
          contentVi: getValue(item, "content", "VI"),
          contentEn: getValue(item, "content", "EN"),
          establishedInVi: getValue(item, "establishedIn", "VI"),
          establishedInEn: getValue(item, "establishedIn", "EN"),
          establishedBy: _.get(item, "establishedBy", ""),
        }));
        setSliders(processSlides);

        const processMembers = _.map(_.get(data, "members", []), (item) => ({
          id: uuid(),
          avatar: _.compact([convertImageToObject(_.get(item, "avatar"))]),
          namePersonVi: getValue(item, "namePerson", "VI"),
          namePersonEn: getValue(item, "namePerson", "En"),
          positionPerson: _.get(item, "positionPerson", ""),
        }));
        setMembers(processMembers);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleRemove = (id) => {
    const newCollection = _.filter(sliders, (item) => item.id !== id);
    setSliders(newCollection);
  };

  const handleRemoveMember = (id) => {
    const newCollection = _.filter(members, (item) => item.id !== id);
    setMembers(newCollection);
  };

  const handleAddSlide = () => {
    const newSliders = [
      ...sliders,
      {
        image: [],
        titleVi: "",
        titleEn: "",
        contentVi: "",
        contentEn: "",
        establishedInVi: "",
        establishedInEn: "",
        establishedBy: "",
        id: uuid(),
      },
    ];
    setSliders(newSliders);
  };

  const handleAddMember = () => {
    const newMembers = [
      ...members,
      {
        avatar: [],
        namePersonVi: "",
        namePersonEn: "",
        positionPerson: "",
        id: uuid(),
      },
    ];
    setMembers(newMembers);
  };

  const onChangeSlider = (id, label, value) => {
    const newSliders = _.map(sliders, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setSliders(newSliders);
  };

  const onChangeMember = (id, label, value) => {
    const newMembers = _.map(members, (item) => {
      if (item.id === id) {
        item[label] = value;
      }
      return item;
    });
    setMembers(newMembers);
  };

  const renderSliders = useMemo(() => {
    return sliders.map((item) => (
      <Row style={{ display: 'none' }} gutter={[16, 0]} id={item.id}>
        <Col span="12">
          <Form.Item label="Title (VI)" required>
            <Input
              value={_.get(item, "titleVi")}
              onChange={(e) =>
                onChangeSlider(item.id, "titleVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Title (EN)" required>
            <Input
              value={_.get(item, "titleEn")}
              onChange={(e) =>
                onChangeSlider(item.id, "titleEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Content (VI)" required>
            <CKEditor  config={{
                  extraPlugins: [uploadPlugin],
                }}
              editor={ClassicEditor}
              data={_.get(item, "contentVi")}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeSlider(item.id, "contentVi", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Content (EN)" required>
            <CKEditor  config={{
                  extraPlugins: [uploadPlugin],
                }}
              editor={ClassicEditor}
              data={_.get(item, "contentEn")}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChangeSlider(item.id, "contentEn", data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Established In (VI)" required>
            <Input
              value={_.get(item, "establishedInVi")}
              onChange={(e) =>
                onChangeSlider(item.id, "establishedInVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Established In (EN)" required>
            <Input
              value={_.get(item, "establishedInEn")}
              onChange={(e) =>
                onChangeSlider(item.id, "establishedInEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="12">
          <Form.Item label="Established By" required>
            <Input
              value={_.get(item, "establishedBy")}
              onChange={(e) =>
                onChangeSlider(item.id, "establishedBy", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="20">
          <Form.Item label="Image" required>
            <UploadImage
              fileListData={_.get(item, `image`)}
              onChange={(value) => onChangeSlider(item.id, "image", value)}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item label="&nbsp;">
            <Button onClick={() => handleRemove(item.id)} type="dashed">
              Remove
            </Button>
          </Form.Item>
        </Col>
      </Row>
    ));
  }, [sliders]);

  const renderMembers = useMemo(() => {
    return members.map((item) => (
      <Row gutter={[16, 0]} id={`${item.id}-member`} key={`${item.id}-member`}>
        <Col span="12">
          <Form.Item label="Name (VI)" required>
            <Input
              value={_.get(item, "namePersonVi")}
              onChange={(e) =>
                onChangeMember(item.id, "namePersonVi", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item label="Name (EN)" required>
            <Input
              value={_.get(item, "namePersonEn")}
              onChange={(e) =>
                onChangeMember(item.id, "namePersonEn", e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col span="10">
          <Form.Item label="Position">
            <Input
              value={_.get(item, "positionPerson")}
              onChange={(e) =>
                onChangeMember(item.id, "positionPerson", e.target.value)
              }
            />
          </Form.Item>
        </Col>

        <Col span="10">
          <Form.Item label="Avatar" required>
            <UploadImage
              fileListData={_.get(item, `avatar`)}
              onChange={(value) => onChangeMember(item.id, "avatar", value)}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item name="removeMember" label="&nbsp;">
            <Button onClick={() => handleRemoveMember(item.id)} type="danger">
              Remove
            </Button>
          </Form.Item>
        </Col>
      </Row>
    ));
  }, [members]);

  return loading ? (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spin />
    </div>
  ) : (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 0]}>
        <Col span="24">
          <Form.Item label="Banner Image" required>
            <UploadImage
              fileListData={image}
              onChange={setImage}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
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
          <Form.Item label="Content (VI)" required>
            <CKEditor  config={{
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
            <CKEditor  config={{
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
        <Col span="8">
          <Form.Item
            name="buttonTitleVi"
            label="Button Title (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="buttonTitleEn"
            label="Button Title (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item
            name="buttonLink"
            label="Button Link"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="24" style={{ display: 'none' }}>
          <h5>Sliders</h5>
          <Button type="primary" onClick={handleAddSlide}>
            Add
          </Button>
        </Col>
        <Col span="24">{renderSliders}</Col>

        <Col span="12">
          <Form.Item
            name="nameEn"
            label="Name CEO (Eng)"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="nameVi"
            label="Name CEO (Vi)"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item name="avatar" label="Avatar">
            <UploadImage
              fileListData={avatar}
              onChange={setAvatar}
              maxImage={1}
              width="200px"
              height="200px"
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="position"
            label="Position"
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span="12">
          <Form.Item
            name="titleMemberVi"
            label="Title Member (VI)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            name="titleMemberEn"
            label="Title Member (EN)"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item name="contentMemberVi" label="Content Member (VI)" required>
            <CKEditor config={{
              extraPlugins: [uploadPlugin],
            }}
              editor={ClassicEditor}
              data={contentMemberVi}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContentMemberVi(data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item name="contentMemberEn" label="Content Member (EN)" required>
            <CKEditor config={{
              extraPlugins: [uploadPlugin],
            }}
              editor={ClassicEditor}
              data={contentMemberEn}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContentMemberEn(data);
              }}
            />
          </Form.Item>
        </Col>

        <Col span="24">
          <h5>Members</h5>
          <Button name="addMember" type="primary" onClick={handleAddMember}>
            Add
          </Button>
        </Col>
        <Col span="24">{renderMembers}</Col>

        {SeoCommon()}
      </Row>
    </Form>
  );
};

export default AboutUsConfig;

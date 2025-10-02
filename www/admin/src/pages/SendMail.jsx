import {
  List,
  Button,
  message,
  Input,
  Row,
  Col,
  Modal,
  Spin,
  Select,
} from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import agent from "../libs/agent";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { StyledTitle } from "../components/common";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import uploadPlugin from "../libs/CKUpload";
const { confirm } = Modal;
const { Option } = Select;

const SendMail = () => {
  const [emailData, setEmailData] = useState([]);
  const { currentEmail } = useSelector((state) => state.emailAccount);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [content, setContent] = useState("");
  const [listReceiver, setListReceiver] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(_.get(currentEmail, "email"));
  }, [currentEmail]);

  const onAddReceiver = (email) => {
    if (!email) return;
    listReceiver.push(_.trim(email));
    setListReceiver([..._.uniq(listReceiver)]);
  };

  const handleRemove = (email) => {
    const newList = _.filter(listReceiver, (item) => item !== email);
    setListReceiver(newList);
  };

  useEffect(() => {
    async function fetchEmail() {
      try {
        setLoading(true);
        const response = await agent.get(api.emailAccount, {
          params: {
            page: 1,
            pageSize: 1000,
          },
        });
        setEmailData(_.get(response, "data.data", []));
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEmail();
  }, []);

  const handleSendMail = (email, title, content, listReceiver) => {
    const findEmail = _.find(emailData, (item) => item.email === email);
    if (!findEmail) {
      return message.error("Something wrong! Try again!!");
    }
    if (!title) {
      return message.error("Title is empty!!");
    }
    if (!content) {
      return message.error("Content is empty!!");
    }
    if (!listReceiver.length) {
      return message.error("List receiver is empty!! ");
    }
    const postData = {
      emails: listReceiver,
      subject: title,
      content: content,
    };
    confirm({
      title: `Are you sure to send mail from ${email}?`,
      icon: <SendOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          agent
            .post(`${api.emailAccount}/${findEmail._id}/send-email`, {
              ...postData,
            })
            .then((value) => {
              message.success("Send mail successfully");
              resolve();
            })
            .catch((error) => {
              message.error(error.message);
              reject();
            });
        });
      },
      onCancel() {},
    });
  };

  return loading ? (
    <div className="w-100 d-flex align-items-center justify-content-center h-100">
      <Spin />
    </div>
  ) : (
    <StyledContent>
      <div className="d-flex mb-4 w-100 justify-content-between align-items-center">
        <StyledTitle>SEND MAIL</StyledTitle>
        <div>
          <Button type="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            type="primary"
            onClick={() => handleSendMail(email, title, content, listReceiver)}
          >
            Send Email
          </Button>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <h6>Email</h6>
          <Select
            showSearch
            value={email}
            onChange={setEmail}
            style={{ width: "100%" }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {emailData.map((item) => (
              <Option key={item.email} value={item.email}>
                {item.name} - {item.email}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span="18">
          <h6>Email Title</h6>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
        <Col span="24">
          <h6>Email Content</h6>
          <CKEditor
            config={{
              extraPlugins: [uploadPlugin],
            }}
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log("Editor is ready to use!", editor);
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "200px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
          />
        </Col>
        <Col span="6">
          <h6>Receiver</h6>
          <Input
            type="email"
            placeholder="Input email and enter to add"
            allowClear
            onPressEnter={(e) => {
              onAddReceiver(e.target.value);
              e.target.value = "";
            }}
          />
        </Col>
        <Col span="18">
          <h6>List Receiver</h6>
          <List
            bordered
            itemLayout="horizontal"
            dataSource={listReceiver}
            renderItem={(item) => (
              <List.Item>
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <div>{item}</div>
                  <CloseOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemove(item)}
                  />
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </StyledContent>
  );
};

const StyledContent = styled.div`
  .ck-editor__main {
    height: 30vh;
  }
  .ck-content {
    height: 100%;
  }
`;

export default SendMail;

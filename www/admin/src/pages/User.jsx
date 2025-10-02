import { Form, Input, Row, Col, Button, message } from "antd";
import { StyledTitle } from "../components/common";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import agent from "../libs/agent";
import api from "../config/api";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { setUser } from "../app/reducers/userReducer";

const User = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await agent.get(`${api.auth}/profile`);
        const data = _.get(response, "data.data");
        if (!data) {
          message.error("User not found");
          navigate("/");
          return;
        }

        form.setFieldsValue({
          name: _.get(data, "name", ""),
          username: _.get(data, "username", ""),
          email: _.get(data, "email", ""),
        });
      } catch (error) {
        const getMessage = _.get(error, "response.data.message", error.message);
        message.error(getMessage);
      }
    }

    getUser();
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { name, username, email } = values;

        try {
          setLoading(true);

          const postData = {
            name,
            username,
            email,
          };

          const response = await agent.post(`${api.auth}/profile`, {
            ...postData,
          });
          if (_.get(response, "data.success")) {
            message.success("Update user successfully");
            dispatch(setUser(_.get(response, "data.data")));
            navigate("/");
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
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <StyledTitle>EDIT USER</StyledTitle>
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
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name="username"
              label="User Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default User;

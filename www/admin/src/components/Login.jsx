import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import agent from "../libs/agent";
import api from "../config/api";
import _ from "lodash";
import { setToken } from "../helpers/token";
import { useEffect, useState } from "react";
import { setUser } from "../app/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 2em;
  font-family: Inter;
`;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    form.resetFields();
  }, []);

  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          setLoading(true);
          const response = await agent.post(api.authentication, {
            username: values.username,
            password: values.password,
          });
          if (_.get(response, "data.success")) {
            const token = _.get(response, "data.data.access_token");
            setToken(token);
            message.success("Đăng nhập thành công");
            const user = _.get(response, "data.data.user");
            dispatch(setUser(user));
            navigate("/");
          } else {
            message.error("Login fail");
          }
          setLoading(false);
        } catch (error) {
          const getMessage = _.get(
            error,
            "response.data.message",
            error.message
          );
          message.error(getMessage);
          setLoading(false);
        }
      })
      .catch((error) => {
        const getMessage = _.get(error, "response.data.message", error.message);

        message.error(getMessage);
      });
  };

  const handleEnter = (event) => {
    if (loading) return;
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="d-flex w-100 flex-column align-items-center">
      <div className="d-flex w-100 justify-content-center align-items-center">
        <StyledTitle>LOGIN</StyledTitle>
      </div>
      <Form
        layout="vertical"
        form={form}
        labelCol={{ span: 8, offset: 0 }}
        wrapperCol={{ span: 24, offset: 0 }}
        style={{
          width: "40vw",
          maxWidth: "500px",
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onKeyPress={handleEnter} />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} onClick={handleSubmit} type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

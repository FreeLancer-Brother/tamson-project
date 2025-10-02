import { Layout, Menu, Button, Modal, Form, Input, message, Spin } from "antd";
import { useState, React, useEffect } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
  EditOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  CarOutlined,
  InboxOutlined,
  NotificationOutlined,
  AccountBookOutlined,
  PhoneOutlined,
  SettingOutlined,
  ContactsFilled,
  UserOutlined,
} from "@ant-design/icons";
import News from "./pages/News";
import CreateNews from "./components/News/CreateNews";
import HomeManage from "./pages/HomeManage";
import Login from "./components/Login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, resetUser } from "./app/reducers/userReducer";
import { setToken } from "./helpers/token";
import Home from "./components/Home";
import _, { values } from "lodash";
import Brands from "./pages/Brands";
import Products from "./pages/Products";
import EditBrands from "./components/Brands/EditBrands";
import YatchType from "./pages/YatchType";
import CreateYatchType from "./components/YatchType/CreateYatchType";
import Social from "./pages/Social";
import CreateProduct from "./components/Products/CreateProduct";
import ProductLines from "./pages/ProductLine";
import CreateProductLine from "./components/ProductLine/CreateProductLine";
import styled from "styled-components";
import { getToken } from "./helpers/token";
import EmailAccount from "./pages/EmailAccount";
import Contacts from "./pages/Contacts";
import CreateEmailAccount from "./components/EmailAccount/CreateEmailAccount";
import SendMail from "./pages/SendMail";
import Services from "./pages/Services";
import CreateService from "./components/Services/CreateService";
import Config from "./pages/Config";
import agent from "./libs/agent";
import User from "./pages/User";
import api from "./config/api";
const { Header, Sider, Content } = Layout;

const DEFAULT_MENU = [
  // {
  //   title: "Home",
  //   icon: <GlobalOutlined />,
  //   link: "/manage/home",
  // },

  {
    title: "Brands",
    icon: <ApartmentOutlined />,
    link: "/manage/brands",
  },
  {
    title: "Yacht Type",
    icon: <CarOutlined />,
    link: "/manage/yacht-types",
  },
  {
    title: "Product Lines",
    icon: <InboxOutlined />,
    link: "/manage/product-lines",
  },
  {
    title: "Products",
    icon: <InboxOutlined />,
    link: "/manage/products",
  },
  {
    title: "Services",
    icon: <SettingOutlined />,
    link: "/manage/services",
  },
  {
    title: "News",
    icon: <FileOutlined />,
    link: "/manage/news",
  },
  {
    title: "Email Account",
    icon: <AccountBookOutlined />,
    link: "/manage/email-accounts",
  },
  {
    title: "Contacts",
    icon: <ContactsFilled />,
    link: "/manage/contacts",
  },
  {
    title: "Config",
    icon: <SettingOutlined />,
    link: "/manage/config",
  },
  // {
  //   title: "Phone",
  //   icon: <PhoneOutlined />,
  //   link: "/manage/phones",
  // },
  // {
  //   title: "Social",
  //   icon: <NotificationOutlined />,
  //   link: "/manage/social",
  // },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [modalChangePass, setModalChangePass] = useState(false);
  const [loadingChangePass, setLoadingChangePass] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    async function checkUser() {
      const result = await dispatch(fetchUser());
      if (!result) {
        navigate("/login");
      }
    }

    checkUser();

    agent.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (_.get(error, "response.data.statusCode") === 401) {
          return navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    if (_.get(user, "email")) {
      setMenus(DEFAULT_MENU);
    }
  }, [user]);

  const onChangePass = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const { newPass, rePass, curPass } = values;
        console.log(newPass, rePass);
        if (newPass !== rePass) {
          return message.error("Password not match");
        }
        try {
          setLoadingChangePass(true);
          const postData = {
            currentPassword: curPass,
            newPassword: newPass,
          };

          const response = await agent.post(`${api.auth}/change-password`, {
            ...postData,
          });
          if (_.get(response, "data.success")) {
            message.success("Change password successfully");
            setModalChangePass(false);
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
      .finally(() => setLoadingChangePass(false));
  };

  useEffect(() => {
    form.resetFields();
  }, [modalChangePass]);

  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" onClick={() => navigate("/")} />
        <Menu theme="dark" mode="inline">
          {menus.map((item, key) => (
            <Menu.Item
              key={key.toString()}
              icon={item.icon}
              onClick={() => navigate(item.link)}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: "0 40px 0 0" }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div>
              {collapsed ? (
                <MenuUnfoldOutlined className="trigger" onClick={toggle} />
              ) : (
                <MenuFoldOutlined className="trigger" onClick={toggle} />
              )}
            </div>
            {location.pathname === "/login" ? null : (
              <div className="d-flex align-items-center">
                <div
                  style={{ marginRight: "10px" }}
                  className="d-flex align-items-center mr-3"
                >
                  <UserOutlined style={{ marginRight: "6px" }} />
                  {user.name}
                </div>
                {location.pathname === "/manage/users" ? null : (
                  <Button
                    style={{ marginLeft: "1em" }}
                    type="primary"
                    onClick={() => {
                      navigate("/manage/users");
                    }}
                  >
                    Edit User
                  </Button>
                )}

                <Button
                  style={{ marginLeft: "1em" }}
                  type="primary"
                  onClick={() => {
                    setModalChangePass(true);
                  }}
                >
                  Change Password
                </Button>

                <Button
                  style={{ marginLeft: "1em" }}
                  type="primary"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                    setMenus([]);
                    dispatch(resetUser());
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            minHeight: 280,
            position: "relative",
            overflow: loading ? "hidden" : "auto",
          }}
        >
          {loading ? (
            <StyledOverlay>
              <Spin />
            </StyledOverlay>
          ) : null}

          <StyledContent>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/manage/yacht-types" element={<YatchType />} />
              <Route
                path="/manage/yacht-types/create"
                element={<CreateYatchType />}
              />
              <Route
                path="/manage/yacht-types/:id"
                element={<CreateYatchType setLoadingOverlay={setLoading}/>}
              />
              <Route path="/manage/send-email" element={<SendMail />} />
              <Route path="/manage/users" element={<User />} />
              <Route path="/manage/news" element={<News />} />
              <Route path="/manage/news/create" element={<CreateNews />} />
              <Route
                path="/manage/news/:id"
                element={<CreateNews setLoadingOverlay={setLoading} />}
              />
              <Route path="/manage/contacts" element={<Contacts />} />
              <Route path="/manage/email-accounts" element={<EmailAccount />} />
              <Route
                path="/manage/email-accounts/create"
                element={<CreateEmailAccount />}
              />
              <Route
                path="/manage/email-accounts/:id"
                element={<CreateEmailAccount setLoadingOverlay={setLoading}/>}
              />
              <Route path="/manage/home" element={<HomeManage />} />
              <Route path="/manage/social" element={<Social />} />
              <Route path="/manage/brands" element={<Brands />} />
              <Route path="/manage/brands/:id" element={<EditBrands setLoadingOverlay={setLoading}/>} />
              <Route path="/manage/brands/create" element={<EditBrands />} />
              <Route path="/manage/products" element={<Products />} />
              <Route
                path="/manage/products/create"
                element={<CreateProduct />}
              />
              <Route
                path="/manage/products/:id"
                element={<CreateProduct setLoadingOverlay={setLoading} />}
              />
              <Route path="/manage/product-lines" element={<ProductLines />} />
              <Route
                path="/manage/product-lines/:id"
                element={<CreateProductLine setLoadingOverlay={setLoading}/>}
              />
              <Route
                path="/manage/product-lines/create"
                element={<CreateProductLine />}
              />
              <Route path="*" element={<Home />} />
              <Route path="/manage/services" element={<Services />} />'
              <Route
                path="/manage/services/create"
                element={<CreateService />}
              />
              <Route path="/manage/services/:id" element={<CreateService setLoadingOverlay={setLoading}/>} />
              <Route path="/manage/config" element={<Config />} />'
            </Routes>
          </StyledContent>
          <Modal
            title="Change Password"
            visible={modalChangePass}
            onOk={onChangePass}
            confirmLoading={loadingChangePass}
            onCancel={() => setModalChangePass(false)}
            destroyOnClose
          >
            <Form form={form} layout="vertical">
              <Form.Item name="curPass" label="Current Password" required>
                <Input.Password allowCLear autoComplete="off" />
              </Form.Item>
              <Form.Item name="newPass" label="New Password" required>
                <Input.Password allowCLear />
              </Form.Item>
              <Form.Item name="rePass" label="Re-enter New Password" required>
                <Input.Password allowCLear />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

const StyledContent = styled.div`
  max-width: 100%;
  height: 100%;
  padding: 24px;
`;

const StyledOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(1, 1, 1, 0.1);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;

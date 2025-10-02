import styled from "styled-components";
import { Tabs, Button, message, Input, Row, Col, Modal } from "antd";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/api";
import agent from "../libs/agent";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { StyledTitle } from "../components/common";
import Home from "../components/Config/Home/index.jsx";
import AboutUsConfig from "../components/Config/AboutUs";
import ContactUsConfig from "../components/Config/ContactUs";
import HeaderConfig from "../components/Config/Header";
import FooterConfig from "../components/Config/Footer";
import FloatButtonConfig from "../components/Config/FloatButton";
import { setActiveKey, setSaving } from "../app/reducers/configReducer";
import NewsConfig from "../components/Config/News";
import CommonConfig from "../components/Config/Common";
const { confirm } = Modal;
const { TabPane } = Tabs;
const Config = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { activeKey, saving } = useSelector((state) => state.config);
  const TABS_DATA = [
    {
      id: "1",
      render: <Home />,
      label: "Home",
    },
    {
      id: "2",
      render: <AboutUsConfig />,
      label: "About Us",
    },
    {
      id: "3",
      render: <ContactUsConfig />,
      label: "Contact Us",
    },
    {
      id: "4",
      render: <HeaderConfig />,
      label: "Header",
    },
    {
      id: "5",
      render: <FooterConfig />,
      label: "Footer",
    },
    {
      id: "6",
      render: <FloatButtonConfig />,
      label: "Float Button",
    },
    {
      id: "7",
      render: <NewsConfig />,
      label: "News",
    },
    {
      id: "8",
      render: <CommonConfig />,
      label: "Common",
    },
  ];

  const dispatch = useDispatch();
  return (
    <div>
      <div className="d-flex mb-4 w-100 justify-content-between align-items-center">
        <StyledTitle>CONFIG</StyledTitle>
        {activeKey !== "1" && (
          <Button
            loading={saving}
            type="primary"
            onClick={() => dispatch(setSaving(true))}
          >
            Save
          </Button>
        )}
      </div>
      <Tabs
        activeKey={activeKey}
        onChange={(value) => dispatch(setActiveKey(value))}
      >
        {TABS_DATA.map((item) => (
          <TabPane tab={item.label} key={item.id}>
            {item.render}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Config;

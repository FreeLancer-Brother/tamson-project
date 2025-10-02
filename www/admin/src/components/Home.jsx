import styled from "styled-components";
import { useSelector } from "react-redux";
import { message } from "antd";
import api from "../config/api";
import agent from "../libs/agent";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
const StyledHome = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);

  return <StyledHome></StyledHome>;
};

export default Home;

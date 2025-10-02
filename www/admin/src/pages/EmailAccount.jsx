import styled from "styled-components";
import { Table, Button, message, Input, Row, Col, Modal } from "antd";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/api";
import agent from "../libs/agent";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { StyledTitle } from "../components/common";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { setCurrentEmail } from "../app/reducers/emailAccountReducer";
const { confirm } = Modal;

const EmailAccount = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const [totalPage, setTotalPage] = useState(0);
  const currentPageRef = useRef(1);
  const searchTextRef = useRef("");
  const pageSizeRef = useRef(10);
  const dispatch = useDispatch();
  const [defaultEmail, setDefaultEmail] = useState("");
  const [commonContent, setCommonContent] = useState(null);

  // useEffect(() => {
  //   sourceSelectedRef.current = sourceSelected;
  // }, [sourceSelected]);

  //   useEffect(() => {
  //     searchTextRef.current = searchText;
  //   }, [searchText]);

  // useEffect(() => {
  //   fetchData(1, 10, date, sourceSelected);
  // }, []);

  async function fetchData(
    page = currentPageRef.current,
    pageSize = pageSizeRef.current
  ) {
    try {
      setLoading(true);
      const [response, responseCommon] = await Promise.all([
        agent.get(api.emailAccount, {
          params: {
            page,
            pageSize,
          },
        }),
        agent.get(`${api.configs}/common`),
      ]);

      setDefaultEmail(
        _.get(responseCommon, "data.data.configValue.mainEmailContact")
      );

      setCommonContent(_.get(responseCommon, "data.data.configValue"));

      setTotalPage(_.get(response, "data.total", 0));
      setTimeout(() => {
        setData(_.get(response, "data.data", []));
      }, 200);
      setLoading(false);
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  }

  const handleTableChange = useCallback(
    _.debounce(async (pagination) => {
      const fetchId = ++fetchIdRef.current;
      // Set the loading state
      const current = _.get(pagination, "current", 1);
      currentPageRef.current = current;
      const pageSize = _.get(pagination, "pageSize", 10);
      pageSizeRef.current = pageSize;
      if (fetchId === fetchIdRef.current) {
        await fetchData(current, pageSize, searchTextRef);
      }
    }, 300),
    []
  );

  //   const handleSearch = () => {
  //     currentPageRef.current = 1;
  //     fetchData(1, pageSizeRef.current, searchText);
  //   };

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  const handleSetDefault = async (record, commonContent) => {
    const postData = {
      configValue: {
        ...commonContent,
        mainEmailContact: record._id,
      },
    };
    try {
      const response = await agent.put(`${api.configs}/common`, {
        ...postData,
      });
      setDefaultEmail(record._id);
      message.success("Set default success")
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = (record) => {
    confirm({
      title: `Do you want to delete account ${_.get(record, "email")}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          agent
            .delete(`${api.emailAccount}/${record._id}`)
            .then((value) => {
              message.success("Delete successfully");
              fetchData();
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

  const handleSend = (email) => {
    dispatch(setCurrentEmail(email));
    navigate("/manage/send-email");
  };

  const columns = [
    {
      title: "Email",
      key: "email",
      render: (record) => {
        return (
          <Link to={`/manage/email-accounts/${record._id}`}>
            {record.email}
          </Link>
        );
      },
    },
    {
      title: "Name",
      key: "name",
      render: (record) => {
        return (
          <Link to={`/manage/email-accounts/${record._id}`}>{record.name}</Link>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button
            onClick={() => navigate(`/manage/email-accounts/${record._id}`)}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleSend(record)}
            type="primary"
            style={{ margin: "0 10px" }}
          >
            Send Mail
          </Button>
          <Button
            onClick={() => handleSetDefault(record, commonContent)}
            type="primary"
            style={{ margin: "0 10px" }}
            disabled={record._id === defaultEmail}
          >
            SET DEFAULT
          </Button>
          <Button onClick={() => handleDelete(record)} type="dashed">
            Delete
          </Button>
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex mb-4 w-100 justify-content-between align-items-center">
        <StyledTitle>LIST EMAIL ACCOUNTS</StyledTitle>
        <div>
          <Button
            type="primary"
            onClick={() => navigate("/manage/email-accounts/create")}
          >
            Create
          </Button>
        </div>
      </div>
      {/* <Row className="mb-3">
        <Col span="4">
          <Input.Search
            placeholder="Input search title"
            value={searchText}
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
      </Row> */}
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          position: ["bottomRight"],
          total: totalPage,
          pageSize: pageSizeRef.current,
          current: currentPageRef.current,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default EmailAccount;

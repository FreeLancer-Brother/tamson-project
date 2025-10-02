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
import { CSVLink } from "react-csv";
const { confirm } = Modal;

const Contacts = () => {
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
  const [loadingExport, setLoadingExport] = useState(false);
  const [dataExport, setDataExport] = useState("");

  // useEffect(() => {
  //   sourceSelectedRef.current = sourceSelected;
  // }, [sourceSelected]);

  //   useEffect(() => {
  //     searchTextRef.current = searchText;
  //   }, [searchText]);

  // useEffect(() => {
  //   fetchData(1, 10, date, sourceSelected);
  // }, []);

  const handleExport = async (event, done) => {
    try {
      setLoadingExport(true);
      const response = await agent.get(`${api.contact}/export`, {});
      setDataExport(_.get(response, "data"));
      console.log(11111, _.get(response, "data"));
      setTimeout(() => {
        done(true);
      }, 200);
    } catch (error) {
      message.error(error.message);
      done(false);
    } finally {
      setLoadingExport(false);
    }
  };

  async function fetchData(
    page = currentPageRef.current,
    pageSize = pageSizeRef.current
  ) {
    try {
      setLoading(true);
      const response = await agent.get(api.contact, {
        params: {
          page,
          pageSize,
        },
      });
      setTotalPage(_.get(response, "data.total", 0));
      setTimeout(() => {
        const results = _.get(response, "data.data", []).map( row => ({
          key: row._id,
          id: row._id,
          comment: row.comment,
          createdAt: row.createdAt,
          email: row.email,
          fullname: row.fullname,
          phone: row.phone,
          type: row.type,
          updatedAt: row.updatedAt
        }));
        setData(results);
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

  const columns = [
    {
      title: "Email",
      key: "email",
      render: (record) => {
        return <span>{record.email}</span>;
      },
    },
    {
      title: "Phone",
      key: "phone",
      render: (record) => {
        return <span>{record.phone}</span>;
      },
    },
    {
      title: "Name",
      key: "fullname",
      render: (record) => {
        return <span>{record.fullname}</span>;
      },
    },
    {
      title: "Comment",
      key: "comment",
      render: (record) => {
        return <span>{record.comment}</span>;
      },
    },
    {
      title: "Type",
      key: "type",
      render: (record) => {
        return <span>{record.type}</span>;
      },
    },
    {
      title: "Time",
      key: "date",
      render: (record) => {
        return <span>{new Date(record.createdAt).toLocaleString("vi")}</span>;
      },
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex mb-4 w-100 justify-content-between align-items-center">
        <StyledTitle>LIST CONTACTS</StyledTitle>
        <div>
          <CSVLink
            style={{ textDecoration: "none" }}
            data={dataExport}
            filename={"contact.csv"}
            target="_blank"
            asyncOnClick={true}
            onClick={handleExport}
          >
            <Button
              disabled={!_.get(data, "length", 0)}
              type="primary"
              style={{ marginRight: "10px" }}
              loading={loadingExport}
            >
              Export Contact
            </Button>
          </CSVLink>
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

export default Contacts;

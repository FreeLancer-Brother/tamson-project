import styled from "styled-components";
import { Table, Button, message, Input, Row, Col, Modal } from "antd";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/api";
import agent from "../libs/agent";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { StyledTitle } from "../components/common";
import moment from "moment";
import { getValue, getFullLinkImage } from "../helpers/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

const ListBrands = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const [totalPage, setTotalPage] = useState(0);
  const currentPageRef = useRef(1);
  const searchTextRef = useRef("");
  const pageSizeRef = useRef(10);

  // useEffect(() => {
  //   sourceSelectedRef.current = sourceSelected;
  // }, [sourceSelected]);

  useEffect(() => {
    searchTextRef.current = searchText;
  }, [searchText]);

  // useEffect(() => {
  //   fetchData(1, 10, date, sourceSelected);
  // }, []);

  async function fetchData(
    page = currentPageRef.current,
    pageSize = pageSizeRef.current,
    textSearch = searchTextRef.current
  ) {
    try {
      setLoading(true);
      const response = await agent.get(api.brands, {
        params: {
          page,
          pageSize,
          name: _.trim(textSearch),
        },
      });
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

  const handleSearch = () => {
    currentPageRef.current = 1;
    fetchData(1, pageSizeRef.current, searchText);
  };

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  const handleDelete = (record) => {
    confirm({
      title: `Do you want to delete brand ${record.name}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          agent
            .delete(`${api.brands}/${record._id}`)
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

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record) => {
        return (
          <Link to={`/manage/brands/${record._id}`}>
            {record.name}
          </Link>
        );
      },
    },
    {
      title: "Content (VI)",
      key: "titleVN",
      render: (record) => {
        return (
          <span dangerouslySetInnerHTML={{__html: getValue(record, "content", "VI")}} />
        );
      },
      width: "30%"
    },
    {
      title: "Content (EN)",
      key: "titleEN",
      render: (record) => {
        return (
          <span dangerouslySetInnerHTML={{__html: getValue(record, "content", "EN")}} />
        );
      },
      width: "30%"
    },
    {
      title: "Order",
      key: "order",
      align: "center",
      render: (record) => {
        return <span>{record.order ? record.order : 0}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      align: "center",
      render: (record) => moment(record).format("DD/MM/YYYY"),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <>
          <Button
            onClick={() => navigate(`/manage/brands/${record._id}`)}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record)}
            type="dashed"
            style={{ marginLeft: "10px" }}
          >
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
        <StyledTitle>LIST BRANDS</StyledTitle>
        <Button type="primary" onClick={() => navigate("/manage/brands/create")}>
          Create
        </Button>
      </div>
      <Row className="mb-3">
        <Col span="4">
          <Input.Search
            placeholder="Input search title"
            value={searchText}
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
      </Row>
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

export default ListBrands;

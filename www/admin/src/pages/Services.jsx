import styled from "styled-components";
import {
  Table,
  Button,
  message,
  Input,
  Row,
  Col,
  Modal,
  Tag,
  Select,
} from "antd";
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

const Services = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const [totalPage, setTotalPage] = useState(0);
  const currentPageRef = useRef(1);
  const selectedTypeRef = useRef("");
  const pageSizeRef = useRef(10);

  useEffect(() => {
    selectedTypeRef.current = selectedType;
    currentPageRef.current = 1;
    fetchData();
  }, [selectedType]);

  async function fetchData(
    page = currentPageRef.current,
    pageSize = pageSizeRef.current,
    type = selectedTypeRef.current
  ) {
    try {
      setLoading(true);
      const params = {
        page,
        pageSize,
      };
      if (_.get(type, "current", type)) {
        params.type = _.get(type, "current", type);
      }
      const response = await agent.get(api.services, {
        params: params,
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
        await fetchData(current, pageSize, selectedTypeRef.current);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  const handleDelete = (record) => {
    confirm({
      title: `Do you want to delete service ${getValue(record, "name", "VI")}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          agent
            .delete(`${api.services}/${record._id}`)
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
      title: "Name (VI)",
      key: "title",
      render: (record) => {
        return (
          <Link to={`/manage/services/${record._id}`}>
            {getValue(record, "name", "VI")}
          </Link>
        );
      },
    },
    {
      title: "Name (EN)",
      key: "title",
      render: (record) => {
        return (
          <Link to={`/manage/services/${record._id}`}>
            {getValue(record, "name", "EN")}
          </Link>
        );
      },
    },
    {
      title: "Type",
      key: "title",
      align: "center",
      render: (record) => {
        return <Tag>{record.type}</Tag>;
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
            onClick={() => navigate(`/manage/services/${record._id}`)}
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
        <StyledTitle>LIST SERVICES</StyledTitle>
        <Button
          type="primary"
          onClick={() => navigate("/manage/services/create")}
        >
          Create
        </Button>
      </div>
      <Row className="mb-3">
        <Col span="4">
          <Select
            placeholder="Input search title"
            value={selectedType}
            onChange={setSelectedType}
          >
            <Select.Option value="">ALL TYPE</Select.Option>
            <Select.Option value={1}>TYPE 1</Select.Option>
            <Select.Option value={2}>TYPE 2</Select.Option>
            <Select.Option value={3}>TYPE 3</Select.Option>
          </Select>
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

export default Services;

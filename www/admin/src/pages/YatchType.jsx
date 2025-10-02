import styled from "styled-components";
import { Table, Button, message, Input, Row, Col, Modal, Select } from "antd";
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

const YatchTypes = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const [totalPage, setTotalPage] = useState(0);
  const currentPageRef = useRef(1);
  const searchTextRef = useRef("");
  const pageSizeRef = useRef(10);
  const [listBrand, setListBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const selectedBrandRef = useRef("");

  useEffect(() => {
    selectedBrandRef.current = selectedBrand;
    setTimeout(() => {
      fetchData(1, 10);
    }, 200);
  }, [selectedBrand]);

  useEffect(() => {
    searchTextRef.current = searchText;
  }, [searchText]);

  // useEffect(() => {
  //   fetchData(1, 10, date, sourceSelected);
  // }, []);

  async function fetchData(
    page = currentPageRef.current,
    pageSize = pageSizeRef.current,
    brand = selectedBrandRef.current
  ) {
    try {
      setLoading(true);
      const params = {
        page,
        pageSize,
      };
      if (_.get(brand, "current", brand)) {
        params.brand = _.get(brand, "current", brand);
      }

      const response = await agent.get(api.yatchTypes, {
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
        await fetchData(current, pageSize, searchTextRef);
      }
    }, 300),
    []
  );

  // const handleSearch = () => {
  //   currentPageRef.current = 1;
  //   fetchData(1, pageSizeRef.current, searchText);
  // };

  useEffect(() => {
    async function getBrands() {
      const response = await agent.get(api.brands, {
        params: {
          page: 1,
          pageSize: 2000,
        },
      });

      setListBrand(_.get(response, "data.data", []));
    }
    try {
      fetchData(1, 10);
      getBrands();
    } catch (error) {
      message.error(error.message);
    }
  }, []);

  const handleDelete = (record) => {
    confirm({
      title: `Do you want to delete yacht type ${getValue(
        record,
        "name",
        "VI"
      )}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          agent
            .delete(`${api.yatchTypes}/${record._id}`)
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
      key: "nameVi",
      render: (record) => {
        return (
          <Link to={`/manage/yacht-types/${record._id}`}>
            {getValue(record, "name", "VI")}
          </Link>
        );
      },
    },
    {
      title: "Name (EN)",
      key: "nameEn",
      render: (record) => {
        return (
          <Link to={`/manage/yacht-types/${record._id}`}>
            {getValue(record, "name", "EN")}
          </Link>
        );
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
            onClick={() => navigate(`/manage/yacht-types/${record._id}`)}
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
        <StyledTitle>LIST YACHT TYPES</StyledTitle>
        <Button
          type="primary"
          onClick={() => navigate("/manage/yacht-types/create")}
        >
          Create
        </Button>
      </div>
      <Row className="mb-3">
        {/* <Col span="4">
          <Input.Search
            placeholder="Input search title"
            value={searchText}
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col> */}
        <Col span="3">
          <Select
            placeholder="Select a brand"
            value={selectedBrand}
            onChange={setSelectedBrand}
            style={{ width: "100%" }}
          >
            <Select.Option key={"all"} value={""}>
              ALL
            </Select.Option>
            {listBrand.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
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

export default YatchTypes;

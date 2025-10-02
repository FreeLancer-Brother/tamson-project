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

const Products = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const [totalPage, setTotalPage] = useState(0);
  const currentPageRef = useRef(1);
  const searchTextRef = useRef("");
  const pageSizeRef = useRef(10);
  const [listYatchType, setListYatchType] = useState([]);
  const [selectedYatchType, setSelectedYatchType] = useState("");
  const selectedYatchTypeRef = useRef("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    selectedYatchTypeRef.current = selectedYatchType;
    setTimeout(() => {
      fetchData(1, 10);
    }, 200);
  }, [selectedYatchType]);

  useEffect(() => {
    searchTextRef.current = searchText;
  }, [searchText]);

  // useEffect(() => {
  //   fetchData(1, 10, date, sourceSelected);
  // }, []);

  async function fetchData(
    page = currentPageRef.current,
    pageSize = pageSizeRef.current,
    productLine = selectedYatchTypeRef.current,
    searchText = searchTextRef.current
  ) {
    try {
      setLoading(true);
      const params = {
        page,
        pageSize,
      };
      if (_.get(productLine, "current", productLine)) {
        params.productLine = _.get(productLine, "current", productLine);
      }

      if (_.get(searchText, "current", searchText)) {
        params.name = _.get(searchText, "current", searchText);
      }
      const response = await agent.get(api.products, {
        params: params,
      });
      setTotalPage(_.get(response, "data.total", 0));
      setTimeout(() => {
        const processData = _.map(_.get(response, "data.data", []), (item) => {
          return {
            key: item._id,
            ...item,
          };
        });
        setData(processData);
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
        await fetchData(current, pageSize, selectedYatchTypeRef, searchTextRef);
      }
    }, 300),
    []
  );

  useEffect(() => {
    async function getBrands() {
      const response = await agent.get(api.productLines, {
        params: {
          page: 1,
          pageSize: 2000,
        },
      });

      setListYatchType(_.get(response, "data.data", []));
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
      title: `Do you want to delete product ${getValue(record, "name", "VI")}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          agent
            .delete(`${api.products}/${record._id}`)
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

  const handleDeleteMany = (records) => {
    const promises = _.map(records, (item) =>
      agent.delete(`${api.products}/${item}`)
    );
    confirm({
      title: `Do you want to delete selection products?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return Promise.all(promises)
          .then((value) => {
            message.success("Delete successfully");
            fetchData();
            setSelectedProducts([]);
          })
          .catch((error) => {
            message.error(error.message);
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
          <Link to={`/manage/products/${record._id}`}>
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
          <Link to={`/manage/products/${record._id}`}>
            {getValue(record, "name", "EN")}
          </Link>
        );
      },
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
            onClick={() => navigate(`/manage/products/${record._id}`)}
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

  const handleSearch = () => {
    currentPageRef.current = 1;
    fetchData(1, pageSizeRef.current, selectedYatchTypeRef, searchText);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex mb-4 w-100 justify-content-between align-items-center">
        <StyledTitle>LIST PRODUCTS</StyledTitle>
        <div>
          {selectedProducts.length ? (
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={() => handleDeleteMany(selectedProducts)}
            >
              Delete Selection
            </Button>
          ) : null}
          <Button
            type="primary"
            onClick={() => navigate("/manage/products/create")}
          >
            Create
          </Button>
        </div>
      </div>
      <Row className="mb-3" gutter={[32, 32]}>
        <Col span="6">
          <Input.Search
            placeholder="Input search title"
            value={searchText}
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col span="4">
          <Select
            placeholder="Select product line"
            value={selectedYatchType}
            onChange={setSelectedYatchType}
            style={{ width: "100%" }}
          >
            <Select.Option key={"all"} value={""}>
              ALL
            </Select.Option>
            {listYatchType.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {getValue(item, "name")}
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
        rowSelection={{
          selectedRowKeys: selectedProducts,

          onChange: setSelectedProducts,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Products;

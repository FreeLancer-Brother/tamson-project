import styled from "styled-components";
import { Form, Col, Input, message, Select } from "antd";
import _ from "lodash";

export const StyledTitle = styled.div`
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const SeoCommon = () => {
  return (
    <>
      <Col span="24">
        <h4>SEO</h4>
      </Col>
      <Col span="12">
        <Form.Item label="Title (VI)" name="seoTitleVi" required>
          <Input placeholder="Input" />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item label="Title (EN)" name="seoTitleEn" required>
          <Input placeholder="Input" />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item label="Description (VI)" name="seoDescriptionVi" required>
          <Input placeholder="Input" />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item label="Description (EN)" name="seoDescriptionEn" required>
          <Input placeholder="Input" />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item label="Keyword (VI)" name="seoKeywordVi" required>
          <Input placeholder="Input" />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item label="Keyword (EN)" name="seoKeywordEn" required>
          <Input placeholder="Input" />
        </Form.Item>
      </Col>
    </>
  );
};

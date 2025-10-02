import { StyledTitle } from "../components/common";
import UploadImage from "../components/common/UploadImage";
import { Row, Col, Form, Input , Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";
const Social = () => {
  const [form] = useForm();
  const navigate = useNavigate()
  const handleSubmit = ()=>{}
  return (
    <div>
        <div className="d-flex w-100 justify-content-between align-items-center">
        <StyledTitle>EDIT SOCIAL</StyledTitle>
        <div>
          <Button
            style={{ marginRight: "1em" }}
            type="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={[32, 0]}>
          <Col span="12">
            <Form.Item label="Contact Number" name="contact" required>
              <Input placeholder="Input contact number" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Email" name="email" required>
              <Input type="email" placeholder="Input email" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Youtube Link" name="youtube-link" required>
              <Input placeholder="Input youtube link" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Facebook Link" name="facebook-link" required>
              <Input placeholder="Input facebook link" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Social;

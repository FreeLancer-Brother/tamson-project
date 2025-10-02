import { StyledTitle } from "../components/common";
import UploadImage from "../components/common/UploadImage";
import { Row, Col  } from "antd";
import {useState} from 'react'
const HomeManage = () => {
  const [logoImage , setLogoImage] = useState([])
  return (
    
    <div>
      <Row gutter={[32, 32]}>
        <Col span="24">
          <div>
            <StyledTitle>Logo</StyledTitle>
            <UploadImage fileListData={logoImage} onChange={setLogoImage}  maxImage={1} width="200px" height="200px" />
          </div>
        </Col>
        <Col span="12">
          <div>
            <StyledTitle>Slider</StyledTitle>
            <UploadImage maxImage={4} width="150px" height="150px" />
          </div>
        </Col>
        <Col span="12">
          <div>
            <StyledTitle>Welcome To Trans Yatching</StyledTitle>
            <UploadImage maxImage={2} width="150px" height="150px" />
          </div>
        </Col>
        <Col span="12">
          <div>
            <StyledTitle>Our Quality Reflected by Number</StyledTitle>
            <UploadImage maxImage={3} width="150px" height="150px" />
          </div>
        </Col>
        <Col span="12">
          <div>
            <StyledTitle>Marina by Trans Yachting</StyledTitle>
            <UploadImage maxImage={5} width="150px" height="150px" />
          </div>
        </Col>
        <Col span="12">
          <div>
            <StyledTitle>Yacht Service Center By Trans Yachting</StyledTitle>
            <UploadImage maxImage={1} width="150px" height="150px" />
          </div>
        </Col>
        <Col span="12">
          <div>
            <StyledTitle>Yacth Renting Service</StyledTitle>
            <UploadImage maxImage={1} width="150px" height="150px" />
          </div>
        </Col>
      </Row>

      <div></div>
    </div>
  );
};

export default HomeManage;

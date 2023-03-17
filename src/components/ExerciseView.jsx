import React from "react";
import { Card, Typography, Col, Row, Button } from "antd";
import { GREEN_COLOR } from "../constants";
const { Paragraph } = Typography;

const ExerciseView = () => {
  return (
    <Card
      title="Workout Title"
      extra={<Button>Add Exercise</Button>}
      hoverable
      className="antd-card-margin"
    >
      <div className="min-hight">
        <Row>
          <Col span={10}>Exercise</Col>
          <Col span={7}>sets</Col>
          <Col span={7}>repes</Col>
        </Row>
        <Row>
          <Col span={10}>Exercise</Col>
          <Col span={7}>sets</Col>
          <Col span={7}>repes</Col>
        </Row>
        <Row>
          <Col span={10}>Exercise</Col>
          <Col span={7}>sets</Col>
          <Col span={7}>repes</Col>
        </Row>
        <Row>
          <Col span={10}>Exercise</Col>
          <Col span={7}>sets</Col>
          <Col span={7}>repes</Col>
        </Row>
        <Row>
          <Col span={10}>Exercise</Col>
          <Col span={7}>sets</Col>
          <Col span={7}>repes</Col>
        </Row>
      </div>
    </Card>
  );
};
export default ExerciseView;

import React, { useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { useLocation } from "react-router-dom";
import WorkoutModal from "./WorkoutModal";
import { PlusCircleOutlined } from "@ant-design/icons";
import { isPublicRoute } from "../../helper/locationHelper";

const { Search } = Input;
const ListHeader = () => {
  const location = useLocation();
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  const onModalClose = () => {
    setShowWorkoutModal(false);
  };

  const renderCreateAction = () => {
    return (
      <Row className="add-workout-btn margin-10px">
        <Col span={24} className="align-right">
          <Button onClick={() => setShowWorkoutModal(true)}>
            Create Workout <PlusCircleOutlined />
          </Button>
        </Col>
      </Row>
    );
  };

  const renderSearchAction = () => {
    return (
      <Row className="add-workout-btn margin-10px">
        <Col span={6}>
          <Search style={{ width: "100%" }} placeholder="input search text" />
        </Col>
      </Row>
    );
  };
  return (
    <>
      {!isPublicRoute(location) && renderCreateAction()}
      {showWorkoutModal && (
        <WorkoutModal
          visible={showWorkoutModal}
          onClose={onModalClose}
          mode={"create"}
        />
      )}
    </>
  );
};

export default ListHeader;

import React, { useState } from "react";
import {
  Card,
  Divider,
  Col,
  Row,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteWorkoutExerciseMutation } from "../../services/exercise";
import ExerciseModal from "./ExerciseModal";
import { useLocation } from "react-router-dom";
import { isPublicRoute } from "../../helper/locationHelper";
const { Text } = Typography;

const workoutExerciseRow = ({ workoutExercise }) => {
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const location = useLocation();
  const [deleteWorkoutExercise, { isLoading: isDeleting }] =
    useDeleteWorkoutExerciseMutation();

  const onDelete = () => {
    deleteWorkoutExercise(workoutExercise.id)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.error(err));
  };
  const onClose = () => {
    setShowExerciseModal(false);
  };
  return (
    <>
      <Card
        hoverable
        className="antd-card-margin"
        bodyStyle={{ padding: "6px" }}
      >
        <Row align="middle">
          <Col xs={{ span: 24 }} xl={{ span: 6, offset: 1 }}>
            <Text code>{workoutExercise.name}</Text>
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 5, offset: 1 }}>
            <InputNumber
              value={workoutExercise.sets}
              addonAfter="Set"
              disabled
            />
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 5, offset: 1 }}>
            <InputNumber
              value={workoutExercise.reps}
              addonAfter="Reps"
              disabled
            />
          </Col>

          {isPublicRoute(location) ? null : (
            <Col
              xs={{ span: 24 }}
              xl={{ span: 3, offset: 1 }}
              className="align-right"
            >
              <EditOutlined onClick={() => setShowExerciseModal(true)} />
              <Divider type="vertical" />
              <Popconfirm
                title="Delete"
                description="Are you sure you want to delete this exercise?"
                okText="Yes"
                cancelText="No"
                okButtonProps={{ loading: isDeleting }}
                onConfirm={onDelete}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Col>
          )}
        </Row>
      </Card>
      {showExerciseModal && (
        <ExerciseModal
          visible={showExerciseModal}
          onClose={onClose}
          mode={"edit"}
          workoutExercise={workoutExercise}
        />
      )}
    </>
  );
};

export default workoutExerciseRow;

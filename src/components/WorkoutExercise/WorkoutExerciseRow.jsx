import React from "react";
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
const { Text } = Typography;

const workoutExerciseRow = ({ exercise }) => {
  const [deleteWorkoutExercise, { isLoading: isDeleting }] =
    useDeleteWorkoutExerciseMutation();

  const onDelete = () => {
    deleteWorkoutExercise(exercise.id)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.error(err));
  };
  return (
    <Card hoverable className="antd-card-margin" bodyStyle={{ padding: "6px" }}>
      <Row align="middle">
        <Col xs={{ span: 24 }} xl={{ span: 6, offset: 1 }}>
          <Text code>{exercise.name}</Text>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 5, offset: 1 }}>
          <InputNumber value={exercise.sets} addonAfter="Set" disabled />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 5, offset: 1 }}>
          <InputNumber value={exercise.reps} addonAfter="Reps" disabled />
        </Col>

        <Col
          xs={{ span: 24 }}
          xl={{ span: 3, offset: 1 }}
          className="align-right"
        >
          <EditOutlined />
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
      </Row>
    </Card>
  );
};

export default workoutExerciseRow;

import React from "react";
import ExerciseForm from "./ExerciseForm";
import { Modal, Form } from "antd";
import {
  useCreateWorkoutExerciseMutation,
  useUpdateWorkoutExerciseMutation,
  useFetchExercisesQuery,
} from "../../services/exercise";

const toCapitlize = (word) => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const ExerciseModal = ({
  visible,
  onClose,
  mode,
  workout_id,
  workoutExercise,
}) => {
  const { data: exercises } = useFetchExercisesQuery();
  const [createWorkoutExercise, { isLoading: isCreating }] =
    useCreateWorkoutExerciseMutation();
  const [form] = Form.useForm();

  const [updateWorkoutExercise, { isLoading: isUpdating }] =
    useUpdateWorkoutExerciseMutation();

  const onCreate = (values) => {
    const { exercise_id, ...payload } = values;
    const { name, description } = exercises.find((e) => e.id === exercise_id);
    const data = {
      name,
      description,
      workout_id,
      ...payload,
    };
    createWorkoutExercise(data)
      .then(() => {
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const onUpdate = (values) => {
    const { exercise_id, ...payload } = values;
    updateWorkoutExercise({ id: workoutExercise.id, payload })
      .then(() => {
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={`${toCapitlize(mode)} Exersice`}
      open={visible}
      okText={"Save"}
      confirmLoading={isCreating || isUpdating}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (mode === "create") {
              onCreate(values);
            } else if (mode === "edit") {
              onUpdate(values);
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={onClose}
      destroyOnClose
      maskClosable={false}
    >
      <ExerciseForm
        form={form}
        exercises={exercises}
        workoutExercise={workoutExercise}
      />
    </Modal>
  );
};

export default ExerciseModal;

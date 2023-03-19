import React from "react";
import WorkoutForm from "./WorkoutForm";
import { Modal, Form } from "antd";
import {
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
} from "../../services/workout";
import { useAuth } from "../../hooks/useAuth";

const toCapitlize = (word) => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const WorkoutModal = ({ visible, onClose, mode, workout }) => {
  const auth = useAuth();
  const [form] = Form.useForm();
  const [createWorkout, { isLoading: isCreating }] = useCreateWorkoutMutation();
  const [updateWorkout, { isLoading: isUpdating }] = useUpdateWorkoutMutation();

  const onCreate = (values) => {
    createWorkout({
      ...values,
      profile_id: auth.user.id,
    })
      .then(() => {
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const onUpdate = (payload) => {
    updateWorkout({ id: workout.id, payload })
      .then(() => {
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={`${toCapitlize(mode)} Workout`}
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
      <WorkoutForm form={form} workout={workout} />
    </Modal>
  );
};

export default WorkoutModal;

import React from "react";
import { Form, InputNumber, Select } from "antd";

const getExerciseOptins = (exercises) => {
  return (exercises || []).map((e) => {
    return { label: e.name, value: e.id, key: e.id };
  });
};

const AddExerciseForm = ({ form, exercises }) => {
  return (
    <Form
      name="new_form"
      className="margin-left"
      preserve={false}
      // initialValues={initialValues}
      labelCol={{ span: 4 }}
      form={form}
    >
      <Form.Item
        label="Exercise"
        name="exercise_id"
        rules={[{ required: true, message: "Please Select Type Of Exercise!" }]}
      >
        <Select options={getExerciseOptins(exercises)} />
      </Form.Item>
      <Form.Item
        label="Sets"
        name="sets"
        rules={[{ required: true, message: "Please Select Type Of Exercise!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Reps"
        name="reps"
        rules={[{ required: true, message: "Please Select Type Of Exercise!" }]}
      >
        <InputNumber />
      </Form.Item>
    </Form>
  );
};

export default AddExerciseForm;

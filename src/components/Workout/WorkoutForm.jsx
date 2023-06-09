import React from "react";
import { Form, Input, Select } from "antd";
const { TextArea } = Input;
const typeOptions = [
  {
    value: "back",
    label: "Back",
  },
  {
    value: "legs",
    label: "Legs",
  },
  {
    value: "neck",
    label: "Neck",
  },
  {
    value: "fullbody",
    label: "Full Body",
  },
];

const levelOptions = [
  {
    value: "hard",
    label: "Hard",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "reguler",
    label: "Reguler",
  },
];
const WorkoutForm = ({ form, workout }) => {
  return (
    <Form
      form={form}
      name="new_form"
      className="margin-left"
      preserve={false}
      initialValues={workout}
      labelCol={{ span: 4 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please Enter Name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please Select Type Of Workout!" }]}
      >
        <Select options={typeOptions} />
      </Form.Item>

      <Form.Item
        label="Level"
        name="level"
        rules={[{ required: true, message: "Please Select Level Of Workout!" }]}
      >
        <Select options={levelOptions} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default WorkoutForm;

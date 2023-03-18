import React from "react";
import { Menu } from "antd";
import { ContainerOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const items = [
  {
    label: "My Workouts",
    key: "my_workouts",
    icon: <ContainerOutlined />,
  },
  {
    label: "Public Workouts",
    key: "public_Workouts",
    icon: <UsergroupAddOutlined />,
  },
];

const WorkoutSidebar = () => {
  return (
    <Menu defaultSelectedKeys={["my_workouts"]} mode="inline" items={items} />
  );
};

export default WorkoutSidebar;

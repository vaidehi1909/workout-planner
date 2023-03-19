import React from "react";
import { Menu } from "antd";
import { useLocation, Link } from "react-router-dom";
import { ContainerOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { getRouteType } from "../helper/locationHelper";

const items = [
  {
    label: <Link to="/my-workouts">My Workouts</Link>,
    key: "my-workouts",
    icon: <ContainerOutlined />,
  },
  {
    label: <Link to="/public-workouts">Public Workouts</Link>,
    key: "public-workouts",
    icon: <UsergroupAddOutlined />,
  },
];

const WorkoutSidebar = () => {
  const location = useLocation();
  return (
    <Menu selectedKeys={[getRouteType(location)]} mode="inline" items={items} />
  );
};

export default WorkoutSidebar;

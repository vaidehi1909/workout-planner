import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import WorkoutSidebar from "./WorkoutSidebar";
import { Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  return (
    <Layout>
      <Header className="antd-header-fix">
        <AppHeader />
      </Header>
      <Layout>
        <Sider
          collapsible
          style={{
            backgroundColor: "#489a7e",
          }}
        >
          <WorkoutSidebar />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

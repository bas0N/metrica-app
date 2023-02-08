import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Pricing from "../../components/Pricing";

function index() {
  return (
    <div>
      <Pricing />
    </div>
  );
}
index.PageLayout = DashboardLayout;

export default index;

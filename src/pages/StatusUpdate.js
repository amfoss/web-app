import React from "react";
import TitleBar from "../components/titlebar";
import SEO from "../components/Seo";
import Topbar from "../components/topbar";
import DailyOverview from "../modules/statusUpdates/DailyOverview";


const StatusUpdate = () => {
  return (
    <div className="page-container">
      <SEO title="Status Update"/>
      <Topbar/>
      <TitleBar title="Status Update"/>
      <DailyOverview/>
    </div>
  )
};

export default StatusUpdate

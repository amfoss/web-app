import React from "react";
import TitleBar from "../components/titlebar";
import SEO from "../components/Seo";
import Topbar from "../components/topbar";
import IndividualReport from "../modules/statusUpdates/IndividualReport";


const StatusUpdate = () => {
  return (
    <div className="page-container">
      <SEO title="Status Update"/>
      <Topbar/>
      <TitleBar title="Status Update"/>
      <IndividualReport/>
    </div>
  )
};

export default StatusUpdate

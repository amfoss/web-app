import React from "react";
import Base from "../Base";
import Overview from "../../modules/statusUpdates/Overview";
import TitleBar from "../../components/titlebar";

const StatusStats = props => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/status',
      name: 'Status Update',
    },
    {
      path: '/status-stats',
      name: 'Status Update Statistics',
    },
  ];
  return(
    <Base title="Status Update Statistics" {...props}>
      <TitleBar routes={routes} title="Status Update Statistics" />
      <div className="row m-0">
        <Overview/>
      </div>
    </Base>
  )
};

export default StatusStats

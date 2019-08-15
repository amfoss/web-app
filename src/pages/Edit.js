import React from 'react';
import ResetPassword from "../components/Edit/ResetPassword";
import BasicDetails from "../components/Edit/BasicDetails";
import AdditionalDetails from "../components/Edit/AdditionalDetails";
import PersonalDetails from "../components/Edit/personalDetails";
import Preferences from "../components/Edit/Preferences";
import SEO from "../components/Seo";
import Topbar from "../components/topbar";
import TitleBar from "../components/titlebar";

class Edit extends React.Component{
  render() {
    return (
      <React.Fragment>
        <SEO title="Edit Profile"/>
        <Topbar />
        <div className="page-container">
          <TitleBar
            title="Edit Profile"
          />
        </div>
        <div className="m-5">
          <ResetPassword/>
          <div className="pt-4"><BasicDetails/></div>
          <div className="pt-4"><AdditionalDetails/></div>
          <div className="pt-4"><PersonalDetails/></div>
          <div className="pt-4"><Preferences/></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Edit

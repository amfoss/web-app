import React, {useEffect, useState} from 'react';
import dataFetch from "../../utils/dataFetch";
import Cookies from "universal-cookie";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import fileUpload from "../../utils/fileUpload";
import {Upload, Button, Icon, Result} from "antd";
import {Link} from "react-router-dom";

const cookies = new Cookies();

const BasicSettings = () => {
  const [isLoading, setLoaded] = useState(false);
  const [queried, setQueried] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [telegram, setTelegram] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [roll, setRoll] = useState("");
  const [batch, setBatch] = useState(0);
  const [about, setAbout] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setErrorText] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const query = `
    query user($username: String!){
  user(username:$username){
    username
    firstName
    lastName
    email
    profile{
      profilePic
      phone
      telegramID
      about
      roll
      batch
      githubUsername
    }
  }
}
`;

  const updateProfileQuery = `
    mutation ($about: String!, $batch: Int!, $email: String!, $firstName: String!, $githubUsername: String!, $lastName: String!, $phoneNo: String!, $roll: String!, $telegram: String!, $username: String!){
  UpdateProfile(about: $about, batch: $batch, email: $email, firstName: $firstName, githubUsername: $githubUsername, lastName:$lastName, phoneNo:$phoneNo, roll: $roll, telegramID: $telegram,username: $username){
    id
  }
}
  `;

  const fetchData = async variables =>
    dataFetch({ query, variables });

  const submitForm = async variables =>
    dataFetch({ query: updateProfileQuery, variables });

  const uploadFile = async data => await fileUpload(data);

  useEffect(() => {
    if(!queried){
      const usernameCookie = cookies.get('username');
      const variables = { username: usernameCookie };
      fetchData(variables).then(r=>{
        if (!Object.prototype.hasOwnProperty.call(r, "errors")) {
          setUsername(r.data.user.username ? r.data.user.username: "" );
          setFirstName(r.data.user.firstName ? r.data.user.firstName : "");
          setLastName(r.data.user.lastName ? r.data.user.lastName : "");
          setEmail(r.data.user.email ? r.data.user.email : "");
          setPhoneNo(r.data.user.profile.phone ? r.data.user.profile.phone : "");
          setTelegram(r.data.user.profile.telegramID ? r.data.user.profile.telegramID : "");
          setRoll(r.data.user.profile.roll ? r.data.user.profile.roll : "");
          setBatch(r.data.user.profile.batch ? r.data.user.profile.batch : "");
          setAbout(r.data.user.profile.about ? r.data.user.profile.about : "");
          setGithubUsername(r.data.user.profile.githubUsername ? r.data.user.profile.githubUsername : "");
          setProfilePic(r.data.user.profile.profilePic ? r.data.user.profile.profilePic : "");
          setLoaded(true);
        }
      });
      setQueried(true);
    }
  });

  const updateProfile = () => {
    const variables = {username, firstName, lastName, email, telegram, roll, about, githubUsername, batch, phoneNo};
    submitForm(variables).then(r=>{
      if (Object.prototype.hasOwnProperty.call(r, "errors")) {
        setErrorText(r.errors[0].message)
      } else {
        setSuccess(r.data);
        setErrorText("");
      }
    })
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: ({file}) => {
      const data = new FormData();
      data.append('imageFile', file);
      const query = `mutation{
     UpdateProfilePic{
      fileName
     } 
    }`;
      data.append('query', query);
      uploadFile({data}).then((response) => (
        setProfilePic(response.data.UpdateProfilePic.fileName)
      ));
    }
  };

  return isLoading ? (
    <React.Fragment>
      <h5>Update Profile</h5>
      <form
        className="form-group"
        onSubmit={e => {
          setDataLoading(true);
          updateProfile();
          e.preventDefault();
        }}>
        {!dataLoading ?
          <React.Fragment>
            <div className="row mt-4">
              <div className="col-md-6">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e=> setUsername(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-3">
                <img alt="profilepic" src={`https://api.amfoss.in/${profilePic}`} style={{height: '30vh'}} className="p-2" />
                <Upload {...uploadProps} accept="image/*">
                  <Button>
                    <Icon type="upload" /> Select File
                  </Button>
                </Upload>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e=> setFirstName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e=> setLastName(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={e=> setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Phone No</label>
                <input
                  type="text"
                  placeholder="Phone No"
                  value={phoneNo}
                  onChange={e=> setPhoneNo(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label>Telegram ID</label>
                <input
                  type="text"
                  placeholder="Telegram ID"
                  value={telegram}
                  onChange={e=> setTelegram(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>GitHub Username</label>
                <input
                  type="text"
                  placeholder="GitHub Username"
                  value={githubUsername}
                  onChange={e=> setGithubUsername(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label>Roll Number</label>
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={roll}
                  onChange={e=> setRoll(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Batch</label>
                <input
                  type="number"
                  placeholder="Batch"
                  value={batch}
                  onChange={e=> setBatch(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-4">
              <label>About</label>
              <div className="col-md-12">
                <ReactQuill
                  value={about}
                  onChange={e => setAbout(e)}
                />
              </div>
            </div>
            <div className="p-4" style={{float: 'right'}}>
              <button
                type="submit"
                className="button btn ant-btn-primary"
              >
                Save
              </button>
            </div>
          </React.Fragment>
        :<div>
            {
              success!== '' ? (
                  <Result
                    status="success"
                    title="Successfully saved your details"
                    extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
                  />
                )
                : error!== '' ?
                <div className="alert alert-danger m-4">{error}</div>:
                <div className="alert alert-warning m-4">Submitting. Please Wait</div>
            }
          </div>

        }
      </form>
    </React.Fragment>
  ): null
};

export default BasicSettings

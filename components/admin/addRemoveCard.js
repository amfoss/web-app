import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// antd components
import Checkbox from 'antd/lib/checkbox';

import dataFetch from '../../utils/dataFetch';
import AlertComponent from './alertComponent';
import useModal from './useModal';

const AddRemoveCard = ({ name, username, showCard, toggleCard }) => {
  const [user, setUser] = useState('');
  const [gitLabUsername, setGitLabUsername] = useState('');
  const [githubUsername, setGitHubUsername] = useState('');
  const [telegramID, setTelegramID] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [inGitLab, setInGitLab] = useState(null);
  const [inGitHub, setInGitHub] = useState(null);
  const [inTelegram, setInTelegram] = useState(null);
  const [inCloudFlare, setInCloudflare] = useState(null);
  const [changedPlatforms, setChangedPlatforms] = useState([]);
  const [loadPlatformData, setLoadPlatformData] = useState(false);
  const [userData, setUserData] = useState('');
  const { show, toggle } = useModal();

  const userQuery = `
  query ($username:String!){
    user(username: $username){
      profile{
        githubUsername
        gitlabUsername
        customEmail
        telegramID
        inGitLabGroup
        inGitHubGroup
        inTelegramGroup
        inCloudFlareGroup
      }
    }
  }
  `;

  const fetchUserData = async (variables) =>
    dataFetch({ query: userQuery, variables });

  useEffect(() => {
    if (user !== username) {
      setLoadPlatformData(false);
      setUser(username);
      setInCloudflare(null);
      setInTelegram(null);
      setInGitHub(null);
      setInGitLab(null);
      setChangedPlatforms([]);
      const variables = { username };
      fetchUserData(variables).then((r) => {
        setGitLabUsername(r.data.user.profile.gitlabUsername);
        setGitHubUsername(r.data.user.profile.githubUsername);
        setTelegramID(r.data.user.profile.telegramID);
        setCustomEmail(r.data.user.profile.customEmail);
        setInCloudflare(r.data.user.profile.inCloudFlareGroup);
        setInGitHub(r.data.user.profile.inGitHubGroup);
        setInTelegram(r.data.user.profile.inTelegramGroup);
        setInGitLab(r.data.user.profile.inGitLabGroup);
        setLoadPlatformData(true);
      });
    }
  });

  function handleGitLabChange(event) {
    setInGitLab(!inGitLab);
    if (changedPlatforms.indexOf(event.target.name) !== -1) {
      setChangedPlatforms(changedPlatforms.filter((e) => e !== event.target.name));
    } else {
      setChangedPlatforms((changedPlatforms) => [
        ...changedPlatforms,
        event.target.name,
      ]);
    }
  }

  function handleGitHubChange(event) {
    setInGitHub(!inGitHub);
    if (changedPlatforms.indexOf(event.target.name) !== -1) {
      setChangedPlatforms(changedPlatforms.filter((e) => e !== event.target.name));
    } else {
      setChangedPlatforms((changedPlatforms) => [
        ...changedPlatforms,
        event.target.name,
      ]);
    }
  }

  function handleTelegramChange(event) {
    setInTelegram(!inTelegram);
    if (changedPlatforms.indexOf(event.target.name) !== -1) {
      setChangedPlatforms(changedPlatforms.filter((e) => e !== event.target.name));
    } else {
      setChangedPlatforms((changedPlatforms) => [
        ...changedPlatforms,
        event.target.name,
      ]);
    }
  }

  function handleCloudFlareChange(event) {
    setInCloudflare(!inCloudFlare);
    if (changedPlatforms.indexOf(event.target.name) !== -1) {
      setChangedPlatforms(changedPlatforms.filter((e) => e !== event.target.name));
    } else {
      setChangedPlatforms((changedPlatforms) => [
        ...changedPlatforms,
        event.target.name,
      ]);
    }
  }

  function submit() {
    const data = {
      user: user,
      GitLab: inGitLab,
      GitHub: inGitHub,
      Telegram: inTelegram,
      CloudFlare: inCloudFlare,
    };
    setUserData(data);
    toggle();
  }

  return showCard ? (
    <React.Fragment>
      <div className="confirm-modal-overlay" />
      <div className="confirm-modal-wrapper" aria-modal aria-hidden role="dialog">
        <div className="confirm-modal">
          <div className="confirm-modal-header">
            <h5>{name}</h5>
          </div>
          <label>Please select the below platforms to add/remove</label>
          {username ? (
            loadPlatformData ? (
              <div>
                <p style={{ color: 'black' }}>
                  <b>Name: </b> {username}
                </p>
                <ul className="p-3" style={{ listStyleType: 'none' }}>
                  <li>
                    <Checkbox
                      name="GitLab"
                      checked={inGitLab}
                      disabled={gitLabUsername === '' || gitLabUsername == null}
                      onChange={(e) => handleGitLabChange(e)}
                    >
                      GitLab
                    </Checkbox>
                  </li>
                  <li>
                    <Checkbox
                      name="GitHub"
                      checked={inGitHub}
                      disabled={githubUsername === '' || githubUsername == null}
                      onChange={(e) => handleGitHubChange(e)}
                    >
                      GitHub
                    </Checkbox>
                  </li>
                  <li>
                    <Checkbox
                      name="Telegram"
                      checked={inTelegram}
                      disabled={telegramID === '' || telegramID == null}
                      onChange={(e) => handleTelegramChange(e)}
                    >
                      Telegram
                    </Checkbox>
                  </li>
                  <li>
                    <Checkbox
                      name="CloudFlare"
                      checked={inCloudFlare}
                      disabled={customEmail === '' || customEmail == null}
                      onChange={(e) => handleCloudFlareChange(e)}
                    >
                      CloudFlare
                    </Checkbox>
                  </li>
                </ul>
                <div style={{ float: 'right' }}>
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleCard}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary m-1"
                    disabled={changedPlatforms.length <= 0}
                    onClick={submit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <p className="p-3">Loading</p>
            )
          ) : null}
          <br />
        </div>
      </div>
      <AlertComponent
        data={userData}
        changedPlatforms={changedPlatforms}
        show={show}
        toggle={toggle}
      />
    </React.Fragment>
  ) : null;
};

AddRemoveCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  showCard: PropTypes.bool,
  toggleCard: PropTypes.func,
};

export default AddRemoveCard;

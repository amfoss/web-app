import React, {useState} from 'react';
import Base from "./Base";
import TitleBar from "../components/titlebar";
import fileUpload from "../utils/fileUpload";
import {Upload, Icon, Result, Button} from 'antd';

const { Dragger } = Upload;

const Webspace = props => {
  const [link, setLink] = useState(undefined);
  const [isLoading, setLoaded] = useState(false);
  const uploadFile = async data => await fileUpload(data);

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/webspace',
      name: 'Webspace',
    },
    {
      path: '/webspace/upload',
      name: 'Upload Files',
    },
  ];

  const draggerProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: ({file}) => {
      const data = new FormData();
      data.append('imageFile', file);
      const query = `mutation{
      UploadFiles{
        fileName
      }
    }`;
      data.append('query', query);
      setLoaded(true);
      uploadFile({data}).then((response) => {
        setLink(response);
      });
    }
  };

  return (
    <Base title="Webspace" {...props}>
      <TitleBar routes={routes} title="Webspace" />
      <div className="m-4">
        {
          !isLoading ?
            null
          : link === undefined ?
            <div className="alert alert-warning text-center">Submitting. Please Wait</div>
              :
            (<div className="alert alert-success text-center">
              Successfully uploaded
            </div>)
        }
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibit from uploading band files
          </p>
        </Dragger>
      </div>
    </Base>
  );
};

export default Webspace;

import React, { useState } from 'react';
import { extendMoment } from 'moment-range';
import Moment from 'moment';

// antd components
import DatePicker from 'antd/lib/date-picker';
import Result from 'antd/lib/result';
import Upload from 'antd/lib/upload';
import Button from 'antd/lib/button';
import { UploadOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

import fileUpload from '../../utils/fileUpload';
import Link from 'next/link';

const AddBlog = () => {
  const getDate = (options = 'default') => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    if (options === 'API') today = yyyy + '-' + mm + '-' + dd;
    return today;
  };
  const dateFormat = 'YYYY/MM/DD';

  const moment = extendMoment(Moment);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [draft, setDraft] = useState('');
  const [cover, setCover] = useState('');
  const [date, setDate] = useState(getDate('API'));
  const [success, setSuccessText] = useState('');
  const [error, setErrorText] = useState('');
  const [value, setValue] = useState('');

  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
  });

  const handleEditorChange = ({ html, text }) => {
    setValue(text);
    setDescription(html);
  };

  const query = `
    mutation createBlog($title: String!, $slug: String!, $description: String!, $draft: String!, $date: Date!){
      createBlog(title: $title, slug: $slug, description: $description, draft: $draft, date: $date){
        id
      }
    }
  `;

  const uploadData = async (data) => await fileUpload(data);
  const upload = () => {
    const data = new FormData();
    data.append('cover', cover);
    data.append('query', query);
    data.append(
      'variables',
      JSON.stringify({ title, slug, description, draft, date })
    );
    uploadData({ data }).then((r) => {
      if (Object.prototype.hasOwnProperty.call(r, 'errors')) {
        setErrorText(r.errors[0].message);
        setSuccessText('');
      } else {
        setSuccessText(r.data.id);
        setErrorText('');
      }
    });
  };

  const onChange = (dateString) => {
    setDate(dateString);
  };

  return !loading ? (
    <form
      className="form-group"
      onSubmit={(e) => {
        setLoading(true);
        upload();
        e.preventDefault();
      }}
    >
      <div className="page-container">
        <div className="row m-0">
          <div className="col-md-6">
            <label>Title</label>
            <div className="m-2">
              <input
                value={title}
                type="text"
                placeholder="Enter Title"
                name="title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label>Slug</label>
            <div className="m-2">
              <input
                value={slug}
                type="text"
                placeholder="Enter Slug"
                name="slug"
                className="form-control"
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label>Draft URL</label>
            <div className="m-2">
              <input
                value={draft}
                type="text"
                placeholder="Enter Draft URL (GDocs)"
                name="draft"
                className="form-control"
                onChange={(e) => setDraft(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-3">
            <label>Date</label>
            <div className="m-2">
              <DatePicker
                size="large"
                onChange={onChange}
                defaultValue={moment(getDate(), dateFormat)}
                format={dateFormat}
              />
            </div>
          </div>
          <div className="col-sm-3">
            <label>Cover Image</label>
            <div className="m-2">
              <input type="file" onChange={(e) => setCover(e.target.files[0])} />
            </div>
          </div>
        </div>
        <div className="m-4">
          <MdEditor
            value={value}
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <div className="text-right m-3">
          <button type="submit" className="button btn ant-btn-primary px-4">
            Submit
          </button>
        </div>
      </div>
    </form>
  ) : (
    <div>
      {success !== '' ? (
        <Result
          status="success"
          title="Successfully added the your blog!"
          subTitle="Review process initiated :)"
          extra={
            <Link href="/">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      ) : error !== '' ? (
        <div className="alert alert-danger m-4">{error}</div>
      ) : (
        <div className="alert alert-warning m-4">Submitting. Please Wait</div>
      )}
    </div>
  );
};

export default AddBlog;

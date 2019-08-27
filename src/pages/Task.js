import React from 'react';
import {IBreadcrumbProps, Card, ProgressBar} from '@blueprintjs/core';
import { Redirect } from 'react-router';
import parse from 'html-react-parser';
import DropzoneComponent from 'react-dropzone-component';
import ReactQuill from 'react-quill';
import dataFetch from '../utils/dataFetch';
import TitleBar from '../components/titlebar';
import Topbar from '../components/topbar';
import SEO from "../components/Seo";
import StarRatingComponent from 'react-star-rating-component';

const query = `query getTask($id: String!)
{
  task(id:$id)
  {
    title
    description
    points
    difficulty
    date
    author
    {
      Profile
      {
        firstName
        lastName
      }
    }
    stream
    {
      name
      slug
      type
    }
  }
}`;

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      setId: false,
      error: false,
      rating: 3,
      switchTab: 'detailsTab',
      text: '',
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  handleDetailsClick() {
    this.setState({
      switchTab: "detailsTab",
    })
  }

  handleSubmissionClick() {
    this.setState({
      switchTab: "submissionTab",
    })
  }
  handleDiscussionClick() {
    this.setState({
      switchTab: "discussionTab",
    })
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      id,
      setId: false,
      setData: false,
    });
  }

  componentDidUpdate() {
    if (!this.state.setData) {
      this.getTask();
    }
  }

  getTask = async () => {
    const variables = { id: this.state.id };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      this.setState({
        title: response.data.task.title,
        description: response.data.task.description,
        points: response.data.task.points,
        difficulty: response.data.task.difficulty,
        name: response.data.task.author,
        date: response.data.task.date,
        setData: true,
      });
    } else {
      this.setState({ error: true });
    }
  };

  getPoints() {
    const points = this.state.points.replace(/[^0-9\.]+/g, '');
    return <span>{`${points} Points`}</span>;
  }

  getDifficulty() {
    const levels = {
      '1': 'Easy',
      '2': 'Moderate',
      '3': 'Tough',
      '4': 'Hard',
    };
    const key = this.state.difficulty.replace(/[^0-9\.]+/g, '');
    return <span className={`difficulty_${key}`}>{levels[key]}</span>;
  }

  getDescription() {
    return <h6>{parse(this.state.description)}</h6>;
  }

  componentConfig = { postUrl: 'no-url' };

  renderTab(){
    if(this.state.switchTab === 'detailsTab'){
      return (
        <div className="row">
          <div className="col-lg-10">
            <Card>{this.getDescription()}</Card>
            <div className="pt-3">
              <Card>
                <div className="row">
                  <div className="col-md-4" />
                  <div className="col-md-6">
                    <h3>YET TO SUBMIT YOUR TASK</h3>
                  </div>
                  <div className="col-md-1">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="col-lg-2">
            <Card>
              {this.state.setData ? (
                <div className="task-info">
                  <h3>{this.getDifficulty()}</h3>
                  {this.getPoints()}
                  <hr />
                  <h3>User Rating</h3>
                  <div style={{fontSize: 35}}>
                    <StarRatingComponent
                      name="User Rating"
                      value={this.state.rating}
                      starCount={5}
                      editing={true}
                      onStarClick={this.onStarClick.bind(this)}
                    />
                  </div>
                </div>
              ) : null}
            </Card>
            <div className="pt-3">
              <Card>
                <h5>Next Task</h5>
                <h3>REST API -></h3>
                <hr />
                <h5>Stream Progress</h5>
                <ProgressBar
                  value={0.45}
                  animate={false}
                  stripes={false}
                  intent="success"
                />
              </Card>
            </div>
            <div className="pt-3">
              <h3>Related Tasks</h3>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.switchTab === 'submissionTab'){
      return (
        <Card>
          <div className="row">
            <div className="col-lg-10">
              <div>
                <h3>Submission Details</h3>
                <div className="text-editor">
                  <ReactQuill
                    className="py-4"
                    style={{height: '45vh'}}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.text}
                    onChange={this.handleChange}
                  />
                </div>
                <h3 className="py-4">Upload Attachments</h3>
                <DropzoneComponent
                  className="py-3"
                  config={this.componentConfig}
                />
              </div>
            </div>
          </div>
        </Card>
      )
    }else {
      return (
        <div className="row">Ho</div>
      )
    }
  }


  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


  render() {
    let breadcrumbs;
    breadcrumbs = [
      {href: '/', icon: 'home', text: 'Home'},
      {href: '/tasks', icon: 'home', text: 'Tasks'},
    ];
    const taskinfo = this.state.setData;
    return (
      <React.Fragment>
        <SEO title={`${this.state.title} | Tasks `} />
        <Topbar />
        {this.state.error ? <Redirect to="/tasks" /> : null}
        {this.state.setData ? (
          <React.Fragment>
            <div className="page-container">
              <TitleBar
                title={this.state.title}
                description={taskinfo}
                breadcrumbs={breadcrumbs}
                noBottomMargin
              />
              <div id="section-switcher">
                <div id="details-tab" onClick={this.handleDetailsClick.bind(this)}>
                  <span>Details</span>
                </div>
                <div id="submission-tab" onClick={this.handleSubmissionClick.bind(this)}>
                  <span>Submission</span>
                </div>
                <div id="discussion-tab" onClick={this.handleDiscussionClick.bind(this)}>
                  <span>Discussion</span>
                </div>
              </div>
              <div className="m-5">
                {this.renderTab()}
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Task;

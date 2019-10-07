import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import dataFetch from "../utils/dataFetch";
import {Button} from "@blueprintjs/core";

import { getApplicant as query } from '../utils/queries.js';
import {CheckIn as Mutation} from "../utils/mutations";

class CheckIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      delay: 200,
      result: 'No Results',
      error: '',
      name: '',
      status: '',
      errorText: '',
      rollNo: '',
      gender: '',
      submitError: ''
    };
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(result){
    if(result){
      if(this.state.result !== result){
        this.setState({ result, status: '', errorText: '' });
        this.scanQR()
      }
    }
  }

  scanQR = async() => {
    const variables = { hash: this.state.result };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      this.setState({
        name: response.data.getApplicant.name,
        id: response.data.getApplicant.id,
        rollNo: response.data.getApplicant.formData[1].value,
        gender: response.data.getApplicant.formData[0].value,
      });
    }else{
      this.setState({errorText: response.errors[0].message, name: '', id: '', rollNo: '', gender: '', submitError: ''})
    }
  };

  submitQR = async() => {
    const variables = { appID: this.state.id };
    const response = await dataFetch({ query: Mutation, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      this.setState({status: response.data.checkIn.status})
    }else{
      this.setState({submitError: response.errors[0].message, errorText: ''})
    }
  };
  render(){
    return(
      <section id="check-in">
        <form
          onSubmit={e => {
            this.submitQR();
            e.preventDefault();
          }}
        >
          <QrReader
            delay={this.state.delay}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
          <div className="row" />
          {this.state.status === "success" ?
            <div className="alert alert-success m-4">Check In</div>: null
          }
          {this.state.submitError !== '' ?<div className="alert alert-danger m-4">{this.state.submitError}</div>: null}
          {this.state.status === '' && this.state.submitError === '' ?
            this.state.name !== '' ?
                <div className="col-sm-12 col-md-4 p-4">
                  <li>ID: {this.state.id}</li>
                  <li>Name: {this.state.name}</li>
                  <li>Roll No: {this.state.rollNo}</li>
                  <li>Gender: {this.state.gender}</li>
                  <div className="">
                    <Button
                      className="d-block"
                      type="submit"
                      intent="primary"
                      text="Check In"
                      style={{height: '10%',width:'100%', fontSize: '3vh'}} />
                  </div>
                </div>
              : null
            :null
          }
          {this.state.errorText !== '' ?<div className="alert alert-danger m-4">{this.state.errorText}</div>: null}
        </form>
      </section>
    )
  }
}

export default CheckIn

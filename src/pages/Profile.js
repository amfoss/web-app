import React from 'react';
import { Helmet } from 'react-helmet';
import 'babel-polyfill';
import Topbar from '../components/topbar.js';
import { Card } from '@blueprintjs/core';
import {Container, Row, Col } from 'react-grid';
import Cookies from 'universal-cookie';

import { ResponsiveCalendar } from "@nivo/calendar";
import { data } from "./data";
import { ResponsiveRadar } from '@nivo/radar';
import { radardata } from './radardata';


const cookies = new Cookies();

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      token: '',
      firstName: '',
      lastName: '',
      avatar: '',
      profileSet: false,
      dataSet: false,
      isLoggedIn: false
    };
  }
  componentDidMount(){
    const firstName = localStorage.getItem('first_name');
    const token = cookies.get('token');
    if(token)
    {
      if (firstName == null) {
        const username = cookies.get('username');
        this.setState({ token, username, isLoggedIn: true });
      } else { this.setState({ profileSet: true }); }
    }
  }

  componentDidUpdate() {
    if (!this.state.dataSet && this.state.profileSet) { this.setData(); }
  }

  setData() {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    const avatar = localStorage.getItem('avatar');
    const username = cookies.get('username');
    this.setState({ firstName, lastName, avatar, username, dataSet: true });
  }

  render(){
    return(
      <React.Fragment>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Topbar />
        <div className="page-container">
        <Container>
            <Card elevation ="2" style={{margin: 0}}>
              <Row>
                <Col sm={3} md={3}>
                  <img src={`http://127.0.0.1:3200/${this.state.avatar}`} style={{ width: '190px', borderRadius: '100vw' }} />  
                </Col>
                <Col sm={9} md={9}>
                  <h1>{this.state.firstName} {this.state.lastName}</h1>
                  <h5>@{this.state.username}</h5>
                </Col>
              </Row>
            </Card>
            <Row>
              <Col md={8}>
                <Card elevation="2" style={{margin: 0}}>
                  <h1>Activity Heatmap</h1>
                  <div className="Calendar" style={{ height: 300 }}>
                    <ResponsiveCalendar
                      data={data}
                      from="2015-03-01"
                      to="2015-07-12"
                      emptyColor="#eeeeee"
                      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                      margin={{
                        top: 100,
                        right: 30,
                        bottom: 60,
                        left: 30
                      }}
                      yearSpacing={60}
                      monthBorderColor="#ffffff"
                      monthLegendOffset={10}
                      dayBorderWidth={2}
                      dayBorderColor="#ffffff"
                      legends={[
                        {
                          anchor: "bottom-right",
                          direction: "row",
                          translateY: 36,
                          itemCount: 4,
                          itemWidth: 34,
                          itemHeight: 36,
                          itemDirection: "top-to-bottom"
                        }
                      ]}
                    />
                  </div>
                </Card>
              </Col>
              <Col md={4}>
                <Card elevation="2" style={{margin: 0}}>
                  <h1>Activity Overview</h1>
                  <div className="spider-chart" style={{ height: 300 }}>
                      <ResponsiveRadar
                        data={radardata}
                        keys={[
                            "chardonay",
                            "carmenere",
                            "syrah"
                        ]}
                        indexBy="taste"
                        maxValue="auto"
                        margin={{
                            "top": 70,
                            "right": 80,
                            "bottom": 40,
                            "left": 80
                        }}
                        curve="linearClosed"
                        borderWidth={2}
                        borderColor={{
                            "from": "color"
                        }}
                        gridLevels={5}
                        gridShape="circular"
                        gridLabelOffset={36}
                        enableDots={true}
                        dotSize={10}
                        dotColor={{
                            "theme": "background"
                        }}
                        dotBorderWidth={2}
                        dotBorderColor={{
                            "from": "color"
                        }}
                        enableDotLabel={true}
                        dotLabel="value"
                        dotLabelYOffset={-12}
                        colors={{
                            "scheme": "nivo"
                        }}
                        fillOpacity={0.25}
                        blendMode="multiply"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        isInteractive={true}
                        legends={[
                          {
                              "anchor": "top-left",
                              "direction": "column",
                              "translateX": -50,
                              "translateY": -40,
                              "itemWidth": 80,
                              "itemHeight": 20,
                              "itemTextColor": "#999",
                              "symbolSize": 12,
                              "symbolShape": "circle",
                              "effects": [
                                  {
                                      "on": "hover",
                                      "style": {
                                          "itemTextColor": "#000"
                                      }
                                  }
                              ]
                          }
                        ]}              
                      />
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;

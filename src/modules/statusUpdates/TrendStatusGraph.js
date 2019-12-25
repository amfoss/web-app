import React, {useState} from "react";
import { Bar } from "@nivo/bar";
import {Card, Colors, Elevation, HTMLSelect, Icon} from "@blueprintjs/core";
import classnames from "classnames";

const TrendStatusGraph = ({ isLoaded, data }) => {
  const data2019 = [];
  const data2018 = [];
  const data2017 = [];
  const data2016 = [];

  data.map(d => {
    if(d.user.admissionYear === 2019){
      data2019.push(d);
    }
    else if(d.user.admissionYear === 2018){
      data2018.push(d);
    }
    else if(d.user.admissionYear === 2017){
      data2017.push(d);
    }else{
      data2016.push(d);
    }
  });
  const graph2019 = {
    data: data2019.map(r => ({
      statusCount: r.statusCount,
      username: r.user.username
    })),
  };
  const graph2018 = {
    data: data2018.map(r => ({
      statusCount: r.statusCount,
      username: r.user.username
    })),
  };
  const graph2017 = {
    data: data2017.map(r => ({
      statusCount: r.statusCount,
      username: r.user.username
    })),
  };
  const graph2016 = {
    data: data2016.map(r => ({
      statusCount: r.statusCount,
      username: r.user.username
    })),
  };
  const [year, setYear] = useState("2019");
  return (
    <Card elevation={Elevation.TWO} style={{overflow: 'auto'}}>
      <div className="row m-0">
        <div className="col-md-8">
          <h5
            className="mb-4 bp3-heading"
            style={{ color: Colors.BLUE3 }}
          >
            <Icon icon="chart" className="mr-2 mb-1" />
            Member Status Update Trends
          </h5>
        </div>
        <div className="col text-right">
          <HTMLSelect
            onChange={e => setYear(e.currentTarget.value)}
            iconProps={null}
            minimal
            large
          >
            <option value="2019" selected>
              2019
            </option>
            <option value="2018">
              2018
            </option>
            <option value="2017">
              2017
            </option>
            <option value="2016">
              2016
            </option>
          </HTMLSelect>
        </div>
      </div>
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ padding: '5px' }}
      >
        {isLoaded ? (
          <Bar
            width={900}
            height={400}
            padding={0.3}
            margin={{top: 10, right: 0, bottom: 25, left: 0}}
            data={year === '2019' ? graph2019.data: year === '2018' ? graph2018.data: year === '2017' ? graph2017.data: graph2016.data}
            indexBy="username"
            keys={["statusCount"]}
            animate={true}
            enableGridX={true}
          />
        ) : null}
      </div>
    </Card>
  )
};
export default TrendStatusGraph;

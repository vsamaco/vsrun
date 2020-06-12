import React from 'react'
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';

class CompareChart extends React.Component {
  constructor(props) {
    super(props);
  
    this.chartReference = React.createRef();
  }

  render() {
    momentDurationFormat(moment);
    const labels = this.props.activities.map((activity) => {
      return moment(activity.start_date).format("MMMM DD");
    });
    const dataset = this.props.activities.map((activity) => activity.moving_time);//moment.duration(activity.moving_time,'s').format('mm:ss'));

    const data = {
      labels: labels || [],
      datasets: [{
        label: 'time',
        data: dataset || [],
      }],
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            callback: (x) => moment.duration(x,'s').format('H:mm:ss'),
            stepSize: 300,
          }
        }]
      }
    }

    console.log('data', data);
    console.log('options', options);

    return (
      <div>
        <Line ref={this.chartReference} data={data} options={options} height="300"/>
      </div>
    )
  }
}

export default connect(null)(CompareChart);
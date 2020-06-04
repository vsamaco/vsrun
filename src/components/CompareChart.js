import React from 'react'
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';
// import activitiesData from '../stubs/activitiesData';

class CompareChart extends React.Component {
  constructor(props) {
    super(props);
  
    this.chartReference = React.createRef();
    this.state = {
      labels: [],
      dataset: [],
    };
  }

  render() {
    momentDurationFormat(moment);
    const labels = this.props.activities.map((activity) => {
      return moment(activity.start_date).format("MMMM DD");
    });
  
    const sortData = this.props.activities.map((activity) => activity.moving_time).sort();
    const minData = sortData ? moment.duration(sortData[sortData.length - 1],'seconds') : 0;
    const maxData = sortData ? moment.duration(sortData[0],'s') : 0;
  
    const dataset = this.props.activities.map((activity) => moment.duration(activity.moving_time,'s').format('mm:ss'));

    console.log('sortData', sortData)
    console.log('min,max', minData.format('m:s'), maxData.format('mm:ss', {trim: false}));

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
          type: 'time',
          time: {
            parser: 'mm:ss',
            unit: 'minutes',
            displayFormats: {
              'seconds': 'mm:ss',
              'minutes': 'mm:ss'
            },
            min: minData.subtract(3,'m').format('mm:ss', { trim: false }),
            max: maxData.add(3,'m').format('mm:ss', { trim: false }),
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    activities: Object.values(state.activities)
  };
}

export default connect(null)(CompareChart);
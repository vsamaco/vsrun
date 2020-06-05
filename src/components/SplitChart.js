import React from 'react';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';
import { Line } from 'react-chartjs-2';

class SplitChart extends React.Component {
  constructor(props) {
    super(props);
  
    this.chartReference = React.createRef();
  }

  render() {  
    momentDurationFormat(moment);

    const data = {
      labels: this.props.labels || [],
      datasets: [{
        label: 'Split time',
        data: this.props.dataset || [],
      }],
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            callback: (x) => moment.duration(x,'s').format(':mm:ss'),
            stepSize: 60,
          }
        }]
      }
    }

    console.log('options', options);
    console.log('data', data);
  
    return (
      <div>
        <Line ref={this.chartReference} data={data} options={options} height={300}/>
      </div>
    )
  }
}

export default SplitChart;

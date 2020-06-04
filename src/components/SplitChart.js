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
        data: this.props.dataset.map((x) => x.format('m:ss')) || [],
      }],
    };

    const sortData = this.props.dataset.sort((a,b) => a < b);
    const max = sortData[0];
    const min = sortData[sortData.length-1];

    const options = {
      scales: {
        yAxes: [{
          type: 'time',
          time: {
            parser: 'm:ss',
            unit: 'minutes',
            displayFormats: {
              'seconds': 'm:ss',
              'minutes': 'm:ss'
            }
          },
          ticks: {
            min: min.subtract(30,'s').format('m:s', { trim: false }),
            max: max.add(30,'s').format('m:s')
          }
        }]
      }
    }

    console.log('options', options);
    console.log('data', data);
  
    return (
      <div>
        <Line ref={this.chartReference} data={data} options={options} height="300"/>
      </div>
    )
  }
}

export default SplitChart;

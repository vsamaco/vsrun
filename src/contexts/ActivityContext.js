import React from 'react';

const Context = React.createContext([]);
export class ActivityStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    }
  }

  handleActivityAdd = (id) => {
    if (!this.state.activities.includes(id)) {
      const newActivities = [...this.state.activities, id];
      this.setState({ activities: newActivities });
    }
  }

  handleActivityRemove = (id) => {
    if (this.state.activities.includes(id)) {
      const newActivities = this.state.activities.filter((activityId) => activityId !== id);
      this.setState({ activities: newActivities });
    }
  }
  
  render() {
    return (
      <Context.Provider value={{ ...this.state, 
        handleActivityAdd: this.handleActivityAdd, 
        handleActivityRemove: this.handleActivityRemove 
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context;
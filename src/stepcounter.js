import React from 'react';

class StepCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Steps: {this.props.steps.toFixed(0)}
        <br/>
        Steps per Second: {this.props.stepRate * 5}
      </div>
    )
  }
}
export default StepCounter;

import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Time: {this.props.time}
      </div>
    )
  }
}
export default Timer;

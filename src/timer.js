import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false
    }
  }

  render() {
    return (
    <button onClick={()=> {
        if (!this.state.timerOn) {
          this.setState({timerOn: true})
          this.props.startTimer();
          setInterval(()=> {
            this.setState({timerOn: false})
          }, 10000)
        }
      }}
    >
      Time: {this.props.time}
    </button>

    )
  }
}
export default Timer;

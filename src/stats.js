import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      Speed Boost: {this.props.speed.toFixed(1)}
      <br/>
      Last Score: {this.props.score.toFixed(1)}
      <br/>
      High Score: {this.props.highScore.toFixed(1)}
      <br/>
      Cheese: {this.props.totalCheese.toFixed(1)}
    </div>

    )
  }
}
export default Stats;

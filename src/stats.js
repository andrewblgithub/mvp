import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      Current Speed: {this.props.speed.toFixed(1)}
      <br/>
      Score: {this.props.score.toFixed(1)}
      <br/>
      High Score: {this.props.highScore.toFixed(1)}
      <br/>
      Cheese: {this.props.cheese.toFixed(1)}
      <br/>
      Total Cheese: {this.props.totalCheese.toFixed(1)}
    </div>

    )
  }
}
export default Stats;

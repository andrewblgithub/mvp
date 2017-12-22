import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={()=> {
            if (this.props.timerOn) {
              this.props.takeStep();
            }
          }}
        >
          Steps: {this.props.steps.toFixed(0)}
        </button>
        <br/>
        <button onClick={()=> {
          this.props.eatCheese();
        }}
        >
          Eat some Cheese
        </button>
      </div>
    )
  }
}
export default Counter;

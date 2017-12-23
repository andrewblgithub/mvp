import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter';
import Timer from './timer';
import Stats from './stats';
import Mouse from './mouse';
import LeaderBoard from './leaderboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 0,
      newSteps: 0,
      stepRate: 0,
      time: 0,
      timerOn: false,
      score: 0,
      highScore: 0,
      cheese: 0,
      totalCheese: 0,
      speed: 1
    }
    this.appStyle = {
      height: '100%',
      cursor: 'pointer'
    }
  }
  componentDidMount() {
    // timer to get rate
    setInterval(()=> {
      this.setState({
        stepRate: this.state.newSteps,
        newSteps: 0
      })
    }, 500)
  }
  takeStep() {
    this.setState({

    })
    this.setState({
      steps: this.state.steps + this.state.speed,
      newSteps: this.state.newSteps + 1
    })
  }
  eatCheese() {
    if (this.state.totalCheese >= 1) {
      this.setState({
        totalCheese: this.state.totalCheese - 1,
        speed: this.state.speed + 0.1
      })
    }
  }
  startTimer() {
    this.setState({
      timerOn: true
    })
    setTimeout(()=> {
      this.setState({
        time: this.state.time + 1
      })
      if (this.state.time === 5) {
        this.setState({
          score: this.state.steps,
          cheese: this.state.steps / 75,
          steps: 0,
          time: 0,
          timerOn: false
        })
        if (this.state.score > this.state.highScore) {
          this.setState({highScore: this.state.score})
        }
        this.setState({
          totalCheese: this.state.totalCheese + this.state.cheese
        })
      } else {
        this.startTimer();
      }
    }, 1000)
  }
  render() {
    return (
      <div 
        onClick={()=> {
          if (!this.state.timerOn) {
            this.startTimer();
          } else {
            this.takeStep();
          }
        }}
        style={this.appStyle}
      >
        <Timer 
          time = {this.state.time}
        />
        <Counter 
          steps = {this.state.steps}
          stepRate = {this.state.stepRate}
        />
        <Stats
          score = {this.state.score}
          highScore = {this.state.highScore}
          cheese = {this.state.cheese}
          totalCheese = {this.state.totalCheese}
          speed = {this.state.speed}
          />
        <Mouse
          startTimer = {this.startTimer.bind(this)}
          takeStep = {this.takeStep.bind(this)}
          eatCheese = {this.eatCheese.bind(this)}
          timerOn = {this.state.timerOn}
          time = {this.state.time}
          steps = {this.state.steps}
          stepRate = {this.state.stepRate}
          speed = {this.state.speed}
        />
        <LeaderBoard/>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  ReactDOM.render(<App />, document.getElementById('app'))
});
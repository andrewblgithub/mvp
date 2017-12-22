import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter';
import Timer from './timer';
import Stats from './stats';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 0,
      time: 0,
      timerOn: false,
      score: 0,
      highScore: 0,
      cheese: 0,
      totalCheese: 0,
      speed: 1
    }
  }
  takeStep() {
    this.setState({steps: this.state.steps + this.state.speed})
  }
  eatCheese() {
    if (this.state.cheese >= 1 && !this.state.timerOn) {
      this.setState({
        cheese: this.state.cheese - 1,
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
        time: this.state.time + 1,
      })
      if (this.state.time === 5) {
        this.setState({
          score: this.state.steps,
          cheese: this.state.steps / 5,
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
      <div>
        <Timer 
          time = {this.state.time}
          startTimer = {this.startTimer.bind(this)}
          timerOn = {this.state.timerOn}
        />
        <Counter 
          steps = {this.state.steps}
          takeStep = {this.takeStep.bind(this)}
          timerOn = {this.state.timerOn}
          eatCheese = {this.eatCheese.bind(this)}
        />
        <Stats
          score = {this.state.score}
          highScore = {this.state.highScore}
          cheese = {this.state.cheese}
          totalCheese = {this.state.totalCheese}
          speed = {this.state.speed}
        />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  ReactDOM.render(<App />, document.getElementById('app'))
});
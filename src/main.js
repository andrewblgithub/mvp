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
      speed: 1,
      name: 'Anonymouse',
      date: new Date().toString(),
      scoresList: [],
      cheeseList: []
    }
    this.appStyle = {
      height: '100%',
      cursor: 'pointer'
    }
  }
  componentDidMount() {
    this.setUser()
    this.getLeaderboard()
    setInterval(()=> {
      this.setState({
        stepRate: this.state.newSteps,
        newSteps: 0
      })
    }, 500)
  }
  takeStep() {
    console.log(this.state.scoresList, this.state.cheeseList)
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
  setUser() {
    let name = prompt('Enter your mouse name')
    if (name) {
      this.setState({name: name})
    }
  }
  getLeaderboard() {
    fetch('http://localhost:3000/leaderboards')
    .then((data)=> {
      return data.json()
    })
    .then((data)=> {
      this.setState({
        scoresList: data.scores,
        cheeseList: data.cheese
      })
    })
  }
  sendScores() {
    fetch('http://localhost:3000/leaderboards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        highScore: this.state.highScore,
        totalCheese: this.state.totalCheese,
        date: this.state.date
      })
    })
    .then(()=> {
      this.getLeaderboard();
    })
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
        this.sendScores()
      } else {
        this.startTimer();
      }
    }, 1000)
  }
  render() {
    return (
      <div>
        <div>
          <LeaderBoard
            scoresList={this.state.scoresList}
            cheeseList={this.state.cheeseList}
          />
        </div>
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
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  ReactDOM.render(<App />, document.getElementById('app'))
});
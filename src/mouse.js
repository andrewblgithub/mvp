import React from 'react';

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.videoStyle = {
      position: 'absolute',
      display: 'block',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '-1'
    }
    this.buttonStyle = {
      cursor: 'pointer'
    }
  }

  componentDidUpdate() {
    if (this.props.timerOn && this.props.stepRate > 0) {
      let speedBoost = (this.props.speed - 1) * 3
      this.refs.vidRef.playbackRate = this.props.stepRate / 2.5 + speedBoost
      this.refs.vidRef.play();
    } else {
      this.refs.vidRef.playbackRate = 1
      this.refs.vidRef.load()
    }
  }

  buttonHandler(e) {
    e.stopPropagation();
    this.props.eatCheese();
  }

  render() {
    return (
      <div>
        <br/>
        <button
          onClick={(e)=> {
            this.buttonHandler(e);
          }}
          style={this.buttonStyle}
        >
          Eat some Cheese
        </button>
        <br/>
        <br/>
        <video 
          style = {this.videoStyle}
          ref = 'vidRef'
          poster = 'http://res.cloudinary.com/duxbiywzd/image/upload/v1513972214/standingmouse_mp07qq.jpg'
          width = '100%'
          loop
          onClick={()=> {
            if (!this.props.timerOn) {
              this.props.startTimer();
            } else {
              this.props.takeStep();
            }
          }}
        >
          <source src='http://res.cloudinary.com/duxbiywzd/video/upload/v1513972214/runningmouse_uedrnf.mp4' type='video/mp4'>
          </source>
        </video>
      </div>
    )
  }
}
export default Mouse;

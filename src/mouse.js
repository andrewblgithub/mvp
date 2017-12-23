import React from 'react';

class Mouse extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.timerOn && this.props.stepRate > 0) {
      this.refs.vidRef.playbackRate = this.props.stepRate / 2.5 
      this.refs.vidRef.play();
    } else {
      this.refs.vidRef.playbackRate = 1
      this.refs.vidRef.load()
    }
  }

  render() {
    return (
      <div>
        <br/>
        <button onClick={()=> {
          this.props.eatCheese();
        }}
        >
          Eat some Cheese
        </button>
        <br/>
        <br/>
        <video 
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

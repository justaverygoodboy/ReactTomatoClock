import { Component } from 'react';
import './Counter.scss';
import {PauseOutlined,CaretRightOutlined} from '@ant-design/icons'
export default class Header extends Component{
  render(){
    return (
      <div className="counter" style={this.state.style}>
        <div className="round">Round : {this.state.round}</div>
        <div className="count-area">
          {this.state.minute} : {this.state.second}
        </div>
        <button className="start-pause-button" style={this.state.button} onClick={this.startCount}>
          {!this.state.pause ? <PauseOutlined style={this.state.buttonIcon}/>:<CaretRightOutlined style={this.state.buttonIcon}/>}
        </button>
      </div>
    )
  }
  state = {
    minute: '25',
    second: '00',
    rest: 0,
    round: 1,
    pause: 1,
    style: {'background':'linear-gradient( 190deg, #FCCF31 0%, #F55555 100%)'},
    button: {'background':'linear-gradient( 135deg, #70F570 10%, #49C628 100%)',"box-shadow":"1px 1px 5px green"},
    buttonIcon: {'color':'white','font-size':'60px'}
  }
  setRest = () => {
    let rest = this.state.rest
    this.setState({
      rest:!rest
    })
    let style1 = {'background':'linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)'}
    let style2 = {'background':'linear-gradient( 135deg, #56ab2f 10%, #a8e063 100%)'}
    if (rest) {
      this.setState({
        minute: '25',
        second: '00',
        style: style1
      })
    } else {
      this.setState({
        minute: '05',
        second: '00',
        style: style2
      })
    }
  }
  startCount = () => {
    let pause = this.state.pause
    this.setState({
      pause:!pause
    })
    if(pause) {
      this.setState({
        button:{'background':'linear-gradient( 135deg, #FD6E6A 10%, #FFC600 100%)',"box-shadow":"1px 1px 5px red"}
      })
      this.timer = setInterval(() => {
        let second = this.state.second
        let minute = this.state.minute
        let newsec = second - 1
        let newmin = minute - 1
        newsec = String(newsec)
        newmin = String(newmin)
        if (newsec.length === 1){
          newsec = "0" + newsec
        }
        if (newmin.length === 1){
          newmin = "0" + newmin
        }
        if(second<=0){
          this.setState({
            minute:newmin,
            second:'59'
          })
        } else {
          this.setState({
            second:newsec
          })
        }
        if(minute==='00' && second==='00'){
          if(this.state.rest){
            let round = this.state.round
            this.setState({
              round: round + 1
            })
          }
          this.setRest()
          let pause = this.state.pause
          this.setState({
            pause: !pause
          })
          this.setState({
            button:{'background':'linear-gradient( 135deg, #70F570 10%, #49C628 100%)',"box-shadow":"1px 1px 5px green"}
          })
          clearInterval(this.timer)
        }
        }, 1000)
    }
    else {
      clearInterval(this.timer)
      this.setState({
        button:{'background':'linear-gradient( 135deg, #70F570 10%, #49C628 100%)',"box-shadow":"1px 1px 5px green"}
      })
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
}

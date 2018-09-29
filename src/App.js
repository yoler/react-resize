import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';





class App extends Component {
  constructor (props) {
    super(props)
    this.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  }
  componentDidMount () {
    this.resize()
    window.addEventListener('resize', this.resize)
  }

  resize = () => {
    let container = document.querySelector('.container')
    let content = document.querySelector('.content')
    let itemList = content.children
    itemList = Array.from(itemList)
    let col = Math.floor(container.clientWidth / 216)
    let row = Math.ceil(this.list.length / col)
    content.style.width = col * 216 + 16 + 'px'
    content.style.height = row * 336 + 16 + 'px'
    itemList.forEach((item, index) => {
      let line = Math.floor((index) / col)
      let r = (index + 1) % (col)
      if (r == 0) r = col
      item.style.top = line * 336 + 16 + 'px'
      item.style.left = (r - 1) * 216 + 16 + 'px'
    })
  }

  render() {
    
    return (
		<Router>
	      <div className="container">
          <div className="content">
              {this.list.map((item, index) => <div key={index} className="item">{item}</div>)}
          </div>
	      </div>
	    </Router>
    );
  }
}

export default App;

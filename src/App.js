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
    this.state = {
      list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
    this.aPos = []
  }
  componentDidMount () {
    this.resize()
    window.addEventListener('resize', this.resize)
    this.x = 0
    this.y = 0
  }

  resize = () => {
    this.aPos = []
    let container = document.querySelector('.container')
    let content = document.querySelector('.content')
    let itemList = content.children
    itemList = Array.from(itemList)
    this.itemList = itemList
    let col = Math.floor(container.clientWidth / 216)
    let row = Math.ceil(this.state.list.length / col)
    content.style.width = col * 216 + 16 + 'px'
    content.style.height = row * 336 + 16 + 'px'
    itemList.forEach((item, index) => {
      let line = Math.floor((index) / col)
      let r = (index + 1) % (col)
      if (r == 0) r = col
      let top = line * 336 + 16
      let left = (r - 1) * 216 + 16
      item.style.top = top  + 'px'
      item.style.left = left + 'px'
      item.index = index
      this.aPos.push({left:left,top:top});
    })
  }

  mousedown = (e, index) => {
    this.target = e.target
    this.index = index
    this.x = e.clientX
    this.y = e.clientY
    this.top = this.target.offsetTop
    this.left = this.target.offsetLeft
    
    document.onmousemove = (event) => {
      this.mousemove(event)
    }
    document.onmouseup = (event) => {
        document.onmousemove = null
        document.onmouseup = null
        this.target.style.transition = 'all 0.5s'
        this.target.style.opacity = '1'
        this.move(this.target, this.aPos[this.target.index])
        this.target = null
    }
    
    // e.target.style.opacity = 0
  }
  findNearest = (obj) => {
    var iMin = 99999999999999;
    var iMinIndex = -1;
    const aLi = this.itemList
    for(var i = 0; i < aLi.length; i++){
      if(this.collTest(obj,aLi[i])){
        //如果碰撞到了，计算 与碰撞aLi[i]之间的  直线 距离
        var dis = this.getDis(obj,aLi[i]);
        if(iMin > dis){
          iMin = dis;
          iMinIndex = i;
        }
      }
    }
    if(iMinIndex == -1){
      return null;
    }
    return aLi[iMinIndex];
  }

  collTest = (obj1,obj2) => {
    var l1 = obj1.offsetLeft;
    var t1 = obj1.offsetTop;

    var r1 = l1 + obj1.offsetWidth;
    var b1 = t1 + obj1.offsetHeight;
    var l2 = this.aPos[obj2.index].left;
    var t2 = this.aPos[obj2.index].top;
    var r2 = l2 + obj2.offsetWidth;
    var b2 = t2 + obj2.offsetHeight;
    if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
      return false;
    }
    return true;

  }

  getDis = (obj1,obj2) => {
    var a = obj1.offsetLeft - this.aPos[obj2.index].left;
    var b = obj1.offsetTop - this.aPos[obj2.index].top;
    return Math.sqrt(a*a + b*b);
  }
  mousemove = (e) => {
    let disx = e.clientX - this.x
    let disy = e.clientY - this.y
    if (Math.abs(disx) > 50 || Math.abs(disy) > 50) {
      this.target.style.transition = 'none'
      this.target.style.opacity = '0.9'
    }
    this.target.style.top = this.top + disy + 'px'
    this.target.style.left = this.left + disx + 'px'

    let obj = this.target
    var oNear = this.findNearest(obj)

    if(oNear && obj!= oNear){
          var n = obj.index;
          var m = oNear.index;
          
          let aLi = this.itemList;

          if(n<m){
            for(var i = 0; i < aLi.length; i++){
              if(aLi[i].index >= n+1 && aLi[i].index<=m){
                aLi[i].index--;
                
                this.move(aLi[i], this.aPos[aLi[i].index]);
              }
            }
          } else if(n>m){
            for(var i = 0; i < aLi.length; i++){
              
              if(aLi[i].index>=m && aLi[i].index <=n-1){
                aLi[i].index++;
                this.move(aLi[i], this.aPos[aLi[i].index]);
              }
            }
          }
          obj.index = m;
        }
    
  }

  move = (obj,json) => {    
    for(var key in json){    
          obj.style[key]=json[key]+'px'
      }
  }

  render() {
    
    return (
		<Router>
	      <div className="container">
          <div className="content">
              {this.state.list.map((item, index) => <div key={index} 
                className="item"
                onMouseDown={(e) => this.mousedown(e, index)}
            >{item}</div>)}

          </div>
	      </div>
	    </Router>
    );
  }
}

export default App;

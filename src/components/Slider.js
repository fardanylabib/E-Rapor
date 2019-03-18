import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SliderItem from './SliderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import './Slider.scss';

class Slider extends React.Component {
    constructor(props){
      super(props);  
      this.state = {
              items: this.props.items,
              active: 0,
              direction: ''
          }
      this.moveRight = this.moveRight.bind(this)
      this.moveLeft = this.moveLeft.bind(this);
    }
    
    generateItems() {   
      var items = [];
      var level;
      for (var i = this.state.active -1; i < this.state.active + 2; i++) { //i=-1 | i=0
        var index;    
        
        if (i < 0) {
            index = this.state.items.length + i; //3
        } else if (i >= this.state.items.length) {
            index = i % this.state.items.length; 
        } else{
            index = i;
        }
        
        level = (i-this.state.active ); //-1
        
        items.push(<SliderItem key={index} id={this.state.items[index]} level={level} />);
        
      }
      return items;  
   }
    
    moveLeft(){
      var index = this.state.active;
      index < 1 ? index = this.state.items.length - 1 : index--;
      this.setState({
        active:index,
        direction: 'left'
      });
    }
    
    moveRight(){
      var index = this.state.active;
      index >= 3 ? index = 0 : index++;
      this.setState({
        active:index,
        direction: 'right'
      });
    }
    
    render(){
      const index = this.state.active;
      const level = index - 1;
      return (
        <div id="container">
          {this.generateItems()}
          <button id="left" onClick={this.moveLeft}><FontAwesomeIcon icon={faCoffee} /></button>
          <button id="right" onClick={this.moveRight}><FontAwesomeIcon icon={faCoffee} /></button>
        </div>
      );
    }
    
}

export default Slider;
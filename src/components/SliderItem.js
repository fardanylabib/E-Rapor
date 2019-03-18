import React, { Component } from 'react';
import BACK_1 from '../media/PhysicsFundamental.jpg';
import BACK_2 from '../media/JuaraFisika2.jpg';
import BACK_3 from '../media/ELearning2.jpg';
import BACK_4 from '../media/JuaraFisika2.jpg';

const SLIDE_TITLES = ["Header 1", "Header 2", "Header 3","Header 4"];
const SLIDE_CONTENTS = ["Lorem ipsum proin gravida", "Lalala lalalla aalalalala", "Doobi boodi doo","Doobi boodi doo bae"];
const BACKGROUND_IMAGES = [BACK_1,BACK_2,BACK_3,BACK_4];

class SliderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title : SLIDE_TITLES,
      content : SLIDE_CONTENTS,
      background : BACKGROUND_IMAGES
    }
  }
    
  render() {
    const className = 'item level' + this.props.level;
    const item = this.props.id-1;
    const id = "slide" + this.props.id.toString();
    return(
      <div className={className} id={id} >

        <h1>{this.state.title[item]}</h1>
        <p>{this.state.content[item]}</p>
      </div>
    );
  }
}

export default SliderItem;
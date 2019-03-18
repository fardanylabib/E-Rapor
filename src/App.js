import React, { Component } from 'react';
import './App.css';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';
import Content from './components/Content';
import BrowserRouter from 'react-router-dom/BrowserRouter';


class App extends Component {
  render() {

    return (
      <div className="App">
      
        <PersistentDrawerLeft/>
        <BrowserRouter>
          <Content/>
        </BrowserRouter>
        
        {/* <Carousel>
          <div className="Slide1">

            <h2 className="Title">Bandul tumbukan</h2>
          </div>
          <div className="Slide2">
            <h2 className="Title">Juara Fisika</h2>
          </div>
          <div className="Slide3">
            <h2 className="Title">Online Courses</h2>
          </div>
        </Carousel> */}
      </div>
    );
  }
}

export default App;

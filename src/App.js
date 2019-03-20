import React, { Component } from 'react';
import './App.css';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';
import BrowserRouter from 'react-router-dom/BrowserRouter';


class App extends Component {
  render() {

    return (
      <div className="App">
      
        
        <BrowserRouter>
          <PersistentDrawerLeft/>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import PersistentDL from './components/PersistentDL';
import BrowserRouter from 'react-router-dom/BrowserRouter';


class App extends Component {
  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <PersistentDL/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Header from './components/utility/Header';
import Main from './components/utility/Main';
import logo from './logo.svg';
import './App.css';
import Centers from './components/centers/container/Centers';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/*<Centers />*/}
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;

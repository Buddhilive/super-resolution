import React, { Component } from 'react';
import DropImage from './components/DropImage'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Image Super Resolution <br />(Do not use, development still in progress)</h1>
        <p>Drag and drop images to increase the size of an image by 2x without losing quality.</p>
        <DropImage />
      </div>
    );
  }
}

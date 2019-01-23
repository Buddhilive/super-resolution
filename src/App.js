import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import DropImage from './components/DropImage'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        model: ''
    }

    this.loadModel()
  }

  async loadModel() {
    let model = await tf.loadModel('./model/model.json');

    this.setState({model: model})
  }

  render() {
    return (
      <div className="App">
        <h1>Image Super Resolution</h1>
        <p>Drag and drop images to increase the size of an image by 2x without losing quality.</p>
        <DropImage model={this.state.model} />
      </div>
    );
  }
}

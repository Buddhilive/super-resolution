import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import DropImage from './components/DropImage'
import './App.css';

import { css } from '@emotion/core';
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      model: ''
    }

    this.loadModel()
  }

  async loadModel() {
    let model = await tf.loadModel('./model/model.json');

    this.setState({model: model, loading: false})
  }

  render() {
    return (
      <div className="App">
        <h1>Image Super Resolution</h1>
        <p>Drag and drop images to increase the size of an image by 2x without losing quality.</p>
        <div className='sweet-loading'>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />
        {this.state.loading &&
        <div style={{'text-align': 'center'}}>Weights are being initialized. Please wait.</div>
        }
      </div>
        {!this.state.loading &&
          <DropImage model={this.state.model} />
        }
      </div>
    );
  }
}

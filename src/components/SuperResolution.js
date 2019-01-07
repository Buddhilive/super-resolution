import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';

export default class SuperResolution extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: ''
    }

    let imageUrl = URL.createObjectURL(this.props.image[0])

    this.getImage(imageUrl).then(async (data) => {
      var url = data.url
      var width = data.width
      var height = data.height

      let tensor = tf.fromPixels(url)
                     .toFloat()
                     .div(tf.scalar(255))
                     .expandDims(0);

      tensor.print()

      let model = await tf.loadModel('./model/model.json');

       let prediction = await model.predict(tensor)
                                  .clipByValue(0, 1)
                                  .mul(tf.scalar(255))
                                  .data();

      console.log(prediction)

      this.renderImage(prediction, width, height)



    }).catch(function(errorUrl){
        //do stuff
    })
  }

  renderImage(prediction, width, height) {
    width = width * 2
    height = height * 2
    let buffer = []; // have enough bytes

    for (var i = 0; i < prediction.length; i+=3) {
      buffer.push(Math.round(prediction[i]))
      buffer.push(Math.round(prediction[i+1]))
      buffer.push(Math.round(prediction[i+2]))
      buffer.push(255)
    }

    // create off-screen canvas element
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    // create imageData object
    var idata = ctx.createImageData(width, height);

    // set our buffer as source
    idata.data.set(buffer);

    // update canvas with new data
    ctx.putImageData(idata, 0, 0);

    var dataUri = canvas.toDataURL(); // produces a PNG file

    var image = new Image();
    image.src = dataUri

    console.log(image)

    //document.body.appendChild(image);

    this.setState({imageSrc: dataUri})
  }

  getImage (url) {
    return new Promise(function(resolve, reject){
        var img = new Image()
        img.onload = function(){
            resolve({
              url: img,
              width: this.width,
              height: this.height
            })
        }
        img.onerror = function(){
            reject(url)
        }
        img.src = url
    })
}

  render() {
    return (
      <div>
        <img src={this.state.imageSrc} />
      </div>
    );
  }

}

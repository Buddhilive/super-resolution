import React from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import SuperResolution from './SuperResolution'

export default class DropImage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
     // Do something with files
     console.log(URL.createObjectURL(acceptedFiles[0]))

     this.setState({files: acceptedFiles})
   }

   render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Dropzone onDrop={this.onDrop}>
              {({getRootProps, getInputProps, isDragActive}) => {
                return (
                  <div
                    {...getRootProps()}
                    className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                  >
                    <input {...getInputProps()} />
                    {
                      isDragActive ?
                        <p>Drop files here...</p> :
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    }
                  </div>
                )
              }}
            </Dropzone>
          </div>
          <div className="col-sm-6">
            {this.state.files.length > 0 &&
              <SuperResolution image={this.state.files} />
            }
          </div>
        </div>
      </div>
    );
  }
}

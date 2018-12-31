import React from 'react'
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
    this.setState({files: []})
     // Do something with files
     console.log(URL.createObjectURL(acceptedFiles[0]))

     this.setState({files: acceptedFiles})
   }

   render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Dropzone onDrop={this.onDrop}>
              {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
                let styles = {...baseStyle}
                    styles = isDragActive ? {...styles, ...activeStyle} : styles
                    styles = isDragReject ? {...styles, ...rejectStyle} : styles
                    return (
                      <div
                        {...getRootProps()}
                        style={styles}
                      >
                        <input {...getInputProps()} />
                        <div>
                          {isDragAccept ? 'Drop' : 'Drag'} files here...
                        </div>
                        {isDragReject && <div>Unsupported file type...</div>}
                      </div>
                    )
              }}
            </Dropzone>
          </div>
          <div className="col-sm-12">
            <div id="super-image"></div>
            {this.state.files.length > 0 &&
              <SuperResolution image={this.state.files} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const baseStyle = {
  width: 200,
  height: 200,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5,
  margin: 'auto'
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};

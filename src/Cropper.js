import React from 'react';
import CropperJS from 'react-cropperjs';

class Cropper extends React.Component {

  _crop() {
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    return (
      <CropperJS
        ref='cropper'
        src='http://i.imgur.com/n483ZwJ.jpg'
        style={{height: 400, width: '100%'}}
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={false}
        crop={this._crop.bind(this)} />
    );
  }
}

export default Cropper;

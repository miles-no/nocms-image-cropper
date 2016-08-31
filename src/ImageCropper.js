import React from 'react';
import Cropper from 'cropperjs';

const minZoom = -50;
const maxZoom = 50;

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 0,
    };

    this.onZoomOutClick = this.onZoomOutClick.bind(this);
    this.onZoomInClick = this.onZoomInClick.bind(this);
    //this.onZoomChange = this.onZoomChange.bind(this);
  }

  componentDidMount() {
    console.log('refs', this.refs);

    const options = {
      zoomOnWheel: false,
    };

    this.cropper = new Cropper(this.refs.img, options);
  }

  zoom(change) {
    const value = this.state.zoom + change;

    console.log('zoom', value);

    this.cropper.zoomTo(1 + (value / 100));

    this.setState({
      zoom: value,
    });
  }

  onZoomOutClick() {
    console.log('zoom out');

    this.zoom(-5);

    //this.cropper.zoom(-0.1);
  }

  onZoomInClick() {
    console.log('zoom in', this.cropper.zoom());

    this.zoom(5);
    //this.cropper.zoom(0.1);
  }

  render() {
    const imgStyle = {
      height: '400px',
      width: '100%',
      opacity: 0,
    };

    const {
      zoom,
    } = this.state;

    return (
      <div>
        <img
          crossOrigin={this.props.crossOrigin}
          ref="img"
          src={this.props.src}
          alt={this.props.alt === undefined ? "picture" : this.props.alt}
          style={imgStyle}
        />
        <div>
          <button onClick={this.onZoomOutClick}>-</button>
          <input type="range" min="-50" max="50" step="1" value={zoom} />
          <button onClick={this.onZoomInClick}>+</button>
        </div>
      </div>
    );
  }
}

export default ImageCropper;

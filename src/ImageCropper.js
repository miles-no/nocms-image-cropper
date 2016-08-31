import React from 'react';
import Cropper from 'cropperjs';

const minZoom = -0.5;
const maxZoom = 0.5;
const zoomStep = 0.05;

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 0,
    };

    this.onZoomButtonClick = this.onZoomButtonClick.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
    this.onCropperZoom = this.onCropperZoom.bind(this);
  }

  componentDidMount() {
    const options = {
      zoomOnWheel: false,
      zoom: this.onCropperZoom,
    };

    this.cropper = new Cropper(this.refs.img, options);
  }

  onCropperZoom(event) {
    const zoom = Math.round((event.ratio - 1) * 100) / 100;

    console.log('zuuum', event.ratio, zoom);

    if (zoom <= minZoom || zoom >= maxZoom) {
      return false;
    }

    this.setState({
      zoom: zoom,
    });

    return true;
  }

  onZoomButtonClick(change) {
    console.log('zoom out', change);

    const value = this.state.zoom + change;

    this.zoom(value);
  }

  onZoomChange(event) {
    console.log('onZoomChange', event.target.value);
    const value = parseFloat(event.target.value);
    if (value < minZoom || value > maxZoom) {
      return;
    }

    this.zoom(value);
  }

  zoom(value) {
    console.log('zoom', value);

    value = value > maxZoom ? maxZoom : value < minZoom ? minZoom : value;

    this.cropper.zoomTo(1 + (value));

    this.setState({
      zoom: value,
    });
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
          <button onClick={() => this.onZoomButtonClick(-1 * zoomStep)} disabled={zoom <= minZoom}>-</button>
          <input type="range" min={minZoom} max={maxZoom} step={zoomStep} value={zoom} onChange={this.onZoomChange} />
          <button onClick={() => this.onZoomButtonClick(zoomStep)} disabled={zoom >= maxZoom}>+</button>
        </div>
      </div>
    );
  }
}

export default ImageCropper;

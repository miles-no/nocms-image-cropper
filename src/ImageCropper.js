import React from 'react';
import Cropper from 'cropperjs';

const autoCropArea = 0.8; //  80% of the image
//const minZoom = Math.floor((autoCropArea - 1) * 100) / 100;
//const maxZoom = Math.ceil((1 - autoCropArea) * 100) / 100;
const maxZoom = autoCropArea * 2;
const numberOfSteps = 100;
//const zoomStep = (maxZoom * 2) / 100;
//const zoomStepIncrement = 1 / zoomStep;

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    //console.log("x", minZoom, maxZoom, zoomStep, zoomStepIncrement);

    this.state = {
      minZoom: null,
      zoomStep: null,
      zoom: 0,
    };

    this.onZoomButtonClick = this.onZoomButtonClick.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
    this.onCropperZoom = this.onCropperZoom.bind(this);
  }

  componentDidMount() {
    const options = {
      viewMode: 1,
      autoCropArea,
      dragMode: 'move',
      cropBoxMovable: false,
      cropBoxResizable: false,
      aspectRatio: this.props.aspectRatio,
      guides: false,
      center: false,
      highlight: false,
      rotatable: false,
      scalable: false,
      zoomOnWheel: false,
      zoom: this.onCropperZoom,
      crop: (event) => {
        if (this.state.minZoom === null) {
          this.calculateMinZoom();
        }
/*
        console.log('crop', event, this.cropper);
        console.log("image data", this.cropper.getImageData());
        console.log("data", this.cropper.getData());

        var data = this.cropper.getImageData();
        var ratioW = data.width / data.naturalWidth;
        var ratioH = data.height / data.naturalHeight;

        console.log('rat', ratioW, ratioH, ratioW * minZoom);
        console.log('rat2', ratioW, minZoom, ratioW * minZoom);

        var maxHeight = data.naturalWidth / this.props.aspectRatio;
        var maxWidth = data.naturalHeight / this.props.aspectRatio;

        console.log('maxHeight', maxHeight);
        console.log('maxWidth', maxWidth);

        var h = (maxHeight * ratioH) / data.naturalHeight;
        var w = (maxWidth * ratioW) / data.naturalWidth;

        console.log('h', h, w);

        this.calculateMinZoom();*/
      },
      ready: (event) => {
        console.log('ready', event);
      }
    };

    this.cropper = new Cropper(this.refs.img, options);

    console.log("image data", this.cropper.getImageData());

  }

  calculateMinZoom() {
    const data = this.cropper.getImageData();
    let ratio;
    if (this.props.aspectRatio > 0) {
      ratio = data.width / data.naturalWidth;
    } else {
      ratio = data.height / data.naturalHeight;
    }

    const minZoom = ratio - (ratio * (1 - autoCropArea));
    console.log('calculateMinZoom', ratio, minZoom, data);

    this.setState({
      zoom: ratio,
      minZoom,
      zoomStep: this.calculateZoomStep(minZoom, maxZoom),
    });
  }

  calculateZoomStep(min, max) {
    return (max - min) / numberOfSteps;
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);

    this.setState({
      minZoom: null,
    });

    if (nextProps.src !== this.props.src) {
         this.cropper.replace(nextProps.src);
    }
    if (nextProps.aspectRatio !== this.props.aspectRatio) {
       this.cropper.setAspectRatio(nextProps.aspectRatio);
    }    

    this.cropper.reset();
  }

  onCropperZoom(event) {
    let zoom = event.ratio;

    console.log('onCropperZoom', event);

    if (zoom < this.state.minZoom) {
      this.cropper.zoomTo(this.state.minZoom);

      return false;
    }

    if (zoom > maxZoom) {
      this.cropper.zoomTo(maxZoom);

      return false;
    }

    /*if (zoom < minZoom - zoomStep || zoom > maxZoom + zoomStep) {
      return false;
    }

    if (zoom < minZoom) {
      zoom = minZoom;
    } else if (zoom > maxZoom) {
      zoom = maxZoom;
    //} else if (zoom < 0) {
    //  zoom = Math.floor((zoom) * zoomStepIncrement) / zoomStepIncrement;
    } else {
      zoom = Math.round((zoom) * zoomStepIncrement) / zoomStepIncrement;
    }*/

    console.log('zuuum', zoom);

    this.setState({
      zoom: zoom,
    });

    return true;
  }

  onZoomButtonClick(change) {
    console.log('zoom out', change);

    const value = this.state.zoom + change;

    //this.cropper.zoom(change);
    this.zoom(value);
  }

  onZoomChange(event) {
    console.log('onZoomChange', event.target.value);
    const value = parseFloat(event.target.value);
    //if (value < minZoom || value > maxZoom) {
    //  return;
    //}

    this.zoom(value);
  }

  zoom(value) {
    console.log('zoom', value);

    const minZoom = this.state.minZoom;
    value = value > maxZoom ? maxZoom : value < minZoom ? minZoom : value;

    this.cropper.zoomTo(value);

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
      minZoom,
      zoomStep,
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

ImageCropper.propTypes = {
  src: React.PropTypes.string,
  aspectRatio: React.PropTypes.number,
  autoCropArea: React.PropTypes.number,
};

ImageCropper.defaultProps = {
  aspectRatio: 16 / 9,
};

export default ImageCropper;

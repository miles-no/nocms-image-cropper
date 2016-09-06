import React from 'react';
import Slider from './atoms/Slider';
import Cropper from 'cropperjs';

const autoCropArea = 0.8; //  80% of the image
const maxZoom = autoCropArea * 2;

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 0,
      minZoom: null,
    };

    this.onSliderChange = this.onSliderChange.bind(this);
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
      crop: () => {
        if (this.state.minZoom === null) {
          this.calculateMinZoom();
        }
      },
    };

    this.cropper = new Cropper(this.refs.img, options);
  }

  componentWillReceiveProps(nextProps) {
    this.state.minZoom = null;
    //this.state.zoom = 0;

    if (nextProps.src !== this.props.src) {
      this.cropper.replace(nextProps.src);
    }
    if (nextProps.aspectRatio !== this.props.aspectRatio) {
      this.cropper.setAspectRatio(nextProps.aspectRatio);
    }

    this.cropper.reset();
  }

  onCropperZoom(event) {
    const zoom = event.ratio;

    console.log('onCropperZoom', zoom, event);

    if (!event.originalEvent) {
      return true;
    }

    if (zoom < this.state.minZoom) {
      console.log('setting to min', this.state.minZoom);
      this.cropper.zoomTo(this.state.minZoom);

      this.setState({
        zoom: this.state.minZoom,
      });

      return false;
    }

    if (zoom > maxZoom) {
      this.cropper.zoomTo(maxZoom);

      this.setState({
        zoom: maxZoom,
      });

      return false;
    }

    this.setState({
      zoom,
    });

    return true;
  }

  onSliderChange(value) {
    this.zoom(value);
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

    console.log('minZoom', minZoom, ratio);

    this.setState({
      zoom: ratio,
      minZoom,
    });
  }

  zoom(value) {
    const minZoom = this.state.minZoom;
    let zoom = value;
    if (zoom > maxZoom) {
      zoom = maxZoom;
    } else if (zoom < minZoom) {
      zoom = minZoom;
    }

    console.log('zoom', zoom, minZoom);
    this.cropper.zoomTo(zoom);
    console.log('set state', zoom);
    this.setState({
      zoom,
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
    } = this.state;

    return (
      <div className="image-cropper__body">
        <img
          ref="img"
          src={this.props.src}
          alt="Crop"
          style={imgStyle}
        />
        {this.props.src !== null ?
          <Slider onChange={this.onSliderChange} value={zoom} min={minZoom} max={maxZoom} withBars className="image-cropper__slider" />
          : null}
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

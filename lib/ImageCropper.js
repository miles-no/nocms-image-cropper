'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Slider = require('./atoms/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _cropperjs = require('cropperjs');

var _cropperjs2 = _interopRequireDefault(_cropperjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var autoCropArea = 0.8; //  80% of the image
var maxZoom = autoCropArea * 2;

var ImageCropper = function (_React$Component) {
  _inherits(ImageCropper, _React$Component);

  function ImageCropper(props) {
    _classCallCheck(this, ImageCropper);

    var _this = _possibleConstructorReturn(this, (ImageCropper.__proto__ || Object.getPrototypeOf(ImageCropper)).call(this, props));

    _this.state = {
      zoom: 0,
      minZoom: null
    };

    _this.onSliderChange = _this.onSliderChange.bind(_this);
    _this.onCropperZoom = _this.onCropperZoom.bind(_this);
    return _this;
  }

  _createClass(ImageCropper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var options = {
        viewMode: 1,
        autoCropArea: autoCropArea,
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
        //background: false,
        zoom: this.onCropperZoom,
        crop: function crop() {
          if (_this2.state.minZoom === null) {
            setTimeout(function () {
              _this2.calculateMinZoom();
            }, 200);
          }
        }
      };

      this.cropper = new _cropperjs2.default(this.refs.img, options);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.state.minZoom = null;

      if (nextProps.src !== this.props.src) {
        this.cropper.replace(nextProps.src);
      }
      if (nextProps.aspectRatio !== this.props.aspectRatio) {
        this.cropper.setAspectRatio(nextProps.aspectRatio);
      }

      this.cropper.reset();
    }
  }, {
    key: 'onCropperZoom',
    value: function onCropperZoom(event) {
      if (!event.originalEvent) {
        return true;
      }

      var zoom = event.ratio;
      if (zoom < this.state.minZoom) {
        zoom = this.state.minZoom;
        this.cropper.zoomTo(zoom);
      }

      if (zoom > maxZoom) {
        zoom = maxZoom;
        this.cropper.zoomTo(zoom);
      }

      this.setState({
        zoom: zoom
      });

      return event.ratio >= this.state.minZoom && event.ratio <= maxZoom;
    }
  }, {
    key: 'onSliderChange',
    value: function onSliderChange(value) {
      this.zoom(value);
    }
  }, {
    key: 'calculateMinZoom',
    value: function calculateMinZoom() {
      var data = this.cropper.getImageData();
      console.log('calculateMinZoom', data);
      var ratio = void 0;
      if (this.props.aspectRatio > 0) {
        ratio = data.width / data.naturalWidth;
      } else {
        ratio = data.height / data.naturalHeight;
      }

      var minZoom = ratio - ratio * (1 - autoCropArea);

      console.log('minZoom', minZoom, ratio);

      this.setState({
        zoom: ratio,
        minZoom: minZoom
      });
    }
  }, {
    key: 'zoom',
    value: function zoom(value) {
      var minZoom = this.state.minZoom;
      var zoom = value;
      if (zoom > maxZoom) {
        zoom = maxZoom;
      } else if (zoom < minZoom) {
        zoom = minZoom;
      }

      //console.log('zoom', zoom, minZoom);
      this.cropper.zoomTo(zoom);
      //console.log('set state', zoom);
      this.setState({
        zoom: zoom
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var imgStyle = {
        _height: '400px',
        width: '100%',
        opacity: 0
      };

      var _state = this.state;
      var zoom = _state.zoom;
      var minZoom = _state.minZoom;


      return _react2.default.createElement(
        'div',
        { className: 'image-cropper__body' },
        _react2.default.createElement('img', {
          ref: 'img',
          src: this.props.src,
          alt: 'Crop',
          style: imgStyle
        }),
        this.props.src !== null ? _react2.default.createElement(_Slider2.default, { onChange: this.onSliderChange, value: zoom, min: minZoom, max: maxZoom, withBars: true, className: 'image-cropper__slider' }) : null
      );
    }
  }]);

  return ImageCropper;
}(_react2.default.Component);

ImageCropper.propTypes = {
  src: _react2.default.PropTypes.string,
  aspectRatio: _react2.default.PropTypes.number,
  autoCropArea: _react2.default.PropTypes.number
};

ImageCropper.defaultProps = {
  aspectRatio: 16 / 9
};

exports.default = ImageCropper;
module.exports = exports['default'];
//# sourceMappingURL=ImageCropper.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSlider = require('react-slider');

var _reactSlider2 = _interopRequireDefault(_reactSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numberOfSteps = 1000;

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.onIncrementClick = _this.onIncrementClick.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      // Hack
      this.refs.slider._handleResize();
    }
  }, {
    key: 'onIncrementClick',
    value: function onIncrementClick(increment) {
      this.onChange(this.refs.slider.getValue() + increment);
    }
  }, {
    key: 'onChange',
    value: function onChange(percent) {
      if (typeof this.props.onChange === 'function') {
        var value = this.convertFromSliderScale({
          min: this.props.min,
          max: this.props.max,
          percent: percent
        });

        this.props.onChange(value);
      }
    }
  }, {
    key: 'convertToSliderScale',
    value: function convertToSliderScale(_ref) {
      var min = _ref.min;
      var max = _ref.max;
      var value = _ref.value;

      var percent = (value - min) / (max - min) * numberOfSteps;
      //console.log('convertToPercent', percent);

      return percent;
    }
  }, {
    key: 'convertFromSliderScale',
    value: function convertFromSliderScale(_ref2) {
      var min = _ref2.min;
      var max = _ref2.max;
      var percent = _ref2.percent;

      var value = 1.0 / numberOfSteps * (percent * max + numberOfSteps * min - percent * min);
      //console.log('convertFromPercent', value);

      return value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var value = this.convertToSliderScale(this.props);

      return _react2.default.createElement(
        'div',
        { className: 'image-cropper__slider-container' },
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.onIncrementClick(-1);
            }, disabled: value === 0, className: 'material-icons image-cropper__zoom-out' },
          'remove'
        ),
        _react2.default.createElement(_reactSlider2.default, { onChange: this.onChange, value: value, min: 0, max: numberOfSteps, withBars: true, className: 'image-cropper__slider', ref: 'slider' }),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.onIncrementClick(1);
            }, disabled: value === numberOfSteps, className: 'material-icons image-cropper__zoom-in' },
          'add'
        )
      );
    }
  }]);

  return Slider;
}(_react2.default.Component);

Slider.propTypes = {
  value: _react2.default.PropTypes.number,
  min: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func
};

exports.default = Slider;
module.exports = exports['default'];
//# sourceMappingURL=Slider.js.map
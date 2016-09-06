import React from 'react';
import ReactSlider from 'react-slider';

const numberOfSteps = 1000;

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.onIncrementClick = this.onIncrementClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps() {
    console.debug('render', this.refs.slider);

    // Hack
    this.refs.slider._handleResize();
  }

  onIncrementClick(increment) {
    this.onChange(this.refs.slider.getValue() + increment);
  }

  onChange(percent) {
    if (typeof this.props.onChange === 'function') {
      const value = this.convertFromPercent({
        min: this.props.min,
        max: this.props.max,
        percent,
      });

      this.props.onChange(value);
    }
  }

  convertToPercent({ min, max, value }) {
    const percent = ((value - min) / (max - min)) * numberOfSteps;
    console.log('convertToPercent', percent);

    return percent;
  }

  convertFromPercent({ min, max, percent }) {
    const value = (1.0 / numberOfSteps) * (percent * max + numberOfSteps * min - percent * min);
    console.log('convertFromPercent', value);

    return value;
  }

  render() {
    const value = this.convertToPercent(this.props);

    return (
      <div className="image-cropper__slider-container">
        <button onClick={() => this.onIncrementClick(-1)} disabled={value === 0} className="material-icons image-cropper__zoom-out">remove</button>
        <ReactSlider onChange={this.onChange} value={value} min={0} max={numberOfSteps} withBars className="image-cropper__slider" ref="slider" />
        <button onClick={() => this.onIncrementClick(1)} disabled={value === numberOfSteps} className="material-icons image-cropper__zoom-in">add</button>
      </div>
    );
  }
}

Slider.propTypes = {
  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

export default Slider;

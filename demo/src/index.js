import React, { PropTypes } from 'react';
const ReactDOM = require('react-dom');
import { ImageCropper } from 'nocms-image-cropper';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
      aspectRatio: 16 / 9,
    };

    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick(src, aspectRatio) {
    console.log("onImageClick", src, aspectRatio);
    this.setState({
      src,
      aspectRatio,
    });
  }

  render() {
    const {
      src,
      aspectRatio,
    } = this.state;

    const style = {
      width: '100px',
      margin: '10px',
    }

    return (<div>
      <img style={style} src="../img/alley.jpg" onClick={() => this.onImageClick('../img/alley.jpg', 16 / 9)} />
      <img style={style} src="../img/alley2.jpg" onClick={() => this.onImageClick('../img/alley2.jpg', 16 / 9)} />
      <img style={style} src="../img/alley.jpg" onClick={() => this.onImageClick('../img/alley.jpg', 4 / 3)} />
      <img style={style} src="../img/airport.jpeg" onClick={() => this.onImageClick('../img/airport.jpeg', 4 / 3)} />
      <img style={style} src="../img/airport.jpeg" onClick={() => this.onImageClick('../img/airport.jpeg', 3 / 5)} />
      <ImageCropper src={src} aspectRatio={aspectRatio} />
    </div>);
  }
}

App.propTypes = {
};

ReactDOM.render(<App />, document.getElementById('app'));

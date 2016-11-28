import React from 'react';
const ReactDOM = require('react-dom');
import { ImageCropper } from 'nocms-image-cropper';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
      aspectRatio: {
        width: 16,
        height: 9,
      },
    };

    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick(src, aspectRatio) {
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
    };

    return (<div>
      <ImageCropper src={src} aspectRatio={aspectRatio} />
      <p>Click on an image to start cropping.</p>
      <img style={style} src="../img/alley.jpg" onClick={() => this.onImageClick('../img/alley.jpg', {width: 16, height: 9})} />
      <img style={style} src="../img/alley2.jpg" onClick={() => this.onImageClick('../img/alley2.jpg', {width: 16, height: 9})} />
      <img style={style} src="../img/alley.jpg" onClick={() => this.onImageClick('../img/alley.jpg', {width: 4, height: 3})} />
      <img style={style} src="../img/airport.jpeg" onClick={() => this.onImageClick('../img/airport.jpeg', {width: 4, height: 3})} />
      <img style={style} src="../img/blomst.jpeg" onClick={() => this.onImageClick('../img/blomst.jpeg', {width: 3, height: 5})} />
      <img style={style} src="../img/lite.png" onClick={() => this.onImageClick('../img/lite.png', {width: 16, height: 9})} />
      <img style={style} src="http://res.cloudinary.com/dxzl6tbhy/image/upload/v1471954670/article/bridge_nocms.jpg" onClick={() => this.onImageClick('http://res.cloudinary.com/dxzl6tbhy/image/upload/v1471954670/article/bridge_nocms.jpg',{width: 16, height: 9})} />
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

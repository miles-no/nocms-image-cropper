import React, { PropTypes } from 'react';
const ReactDOM = require('react-dom');
import { ImageCropper } from 'nocms-image-cropper';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <ImageCropper src="http://i.imgur.com/n483ZwJ.jpg" />
    </div>);
  }
}

App.propTypes = {
  simple: PropTypes.string,
  linkeditor: PropTypes.string,
};

ReactDOM.render(<App />, document.getElementById('app'));

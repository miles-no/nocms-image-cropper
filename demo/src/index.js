import React, { PropTypes } from 'react';
const ReactDOM = require('react-dom');
import { Cropper } from 'nocms-image-cropper';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      Test
      <Cropper />
    </div>);
  }
}

App.propTypes = {
  simple: PropTypes.string,
  linkeditor: PropTypes.string,
};

ReactDOM.render(<App />, document.getElementById('app'));

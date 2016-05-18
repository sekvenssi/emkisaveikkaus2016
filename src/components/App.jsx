import React from 'react'
import SpreadSheet from 'google-spreadsheet-reader'

class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount(){
    const spreadSheet = new SpreadSheet('12e4vUjpfsBNUH4mxZLZZW0XCwrUtyZiyiIPbn4BLUuo')

    spreadSheet.load()
    .then(function(res) { console.log(res); }) // beautiful JSON!
    .catch(function(err) { console.error(err.message); }); // Aw, something happened. 
  }

  render() {
    return (
      <h2>Hello word</h2>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

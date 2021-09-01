import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import axios from 'axios'
import Header from './components/header';
//import Upload from './components/upload';

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);


class Upload extends React.Component {

  state = {
    selectedFile: null
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData()
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('', fd)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })

  }
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>


          <p>File Type: {this.state.selectedFile.type}</p>


          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div>
          <input type="file" onChange={this.fileSelectedHandler} />
          <button onClick={this.fileUploadHandler}>
            Upload!
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }

}

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Upload />
    </ChakraProvider>
  );
}

export default App;

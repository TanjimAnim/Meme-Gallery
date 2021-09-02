import * as React from "react"
import { ChakraProvider, Button, ButtonGroup } from "@chakra-ui/react"
import axios from 'axios'
import Header from './components/header';
import SubmitLink from "./components/submitLink";

function NodejsConnect() {
  return (
    <form action="../../" method="post"
      className="form">
      <Button colorScheme="teal" size="sm" type="submit">Connected?</Button>
    </form>
  )
}


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
    axios.post('/upload', fd)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })

  }
  fileData = () => {

    if (this.state.selectedFile) {
      if (this.state.selectedFile.type === "image/jpeg" || this.state.selectedFile.type === "image/png") {
        return (
          <div>
            <h2>File Details:</h2>

            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <Button colorScheme="teal" size="sm" onClick={this.fileUploadHandler}>
              Upload!
            </Button>

          </div>
        );

      } else {
        return (
          <div>
            <br />
            <h4>Please choose an image to upload</h4>
          </div>

        )
      }
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
        </div>
        {this.fileData()}
      </div>
    );
  }

}

function App() {
  return (
    <ChakraProvider>
      <NodejsConnect />
      <Header />
      <SubmitLink />
      <Upload />
    </ChakraProvider>
  );
}

export default App;

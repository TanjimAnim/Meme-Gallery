import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ChakraProvider, Button, Flex } from "@chakra-ui/react";
import axios from "axios";

import Header from "./components/header";
import SubmitLink from "./components/submitLink";
import DisplayImage from "./components/displayImg";

class Upload extends React.Component {
  state = {
    selectedFile: null,
    error: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("/upload", fd)
      .then((res) => {
        console.log(res);
        this.props.onSuccessfulUpload();
        this.setState({
          selectedFile: null,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          selectedFile: null,
          error: error.response.data.error,
        });
      });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      if (
        this.state.selectedFile.type === "image/jpeg" ||
        this.state.selectedFile.type === "image/png"
      ) {
        return (
          <div>
            {this.state.error && <div>file too large!!</div>}
            <Button
              colorScheme='teal'
              size='sm'
              onClick={this.fileUploadHandler}
            >
              Upload!
            </Button>
          </div>
        );
      } else {
        return (
          <div>
            <h4>Please choose an image to upload</h4>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h4>Choose Photos</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <input type='file' onChange={this.fileSelectedHandler} />
        {this.fileData()}
      </div>
    );
  }
}

function App() {
  const [images, setImages] = useState([]);

  const refreshImages = useCallback(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setImages(
          data.map((item) => {
            if (item.img.data.slice(0, 7) === "images-") {
              item.img.data = "/" + item.img.data;
            }
            return item;
          })
        );
      });
  }, []);

  useEffect(() => {
    refreshImages();
  }, []);

  return (
    <ChakraProvider>
      <Header />
      <Flex
        mt={4}
        direction={{
          base: "column",
          md: "row",
          xl: "row",
        }}
        alignItems='center'
        justifyContent='space-between'
      >
        <SubmitLink onSuccessfulUpload={refreshImages} />
        <Upload onSuccessfulUpload={refreshImages} />
      </Flex>
      <DisplayImage images={images} onSuccessfulUpload={refreshImages} />
    </ChakraProvider>
  );
}

export default App;

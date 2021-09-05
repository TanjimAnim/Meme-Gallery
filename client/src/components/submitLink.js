import react from "react";
import { Box, FormControl, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import DisplayImage from "./displayImg";

class SubmitLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  onInputChange = (event) => {
    this.setState({
      url: event.target.value,
    });
  };
  onClick = () => {
    axios
      .post("/submitlink", {
        url: this.state.url,
      })
      .then((response) => {
        console.log(response);
        this.props.onSuccessfulUpload();
        this.setState({
          url: "",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <FormControl>
        <Input
          type='url'
          value={this.state.url}
          onChange={this.onInputChange}
          width={{
            base: "80%",
            md: "55%",
            xl: "60%",
          }}
        />
        <Button
          ml={3}
          mb={1}
          colorScheme='teal'
          type='submit'
          onClick={this.onClick}
        >
          Submit
        </Button>
      </FormControl>
    );
  }
}

export default SubmitLink;

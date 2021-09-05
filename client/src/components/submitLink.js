import react from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

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
            base: "35%",
            md: "40%",
            xl: "50%",
          }}
          mt={5}
        />
        <Button
          mb={1}
          ml={2}
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

import { FormControl, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { baseUrl } from "../config";

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
      .post(`${baseUrl}/submitlink`, {
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
            base: "70%",
            md: "55%",
            xl: "60%",
          }}
          ml={{
            base: "5%",
            md: "5%",
            xl: "4%",
          }}
        />
        <Button
          ml={2}
          mb={1}
          colorScheme='teal'
          type='submit'
          onClick={this.onClick}
          size='md'
        >
          Submit
        </Button>
      </FormControl>
    );
  }
}

export default SubmitLink;

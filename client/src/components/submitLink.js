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
  isUrlValid = () => {
    const { url } = this.state;
    const res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/g
    );
    if (res === null) {
      return true;
    }
    return false;
  };

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
          isDisabled={this.isUrlValid()}
        >
          Submit
        </Button>
      </FormControl>
    );
  }
}

export default SubmitLink;

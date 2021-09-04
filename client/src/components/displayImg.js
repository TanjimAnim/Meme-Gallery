import React from "react";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import axios from "axios";

class DisplayImage extends React.Component {
  constructor(props) {
    super(props);
  }

  onDelete = (id) => {
    axios
      .post(`/delete/${id}`)
      .then((response) => {
        this.props.onSuccessfulUpload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return this.props.images.map((img) => {
      return (
        <Box>
          <img src={`${img.img.data}`} />
          <Button
            onClick={() => {
              this.onDelete(img._id);
            }}
          >
            Delete
          </Button>
        </Box>
      );
    });
  }
}

export default DisplayImage;

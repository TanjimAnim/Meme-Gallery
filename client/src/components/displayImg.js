import React from "react";
import axios from "axios";
import { Box, Image, CloseButton } from "@chakra-ui/react";

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
        <Box position='relative'>
          <Image
            boxSize={{ base: "25%", md: "30%", xl: "30%" }}
            borderRadius='3px'
            src={`${img.img.data}`}
          />
          <CloseButton
            size='sm'
            onClick={() => {
              this.onDelete(img._id);
            }}
            style={{
              position: "absolute",
              top: "0%",
              left: "0%",
              width: 20,
              height: 20,
              color: "black",
              background: "#FFFFF0",
            }}
          />
        </Box>
      );
    });
  }
}

export default DisplayImage;

import React from "react";
import axios from "axios";
import { Box, Image, CloseButton, Flex } from "@chakra-ui/react";
import { baseUrl } from "../config";

class DisplayImage extends React.Component {
  onDelete = (id) => {
    axios
      .post(`${baseUrl}/delete/${id}`)
      .then((response) => {
        this.props.onSuccessfulUpload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Flex
        direction='row'
        wrap='wrap'
        mt={3}
        alignItems='center'
        justifyContent='space-evenly'
      >
        {this.props.images.map((img) => {
          return (
            <Box
              position='relative'
              width={{ base: "100%", md: "50%", xl: "40%" }}
            >
              <Image borderRadius='3px' src={`${img.img.data}`} width='100%' />
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
        })}
      </Flex>
    );
  }
}

export default DisplayImage;

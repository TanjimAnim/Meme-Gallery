import React from "react";
import axios from "axios";
import { Box, Image, CloseButton, Flex, Center } from "@chakra-ui/react";
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
        flexDirection='row'
        alignItems='center'
        justifyContent='space-evenly'
        wrap='wrap'
        mt={3}
      >
        {this.props.images.map((img) => {
          return (
            <Box
              position='relative'
              mt={4}
              ml={2}
              mx='auto'
              my='auto'
              mb={3}
              width={{ base: "90%", md: "50%", xl: "30%" }}
            >
              <Center>
                <Image
                  src={`${img.img.data}`}
                  fit='cover'
                  borderRadius={3}
                  boxSize={{ base: "100%", md: "50%", xl: "70%" }}
                />

                <CloseButton
                  size='sm'
                  onClick={() => {
                    this.onDelete(img._id);
                  }}
                  style={{
                    position: "absolute",
                    top: "0%",
                    left: "25%",
                    width: 20,
                    height: 20,
                    color: "black",
                    background: "#FFFFF0",
                    hover: {
                      background: "teal",
                    },
                  }}
                />
              </Center>
            </Box>
          );
        })}
      </Flex>
    );
  }
}

export default DisplayImage;

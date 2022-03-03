import React from "react";
import axios from "axios";
import {
  Box,
  Image,
  CloseButton,
  Flex,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { baseUrl } from "../config";

export default function DisplayImage(props) {
  const onDelete = (id) => {
    axios
      .post(`${baseUrl}/delete/${id}`)
      .then((response) => {
        props.onSuccessfulUpload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {props.isLoading ? (
        <Box mt={5}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Box>
      ) : (
        <Flex
          flexDirection='row'
          alignItems='center'
          justifyContent='space-evenly'
          wrap='wrap'
          mt={3}
        >
          {props.images.map((img) => {
            return (
              <Box
                key={img._id}
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
                    left={{ base: "0%", md: "25%", xl: "15%" }}
                    onClick={() => {
                      onDelete(img._id);
                    }}
                    style={{
                      position: "absolute",
                      top: "0%",
                      width: 20,
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
      )}
    </>
  );
}

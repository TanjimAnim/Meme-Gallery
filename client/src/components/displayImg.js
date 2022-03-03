import React from "react";
import axios from "axios";
import { Box, Image, CloseButton, Spinner } from "@chakra-ui/react";
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
        <Box display='flex' flexWrap='wrap' mt={3}>
          {props.images.map((img) => {
            return (
              <Box
                key={img._id}
                position='relative'
                flexGrow='1'
                margin='2px'
                height='200px'
              >
                <Image
                  src={`${img.img.data}`}
                  fit='cover'
                  borderRadius={3}
                  height='200px'
                  flexGrow='1'
                  minWidth='100%'
                  maxWidth='100%'
                  verticalAlign='bottom'
                />

                <CloseButton
                  size='sm'
                  left='0%'
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
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}

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
        <Box
          display='flex'
          flexWrap='wrap'
          mt={3}
          _after={{
            content: `''`,
            flexGrow: 999999999,
          }}
        >
          {props.images.map((img) => {
            return (
              <Box
                key={img._id}
                position='relative'
                flexGrow={`${(img.width * 200) / img.height}`}
                margin='2px'
                width={`${(img.width * 200) / img.height}px`}
              >
                <i paddingBottom={`${(img.height / img.width) * 100}%`}></i>
                <Image
                  src={`${img.img.data}`}
                  borderRadius={3}
                  position='absolute'
                  width='100%'
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
                    color: "white",
                    background: "black",
                    borderRadius: "50%",
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

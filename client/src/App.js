import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ChakraProvider, Flex, Spinner, Box, Text } from "@chakra-ui/react";
import Upload from "./components/upload";

import Header from "./components/header";
import SubmitLink from "./components/submitLink";
import DisplayImage from "./components/displayImg";
import { baseUrl } from "./config";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshImages = useCallback(() => {
    fetch(`${baseUrl}/images`)
      .then((res) => res.json())
      .then((data) => {
        setImages(
          data.map((item) => {
            if (item.img.data.slice(0, 6) === "image-") {
              item.img.data = baseUrl + "/" + item.img.data;
            }
            return item;
          })
        );
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    refreshImages();
  }, [refreshImages]);

  return (
    <ChakraProvider>
      <Header />
      <Flex
        mt={4}
        direction={{
          base: "column",
          md: "row",
          xl: "row",
        }}
        alignItems='center'
        justifyContent='space-between'
      >
        <SubmitLink onSuccessfulUpload={refreshImages} />
        <Upload onSuccessfulUpload={refreshImages} />
      </Flex>
      {isLoading ? (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          height='100%'
        >
          <Text>Loading</Text>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Box>
      ) : (
        <DisplayImage
          images={images}
          onSuccessfulUpload={refreshImages}
          isLoading={isLoading}
        />
      )}
    </ChakraProvider>
  );
}

export default App;

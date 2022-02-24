import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Upload from "./components/upload";

import Header from "./components/header";
import SubmitLink from "./components/submitLink";
import DisplayImage from "./components/displayImg";
import { baseUrl } from "./config";

function App() {
  const [images, setImages] = useState([]);

  const refreshImages = useCallback(() => {
    fetch(`${baseUrl}/images`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setImages(
          data.map((item) => {
            if (item.img.data.slice(0, 6) === "image-") {
              item.img.data = baseUrl + "/" + item.img.data;
            }
            return item;
          })
        );
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
      <DisplayImage images={images} onSuccessfulUpload={refreshImages} />
    </ChakraProvider>
  );
}

export default App;

import React from "react";
import { Box, Center, Text } from "@chakra-ui/layout";

function Header() {
  return (
    <Box
      width={{
        base: "33%",
        md: "35%",
        xl: "38%",
      }}
      border='10px'
      boxShadow='md'
      p={5}
      rounded='md'
      bg='white'
      mx='auto'
    >
      <Center>
        <Text
          fontSize={{
            base: "lg",
            md: "2xl",
            xl: "3xl",
          }}
          fontWeight='bold'
        >
          Meme Gallery
        </Text>
      </Center>
    </Box>
  );
}

export default Header;

import React from 'react';
import { Box, Center, Text } from '@chakra-ui/layout';



function Header() {
    return (
        <Box
            width={{
                base: "65%",
                md: "70%",
                xl: "80%"
            }}
            border="10px"
            boxShadow="md"
            p={5}
            rounded="md"
            bg="white"
            mx="auto">
            <Center>
                <Text>
                    <h1>Meme Gallery</h1>

                </Text>

            </Center>
        </Box>

    )
}

export default Header;
import React from 'react';
import { Box, Center, Text } from '@chakra-ui/layout';

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

function getImage() {
    fetch('/').then((response) => response.json())
        .then((data) => {
            if (data.error) {
                console.error(data.error);
                return "Error";
            } else {
                return data.img;
            }
        });
}
function DisplayImage() {
    console.log(getImage)
    return (
        <Box>
            here are the memes

        </Box>
    )
}

export default DisplayImage;


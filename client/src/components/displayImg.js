import React from 'react';
import { Box, Center, Text } from '@chakra-ui/layout';

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};


class DisplayImage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
    }
    componentDidMount() {
        fetch('/image_data')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(data.img.data);

                this.setState({
                    img: base64Flag + imageStr

                })
            })
    }
    render() {

        return (
            <img
                src={this.state.img}
                alt='Helpful alt text' />
        )
    }
}

export default DisplayImage;


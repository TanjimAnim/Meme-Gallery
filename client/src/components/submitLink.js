import { FormControl, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../config";

export default function SubmitLink(props) {
  const [url, setUrl] = useState("");
  const isUrlValid = () => {
    const res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/g
    );
    if (res === null) {
      return true;
    }
    return false;
  };

  const onInputChange = (event) => {
    setUrl(event.target.value);
  };

  const onClick = () => {
    axios
      .post(`${baseUrl}/submitlink`, {
        url: url,
      })
      .then((response) => {
        props.onSuccessfulUpload();
        setUrl("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <FormControl>
      <Input
        type='url'
        value={url}
        onChange={onInputChange}
        width={{
          base: "70%",
          md: "55%",
          xl: "60%",
        }}
        ml={{
          base: "5%",
          md: "5%",
          xl: "4%",
        }}
      />
      <Button
        ml={2}
        mb={1}
        colorScheme='teal'
        type='submit'
        onClick={onClick}
        size='md'
        isDisabled={isUrlValid()}
      >
        Submit
      </Button>
    </FormControl>
  );
}

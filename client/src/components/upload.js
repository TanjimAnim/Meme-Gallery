import { useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { baseUrl } from "../config";

// function FileData(props) {
//   if (props.selectedFile) {
//     if (
//       props.selectedFile.type === "image/jpeg" ||
//       props.selectedFile.type === "image/png"
//     ) {
//       return (
//         <div>
//           {props.error && <div>file too large!!</div>}
//           <Button colorScheme='teal' size='sm' onClick={props.fileUpload()}>
//             Upload!
//           </Button>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <h4>Please choose an image to upload</h4>
//         </div>
//       );
//     }
//   } else {
//     return (
//       <div>
//         <h4>Choose Photos</h4>
//       </div>
//     );
//   }
// }

export default function Upload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .post(`${baseUrl}/upload`, fd)
      .then((res) => {
        props.onSuccessfulUpload();
        setSelectedFile(null);
        setError(null);
      })
      .catch((error) => {
        setSelectedFile(null);
        setError(error.response.data.error);
      });
  };
  return (
    <div>
      <input
        type='file'
        onChange={(event) => {
          setSelectedFile(event.target.files[0]);
        }}
      />
      {selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png") ? (
        <div>
          {error && <div>file too large!!</div>}
          <Button colorScheme='teal' size='sm' onClick={fileUploadHandler}>
            Upload!
          </Button>
        </div>
      ) : (
        <div>
          <h4>Please choose an image to upload</h4>
        </div>
      )}
    </div>
  );
}

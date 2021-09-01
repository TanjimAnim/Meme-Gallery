import react from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
} from '@chakra-ui/react'



function SubmitLink() {
    return (
        <FormControl>
            <Input type="url" />
            <Button
                mt={4}
                colorScheme="teal"
                type="submit"
            >
                Submit
            </Button>
        </FormControl>

    )

}


export default SubmitLink
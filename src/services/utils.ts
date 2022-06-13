import axios from "axios";
import * as https from "https";

export function handleAxiosError(error: unknown): Error{
    if(axios.isAxiosError(error)){
        if(error.response){
            if(error.response.status < 500){
                return new Error(`${error.response.data}`)
            }
            return new Error("An error occurred in the node.")
        }
    }
    return new Error('The node could not be reached.')
}

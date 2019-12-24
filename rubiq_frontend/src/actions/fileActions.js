import { filesUpload } from "../constants/actionTypes";
import { POST_METHOD } from "../constants/apiMethods";
import { PASSENGERS } from "../configs/urls";

export const uploadFile = data => ({
    types: [filesUpload.SEND_FILE_REQUEST, filesUpload.SEND_FILE_SUCCESS, filesUpload.SEND_FILE_FAILURE],
    method: POST_METHOD,
    endpoint: PASSENGERS,
    body: data
});

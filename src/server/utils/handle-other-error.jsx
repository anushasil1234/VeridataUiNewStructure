import { Typography } from "@mui/material";
import showErrorMessage from "shared/utils/associate/show-error-message";

const handleOtherErrors = (error) => {
    let message;
    if (error.response) {
        const { status, statusText } = error.response;
        const { data } = error.response;

        if (status === 500) {
            message = data.ErrorResponse?.UserMessage || "Internal Server Error";
        } else {
            message = data.title || data.errorResponse?.userMessage || statusText;
            if (data.errorResponse?.internalMessages?.length) {
                message = data.errorResponse.internalMessages.map((element, index) => (
                    <Typography key={index}>{element}</Typography>
                ));
            }
        }
    }
    message && showErrorMessage(message);
};
export default handleOtherErrors;
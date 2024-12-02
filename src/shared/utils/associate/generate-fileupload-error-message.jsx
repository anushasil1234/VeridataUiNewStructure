import { Typography } from "@mui/material";

export const generateUPloadErrorMessage = ({duplicateCount, invalidUserCount, nonExsitingCount}) => {
    let message = "";
    const lineStart = `Excell file has`
    const lineEnd = `Please check the mail to know more.`
    const newLine = `Please download the duplicate or invalid file from below.`
    // if (!rawFileDataCount) {
    //     message = `${message} no unique data to process,`
    // }
    if (duplicateCount) {
        message = ` ${message} ${duplicateCount} duplicate data,`
    }
    if (invalidUserCount) {
        message = `${message} ${invalidUserCount} invalid data,`
    }
    if (nonExsitingCount) {
        message = `${message} ${nonExsitingCount} non exsiting data,`
    }
    message =
        <>
            <Typography>
                {lineStart}
                {message}
                {lineEnd}
            </Typography>
            <Typography>{newLine}</Typography>
        </>
    // message = `${lineStart} ${message} ${messageEnd}`
    return message
}
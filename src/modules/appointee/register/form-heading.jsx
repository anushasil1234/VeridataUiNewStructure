import { Stack, Typography } from "@mui/material";
import { stepContainerStyle, stepHeadingStyle, stepNumberContainerStyle } from "app";
import PropTypes from "prop-types";
import { Children } from "react";


const FormHeading = ({ step, heading,Children }) => {

    return (
        <Stack sx={stepContainerStyle}  >
            {step &&
                <Stack sx={stepNumberContainerStyle}>
                    <Typography fontWeight={500}>{step}</Typography>
                </Stack>}
            <Typography sx={stepHeadingStyle}>{heading}</Typography>
            {Children}
        </Stack>
    )
}

FormHeading.propTypes = {
    step: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired
}
export default FormHeading
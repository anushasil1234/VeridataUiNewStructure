import { Stack, Tooltip, Typography } from "@mui/material";
import { stepContainerStyleHeading, stepHeadingStyle, stepNumberContainerStyle } from "app";
import PropTypes from "prop-types";
import { Children } from "react";


const FormHeading = ({ step, heading, info, Children }) => {

    return (
        <Stack sx={stepContainerStyleHeading}  >
            {step &&
                <Stack sx={stepNumberContainerStyle}>
                    <Typography fontWeight={500}>{step}</Typography>
                </Stack>}
            <Tooltip title={info} placement="right">
                <Typography sx={stepHeadingStyle}>{heading}</Typography>
            </Tooltip>
            {Children}
        </Stack>
    )
}

FormHeading.propTypes = {
    step: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired
}
export default FormHeading
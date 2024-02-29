import { Stack, Typography } from "@mui/material";
import { stepContainerStyle, stepHeadingStyle, stepNumberContainerStyle } from "app";
import PropTypes from "prop-types";


const FormHeading = ({ step, heading }) => {

    return (
        <Stack sx={stepContainerStyle}  >
            {step &&
                <Stack sx={stepNumberContainerStyle}>
                    <Typography fontWeight={500}>{step}</Typography>
                </Stack>}
            <Typography sx={stepHeadingStyle}>{heading}</Typography>
        </Stack>
    )
}

FormHeading.propTypes = {
    step: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired
}
export default FormHeading
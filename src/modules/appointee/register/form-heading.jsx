import { Stack, Tooltip, Typography } from '@mui/material';
import { stepContainerStyleHeading, stepHeadingStyle, stepNumberContainerStyle } from 'app';
import PropTypes from 'prop-types';

const FormHeading = ({ step, heading, info, children }) => {
  return (
    <Stack sx={stepContainerStyleHeading}>
      {step && (
        <Stack sx={stepNumberContainerStyle}>
          <Typography fontWeight={500}>{step}</Typography>
        </Stack>
      )}
      <Tooltip title={<Typography fontSize="16px">{info}</Typography>} placement="right">
        <Typography sx={stepHeadingStyle}>{heading}</Typography>
      </Tooltip>
      {children}
    </Stack>
  );
};

FormHeading.propTypes = {
  step: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  info: PropTypes.string,
  children: PropTypes.node
};

export default FormHeading;

import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { listHeadingStyle, smallstepNumberContainerStyle } from 'app';
import { useState, useEffect } from 'react';
import GridContainer from 'shared/components/grid-container/grid-container';
const VerificationQuiestions = ({
  verificationOnChange,
  verificationQuestionSet,
  categorySelected,
  enabledQuestions
}) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
    <Stack spacing={2}>
      <Box>
        <Typography
          sx={{
            ...listHeadingStyle,
            fontSize: '1rem',
            textAlign: 'left',
            ml: 2,
          }}
        >
          Verification Questions
        </Typography>
        <Divider sx={{ mt: '2px' }} />
      </Box>

      {verificationQuestionSet.map((question, index) => {
        const { questionText, answers = [], questionId } = question;
        const isEnabled = enabledQuestions.includes(questionId);

        return (
          <GridContainer key={index}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} sm={1}>
                <Stack sx={{ ...smallstepNumberContainerStyle }}>
                  <Typography fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                    {index + 1}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={11}>
                <Typography fontWeight={600} sx={{ fontSize: '0.9rem', mb: 1 }}>
                  {questionText}
                </Typography>

                <RadioGroup
                  row
                  onChange={(e) => verificationOnChange(questionId, e.target.value)}
                >
                  {answers?.map(({ answerText, answerId }) => (
                    <FormControlLabel
                      key={answerId}
                      value={answerText}
                      control={
                        <Radio size="small" disabled={!categorySelected || !isEnabled} />
                      }
                      label={answerText}
                    />
                  ))}
                </RadioGroup>
              </Grid>
            </Grid>
          </GridContainer>
        );
      })}
    </Stack>
  </Box>
  );
};
export default VerificationQuiestions;

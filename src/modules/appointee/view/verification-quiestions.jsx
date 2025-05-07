import {
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

  console.log('verificationQuestionSet', verificationQuestionSet);
  return (
    <Stack>
      <Stack>
        <Typography
          sx={{ ...listHeadingStyle, fontSize: '1rem', textAlign: 'left', marginLeft: '15px' }}
        >
          {`Verification Questions`}
        </Typography>
        <Divider sx={{ marginTop: '2px' }} />
      </Stack>

      {verificationQuestionSet.map((question, index) => {
        const { questionText, questionType, answers = [], questionId, fieldCode } = question;
        const isEnabled = enabledQuestions.includes(questionId);

        return (
          <GridContainer key={index}>
            <Grid container item xs={10}>
              <Grid container item xs={2}>
                <Stack sx={{ ...smallstepNumberContainerStyle, marginRight: '1px' }}>
                  <Typography fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                    {index + 1}
                  </Typography>
                </Stack>
              </Grid>

              <Grid container item xs={10}>
                <Typography fontWeight={600} sx={{ fontSize: '0.9rem', mb: 1 }}>
                  {questionText}
                </Typography>

                <RadioGroup row onChange={(e) => verificationOnChange(questionId, e.target.value)}>
                  {answers.map(({ answerText, answerId }) => (
                    <FormControlLabel
                      key={answerId}
                      value={answerText}
                      control={<Radio size='small' disabled={!categorySelected || !isEnabled} />}
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
  );
};
export default VerificationQuiestions;

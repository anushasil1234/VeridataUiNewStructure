import { Divider, Grid, Stack, Typography } from "@mui/material"
import { listHeadingStyle, smallstepNumberContainerStyle } from "app"
import GridContainer from "shared/components/grid-container/grid-container"
import RadioInput from "shared/components/input-fields/radio-input"

const VerificationQuiestions = ({ verificationOnChange, verificationQuestionSet, verificationUpdate }) => {

    return (
        <Stack>
            <Stack>
                <Typography sx={{ ...listHeadingStyle, fontSize: '0.8rem', textAlign: "left" }}>
                    {`Verification questions`}
                </Typography>
                <Divider sx={{ marginTop: "2px" }} />
            </Stack>
            {
                verificationQuestionSet?.map(({ name, label, disabled = false }, index) => {
                    
                    return (
                        <GridContainer key={index}>
                            <Grid container item xs={9}>
                                <Grid container item xs={2}>
                                    <Stack sx={{ ...smallstepNumberContainerStyle, marginRight: '2px' }}>
                                        <Typography fontWeight={500} sx={{ fontSize: '0.8rem' }}>{index + 1}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid container item xs={10}>
                                    <RadioInput
                                        label={label}
                                        name={name}
                                        value={verificationUpdate[name] !== undefined ? verificationUpdate[name] : null}
                                        onChange={(element) => verificationOnChange(element, index)}
                                        disabled={disabled}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </GridContainer>
                    )
                })
            }
        </Stack>
    )
}

export default VerificationQuiestions
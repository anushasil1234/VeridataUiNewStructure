// import { Info } from '@mui/icons-material';
// import { Box, Grid, Stack, Typography } from '@mui/material';
// import { fieldValueSx, iconStyle, listStyle } from 'app';
// import React, { } from 'react'
// import TextSkelton1 from 'shared/utils/skeltons/text-skelton/text-skelton1';
// import DarkTooltip from 'shared/utils/tooltip/dark-tooltip';



// export const FieldName = ({ fieldName, fieldValue, fieldTooltip }) => {

//     return (
//         <Stack flexDirection={'row'}>
//             <Typography container="span" fontWeight={"bold"}>
//                 {fieldValue ? `${fieldName}:` : <TextSkelton1 />}
//             </Typography>
//             {fieldTooltip &&
//                 <DarkTooltip placement="top" title={fieldTooltip} arrow>
//                     <Info width={10} sx={iconStyle} />
//                 </DarkTooltip>
//             }
//         </Stack>
//     );
// };
// export const FieldValue = ({ fieldValue }) => {

//     return (
//         typeof fieldValue === "string" ?
//             <Typography sx={fieldValueSx} marginLeft={2} >
//                 {" "}
//                 {fieldValue ? fieldValue : <TextSkelton1 />}
//             </Typography>
//             :
//             <Stack sx={fieldValueSx} alignContent={"center"} >
//                 {fieldValue ? fieldValue : <TextSkelton1 />}
//             </Stack>
//     )
// };

// export const PersonalInformation = (props) => {
//     const { fieldName, fieldValue, fieldTooltip } = props;
//     return (
//         <>
//             <Grid item xs={6} md={5} sx={listStyle}>
//                 <Box>
//                     <FieldName fieldValue={fieldValue} fieldName={fieldName} fieldTooltip={fieldTooltip} />
//                 </Box>
//             </Grid>
//             <Grid item xs={6} md={7} sx={listStyle}>
//                 <Box>
//                     <FieldValue fieldValue={fieldValue} />
//                 </Box>
//             </Grid>
//         </>
//     );
// };

import { Info, TaskAlt } from '@mui/icons-material';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { fieldNameStyle, fieldValueSx, iconStyle, listStyle, successGreenXsOutlineStyle, xsChipIconCommonStyle } from 'app';
import React from 'react';
import TextSkelton1 from 'shared/utils/skeltons/text-skelton/text-skelton1';
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const FieldName = ({ fieldName, fieldValue, fieldTooltip }) => {
    return (
        <Stack flexDirection="row" alignItems="center">
            <Typography fontWeight="bold" sx={{ ...fieldNameStyle, fontWeight: 600 }}>
                {fieldValue ? `${fieldName}:` : <TextSkelton1 />}
            </Typography>
            {fieldTooltip && (
                <DarkTooltip placement="top" title={fieldTooltip} arrow>
                    <Info sx={iconStyle} />
                </DarkTooltip>
            )}
        </Stack>
    );
};

export const FieldValue = ({ fieldValue }) => {
    return (
        typeof fieldValue === 'string' ? (
            <Typography sx={fieldValueSx} marginLeft={2}>
                {fieldValue || <TextSkelton1 />}
            </Typography>
        ) : (
            <Stack sx={fieldValueSx} alignContent="center">
                {fieldValue || <TextSkelton1 />}
            </Stack>
        )
    );
};

export const PersonalInformation = ({ fieldName, fieldValue, fieldTooltip, badge = null, badgeTitle = null }) => {
    return (
        <>
            <Grid item xs={12} sm={6} md={5} lg={4} sx={listStyle}>
                <Box>
                    <FieldName fieldValue={fieldValue} fieldName={fieldName} fieldTooltip={fieldTooltip} />
                </Box>
            </Grid>
            <Grid container item xs={12} sm={6} md={7} lg={7.7} sx={listStyle}>

                {
                    badge === true ?
                        <>
                            <Grid item xs={6} md={5}>
                                <FieldValue fieldValue={fieldValue} />
                            </Grid>
                            <Grid item xs={6} md={5}>
                                <Chip
                                    icon={<TaskAlt sx={xsChipIconCommonStyle} color="#2e7d32" />}
                                    sx={successGreenXsOutlineStyle}
                                    size="small"
                                    label={badgeTitle}
                                />
                            </Grid>
                        </> :
                        <FieldValue fieldValue={fieldValue} />
                }

            </Grid>
        </>
    );
};

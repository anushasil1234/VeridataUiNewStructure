// import React from 'react';
// import { useTheme } from '@mui/material/styles';
// import { Stack, Typography, Paper } from '@mui/material';

// const TotalOffer = ({ wizName, wizValue }) => {
//     // chart color
//     const theme = useTheme();
//     const secondary = theme.palette.secondary.main;
//     const secondaryDark = theme.palette.secondary.dark;

//     // chart
//     return (
//         <Paper elevation={1}
//             sx={{ width: "fit-content", padding: "5px", height: "46px" }}
//         >
//             <Stack flexDirection={"row"}>
//                 <Typography color={secondary} sx={{ fontSize: "1.3rem", whiteSpace: "nowrap" }}  >
//                     {wizName}{"   "}
//                 </Typography>
//                 <Typography color={secondaryDark} sx={{ textAlign: 'right', marginLeft: "10px", fontSize: "1.3rem" }}>

//                     {wizValue}
//                 </Typography>
//             </Stack>
//         </Paper >
//     );
// };

// export { TotalOffer };


import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Paper } from '@mui/material';

const TotalOffer = ({ wizName, wizValue }) => {
    // chart color
     const theme = useTheme();
     const secondary = theme.palette.secondary.main;
     const secondaryDark = theme.palette.secondary.dark;

    // chart
    return (
        <Paper elevation={1}
             sx={{ width: "fit-content", padding: "5px", height: "46px",boxShadow: '0px 0.7px 5px' }} // add boxShadow
         >
             <Stack direction="row" alignItems="center" spacing={1} >
                 <Typography variant="h7" color={secondary}> {/*variant change h6 to h7*/}
                    {wizName}
             </Typography>
             <Typography variant="h6" fontWeight="530" color={secondaryDark} sx={{paddingRight:'7px'}}> {/*add padding*/}
                    {wizValue}
                </Typography>
         </Stack>
        </Paper>
    );
};

export { TotalOffer };
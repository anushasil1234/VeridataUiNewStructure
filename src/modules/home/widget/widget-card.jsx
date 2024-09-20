// import React from 'react';
// import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
// import { CardLayout } from 'shared/utils';


// const WidgetCard = ({
//     title,
//     subtitle,
//     children,
//     action,
//     footer,
//     cardheading,
//     headtitle,
//     headsubtitle,
//     middlecontent,
//     fitToContaner
// }) => {

//     return (
//         <Card
//             sx={{ padding: 0, height: fitToContaner ? "100%" : "fit-content", position: "relative", minHeight: "245px" }}
//             elevation={5}
//             variant={undefined}
//         >

//             {cardheading ? (
//                 <CardLayout>
//                     <Typography variant="h5">{headtitle}</Typography>
//                     <Typography variant="subtitle2" color="textSecondary">
//                         {headsubtitle}
//                     </Typography>
//                 </CardLayout>
//             ) : 
//             (
//                 <CardContent sx={{ p: "20px" }}>
//                     {title ? (
//                         <Stack
//                             direction="row"
//                             spacing={1}
//                             justifyContent="space-between"
//                             alignItems={'center'}
//                             mb={3}
//                             sx={{ position: "relative" }}
//                         >
//                             <Box>
//                                 {title? <Typography variant="h5" sx={{ fontSize: "1.3rem" }}>{title}</Typography>: ""}

//                                 {subtitle ? (
//                                     <Typography variant="subtitle2" sx={{ fontSize: "1.05rem" }} color="textSecondary">
//                                         {subtitle}
//                                     </Typography>
//                                 ) : (
//                                     ''
//                                 )}
//                             </Box>
//                             {action}
//                         </Stack>
//                     ) : null}

//                     {children}
//                 </CardContent>
//             )}

//             {middlecontent}
//             <Box sx={{ position: "absolute", bottom: 0 }}>

//                 {footer}
//             </Box>
//         </Card>
//     );
// };

// export { WidgetCard };

import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Tooltip, useMediaQuery } from '@mui/material';
import { CardLayout } from 'shared/utils';
import { useStyles } from 'app'; // Adjust the path as needed
// import { makeStyles } from '@mui/styles';
const WidgetCard = ({
    title,
    subtitle,
    children,
    action,
    footer,
    cardheading,
    headtitle,
    headsubtitle,
    middlecontent,
    fitToContaner
}) => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const classes = useStyles({ isSmallScreen });




    return (
        <Card
            sx={{
                padding: 0,
                height: fitToContaner ? '100%' : 'fit-content',
                position: 'relative',
                minHeight: isSmallScreen ? 'auto' : '245px',
                display: 'flex',
                flexDirection: 'column'
            }}
            elevation={5}
            variant={undefined}
        >
            {cardheading ? (
                <CardLayout>
                    <Typography variant={isSmallScreen ? 'h6' : 'h5'}>
                        {headtitle}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {headsubtitle}
                    </Typography>
                </CardLayout>
            ) : (
                <CardContent sx={{ p: isSmallScreen ? '10px' : '20px', position: 'relative' }}>
                    {title ? (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={8}>
                                <Box sx={{ minWidth: 0 }}>
                                    <Tooltip title={title} arrow>
                                        <Typography
                                            //variant={isSmallScreen ? 'h6' : 'h6'}
                                            variant="subtitle2" fontWeight="530"
                                            //className={classes.cardTitle}
                                        >
                                            {title}
                                        </Typography>
                                    </Tooltip>
                                    {subtitle ? (
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontSize: isSmallScreen ? '0.9rem' : '1.05rem' }}
                                            color="textSecondary"
                                        >
                                            {subtitle}
                                        </Typography>
                                    ) : null}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} 
                                sx={{ position: 'absolute', top: '10px', right: '10px', p: 0, m: 0 }}
                            >
                                <Box >
                                    {action}
                                </Box>
                            </Grid>
                        </Grid>
                    ) : null}

                    <Box sx={{ mt: 2 }}>
                        {children}
                    </Box>
                </CardContent>
            )}

            {middlecontent}

            <Box sx={{ position: 'absolute', bottom: 0, width: '100%', padding: isSmallScreen ? '10px' : '20px' }}>
                {footer}
            </Box>
        </Card>
    );
};

export { WidgetCard };
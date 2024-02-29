import React from 'react';
import { CardContent, Typography, Stack, Box } from '@mui/material';

const InputCard = ({
    title,
    subtitle,
    children,
    action,
    footer,
    cardheading,
    headtitle,
    headsubtitle,
    middlecontent
}) => {

    return (
        <Stack >
            {cardheading ? (
                <CardContent>
                    <Typography variant="h5">{headtitle}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {headsubtitle}
                    </Typography>
                </CardContent>
            ) : (
                <CardContent sx={{ p: "8px" }}>
                    {title ? (
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="space-between"
                            alignItems={'center'}
                            mb={3}
                            sx={{ position: "relative" }}
                        >
                            <Box>
                                {title ? <Typography variant="h5" sx={{ fontSize: "1.3rem" }}>{title}</Typography> : ''}

                                {subtitle ? (
                                    <Typography variant="subtitle2" sx={{ fontSize: "1.05rem" }} color="textSecondary">
                                        {subtitle}
                                    </Typography>
                                ) : (
                                    ''
                                )}
                            </Box>
                            {action}
                        </Stack>
                    ) : null}

                    {children}
                </CardContent>
            )}

            {middlecontent}
            <Box sx={{ position: "absolute", bottom: 0 }}>

                {footer}
            </Box>
        </Stack>
    );
};

export default InputCard;

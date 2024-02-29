import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { CardLayout } from 'shared/utils';


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

    return (
        <Card
            sx={{ padding: 0, height: fitToContaner ? "100%" : "fit-content", position: "relative", minHeight: "245px" }}
            elevation={5}
            variant={undefined}
        >

            {cardheading ? (
                <CardLayout>
                    <Typography variant="h5">{headtitle}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {headsubtitle}
                    </Typography>
                </CardLayout>
            ) : 
            (
                <CardContent sx={{ p: "20px" }}>
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
                                {title? <Typography variant="h5" sx={{ fontSize: "1.3rem" }}>{title}</Typography>: ""}
                                
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
        </Card>
    );
};

export { WidgetCard };

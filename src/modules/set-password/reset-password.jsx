import React from 'react'
import { toLogin } from 'shared/constants/constants';
import ChangePassword from './change-password';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@mui/material';

const ReSetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const { userId } = location.state || {};
    const { clientId, userId } = location.state || {};
    // console.log("userId", userId);

    return (
        <>
            <ChangePassword
                userId={userId}
                clientId={clientId}
                // dbUserType={dbUserType}
                PasswordChangeSuccessAction={() => navigate(`${toLogin}`)}
            />
            <Box mt={2}>
                <Typography variant="body2" align="center">
                    <Link href={toLogin} underline="hover">
                        Back to login
                    </Link>
                </Typography>
            </Box>
        </>
    )
}

export default ReSetPassword
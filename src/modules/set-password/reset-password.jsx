import React from 'react'
import { toUserLogin } from 'shared/constants/constants';
import ChangePassword from './change-password';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@mui/material';

const ReSetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const { userId } = location.state || {};
    const { clientId, userId, userCode } = location.state || {};

    return (
        <>
            <ChangePassword
                userId={userId}
                clientId={clientId}
                userCode={userCode}
                PasswordChangeSuccessAction={() => navigate(`${toUserLogin}`)}
            />
            <Box mt={2}>
                <Typography variant="body2" align="center">
                    <Link href={toUserLogin} underline="hover">
                        Back to Login
                    </Link>
                </Typography>
            </Box>
        </>
    )
}

export default ReSetPassword
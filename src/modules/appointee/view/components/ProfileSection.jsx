import React from 'react';
import { Box, Stack } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import ProfileImg from 'assets/images/profile/user-2.jpg';
import TextSkelton1 from 'shared/utils/skeltons/text-skelton/text-skelton1';
import VerificationStatus from './VerificationStatus';
import { cardStyle, memberNameStyle } from 'app';

const ProfileSection = React.memo(({ 
  isLoading, 
  otherFilePayload, 
  profileImageBase64, 
  fileDataStore, 
  verifyIconStyle, 
  isSaveStep, 
  appointeeName,
  onProfileClick,
  isAadharVerified,
  isPanVarified,
  isUanVerified,
  isManualPassbook,
  uanNumber
}) => {
  return (
    <Box sx={cardStyle} onClick={onProfileClick}>
      <Stack alignItems={'center'}>
        <Box>
          {isLoading && otherFilePayload ? (
            otherFilePayload.uploadTypeAlias === 'PRF' ? (
              <Avatar
                src={profileImageBase64 || ProfileImg}
                alt={profileImageBase64 || ProfileImg}
                sx={verifyIconStyle}
                width={38}
                height={40}
              />
            ) : otherFilePayload.uploadTypeAlias === 'ADHPRF' &&
              otherFilePayload.uploadTypeAlias !== 'PRF' ? (
              <Avatar src={fileDataStore} sx={verifyIconStyle} />
            ) : (
              <Avatar
                src={ProfileImg}
                alt={ProfileImg}
                sx={verifyIconStyle}
                width={38}
                height={40}
              />
            )
          ) : (
            <Avatar
              src={ProfileImg}
              alt={ProfileImg}
              sx={verifyIconStyle}
              width={38}
              height={40}
            />
          )}
        </Box>
        <Box>
          {isSaveStep === 1 ? (
            <VerificationStatus
              isAadharVerified={isAadharVerified}
              isPanVarified={isPanVarified}
              isUanVerified={isUanVerified}
              isManualPassbook={isManualPassbook}
              uanNumber={uanNumber}
            />
          ) : null}
        </Box>
      </Stack>
      <Typography sx={memberNameStyle}>
        {appointeeName ? appointeeName : <TextSkelton1 />}
      </Typography>
    </Box>
  );
});

export default ProfileSection; 
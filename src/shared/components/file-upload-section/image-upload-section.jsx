import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, Stack } from '@mui/material';
const ImageUploadSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <Box
      sx={{
        width: 550,
        padding: 3,
        border: '2px dashed #ccc',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      {}
      <Stack spacing={2} alignItems='center'>
        <Avatar
          src={selectedImage || 'https://via.placeholder.com/100'}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant='body1'>Upload your profile picture</Typography>
        {}
        <Button variant='contained' component='label'>
          Upload Image
          <input type='file' accept='image/*' hidden onChange={handleImageUpload} />
        </Button>
      </Stack>
    </Box>
  );
};
export default ImageUploadSection;

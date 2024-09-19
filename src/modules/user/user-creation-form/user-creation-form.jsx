import { FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { inputFieldStyle, lable1Style } from 'app';
import React from 'react'
import { useSelector } from 'react-redux';
import { useCodeEmptyMsg } from 'shared/constants/constants';
import { hasValue } from 'shared/utils';

const UserCreationForm = (formData) => {

    const {
        userName,
        userEmail,
        // password,
        // userCode,
        contactNumber,
        role,
        setUserName,
        setUserEmail,
        setPassword,
        setUserCode,
        setContactNumber,
        setRole,
        action,
        handlePassWordValidation
    } = formData;

    const dropdownList = useSelector(state => state.dropdownList);
    const apiSlice = useSelector(state => state.apiSlice);
    const popUpSlice = useSelector(state => state.popUpSlice);

    const { validateUserCode } = apiSlice[0];
    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;

    const {
        roleList
    } = dropdownList && dropdownList.length > 0 && dropdownList[0];

    const handleUserCodeBlur = async ({ target }) => {
        const userCode = target.value;
        if (hasValue(userCode)) {
            const response = await validateUserCode(userCode);
        } else {
            showErrorMessage(useCodeEmptyMsg);
        }
    }

    return (
        <Grid container rowSpacing={2} columnSpacing={2.5} item xs={12} md={12}  >
            <Grid item xs={12} md={6} >
                <Typography sx={lable1Style}>User Name
                    <span className="requiredField">*</span>
                </Typography>
                <TextField
                    onChange={(e) => { setUserName(e.target.value) }}
                    error={false}
                    style={inputFieldStyle}
                    type="text"
                    className='customeTextField'
                    variant="outlined"
                    defaultValue={" "}
                    value={userName}
                    inputStyle={{ padding: 0 }}
                    InputProps={{

                        style: {
                            padding: 0,
                            color: "#000"
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography sx={lable1Style}>Email
                    <span className="requiredField">*</span>
                </Typography>
                <TextField
                    onChange={(e) => { setUserEmail(e.target.value) }}
                    error={false}
                    style={inputFieldStyle}
                    type="text"
                    className='customeTextField'
                    variant="outlined"
                    defaultValue={" "}
                    value={userEmail}
                    inputStyle={{ padding: 0 }}
                    InputProps={{
                        style: {
                            padding: 0,
                            color: "#000"
                        }
                    }}
                />
            </Grid>
            {/* <Grid item xs={12} md={6} >
                <Typography sx={lable1Style}>Password
                    <span className="requiredField">*</span>
                </Typography>
                <TextField
                    onChange={(e) => { setPassword(e.target.value) }}
                    error={false}
                    style={inputFieldStyle}
                    type="text"
                    className='customeTextField'
                    variant="outlined"
                    defaultValue={" "}
                    value={password}
                    onBlur={({ target }) => handlePassWordValidation && handlePassWordValidation(target.value)}
                    inputStyle={{ padding: 0 }}
                    InputProps={{
                        style: {
                            padding: 0,
                            color: "#000"
                        },
                        disabled: action === 'U' ? true : false,

                    }}
                    inputProps={{ maxLength: 15, minLength: 8 }}
                />
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography sx={lable1Style}>User Code
                    <span className="requiredField">*</span>
                </Typography>
                <TextField
                    onChange={(e) => { setUserCode(e.target.value) }}
                    onBlur={handleUserCodeBlur}
                    style={inputFieldStyle}
                    type="text"
                    className='customeTextField'
                    variant="outlined"
                    defaultValue={" "}
                    value={userCode}
                    inputStyle={{ padding: 0 }}
                    InputProps={{
                        style: {
                            padding: 0,
                            color: "#000"
                        },
                        disabled: action === 'U' ? true : false,
                    }}
                    inputProps={{ maxLength: 12 }}

                />
            </Grid> */}
            <Grid item xs={12} md={6} >
                <Typography sx={lable1Style}>Contact No
                    <span className="requiredField">*</span>
                </Typography>
                <TextField
                    onChange={(e) => { setContactNumber(e.target.value) }}
                    error={false}
                    style={inputFieldStyle}
                    type="text"
                    className='customeTextField'
                    variant="outlined"
                    defaultValue={" "}
                    value={contactNumber}
                    inputStyle={{ padding: 0 }}
                    InputProps={{

                        style: {
                            padding: 0,
                            color: "#000"
                        }
                    }}
                    inputProps={{ maxLength: 10, minLength: 10 }}
                />
            </Grid>
            <Grid item xs={12} md={6} >
                <FormControl fullWidth>
                    <Typography sx={lable1Style}>Role
                        <span className="requiredField">*</span>
                    </Typography>
                    <Select
                        error={false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className='customeTextField'
                        sx={inputFieldStyle}
                        onChange={(e) => { setRole(e.target.value) }}
                        value={role}
                    >
                        {
                            roleList && roleList.map(({ id, code, value }) => {
                                return <MenuItem key={id} value={id}>{`${value}`}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default UserCreationForm
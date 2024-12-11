import { alpha, createTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Fab from "@mui/material/Fab"; // Import Fab component from MUI



let AppStyle = createTheme({
  palette: {
    success: {
      main: "#3BC6AC",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff"
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff"
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff"
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff"
    },
    primary: {
      light: "#E11299",
      main: "#9A208C",
      dark: "#9A208C"
    },
    secondary: {
      main: "#C780FA",
      light: "#E3ACF9",
      dark: "#8719d7"
    },
    other: {
      main: "#D3D5D6"
    },
    button: {
      main: "#719BC1"
    },
    lightPink: {
      main: "rgba(223, 195, 196, 1)"
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
      white: "#FFFF"
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.01,
      hover: "#ffe6ff"
    },
    green1: {
      main: "#548273",
      light: "#6ea191"
    },
    yellow1: {
      light: "#d9c535e3",
      main: "#c4b22ce3"
    },
    red: {
      light: "#ea9999",
      main: "#e06666"
    },
    grey: {
      light: ' #808080'
    },
    tableHeader: {
      main: "#7BBFBA"
    }
  },

  typography: {
    fontFamily: [
      "Montserrat",
      "Anuphan",
    ].join(","),

    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    },
    secondaryFont: "IBM Plex Mono",
    h2: {
      fontWeight: 700
    },
    button: {
      // Here is where you can customise the button

      fontWeight: 500,
      fontSize: '0.875rem',
    },
    th: {
      fontWeight: 700
    },
    TableCell: {
      th: {
        fontWeight: 700
      }
    }
  },
  MuiTable: {
    styleOverrides: {
      root: {
        padding: "8px",
        backgroundColor: "#CDCAC6"
      },
    },
  },
  overrides: {
    MUIDataTable: {
      responsiveStacked: {
        maxHeight: "none",
        overflowX: "auto"
      }
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true
      }
    }
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      399: 399,
    },
  },
});

const buttonfontSize = {
  [AppStyle.breakpoints.between('xs', '399')]:
  {
    fontSize: { xs: '0.697rem!important', 399: '0.875rem!important' }
  }
}
export const listitemTextstyle = {
  fontSize: '.5rem',
  display: 'block',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginLeft: '-15px',
  justifyContent: 'center'
}

const ThemeColorPalete = AppStyle.palette;

AppStyle = {
  ...AppStyle,
  components: {
    MuiPaper: {
      styleOverrides: {
        backgroundColor: "#ffffff",
        paper: {
          backgroundColor: "#ffffff"
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage:
            "linear-gradient(157deg,#414ae3bf 0%,#bf14a2d9 56.25%,#f77560 100%)"
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none"
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: AppStyle.spacing(1)
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: ThemeColorPalete.primary.light
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [AppStyle.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: AppStyle.spacing(1)
        },
        AppStyle
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: AppStyle.typography.fontWeightMedium
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: AppStyle.spacing(2),
          "& svg": {
            fontSize: 30
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: AppStyle.typography.fontFamily[2]
        }
      }
    }
  }
};

export { AppStyle };

export const downLoadLinkColor = "#0044cc";
export const downLoadIconStyle = {
  color: downLoadLinkColor,
  ml: 1
}



export const downLoadNameStyle = {
  fontWeight: "bold",
  color: "#0044cc"
}
export const fontSizeType1 = { fontSize: { xs: ".75rem!important", md: "1rem!important" } };
export const downLoadLinkContainer = {
  cursor: "pointer",
  mr: 4
}
export const sampleDownLoadLinkContainerStyle = {
  "& p": {
    color: downLoadLinkColor,
    cursor: 'pointer'
  }
}
export const positionRelative = {
  position: "relative",
};
// heading starts
export const pageHeadingContainer = {
  py: "20px",
};
export const loginFieldIconStyle = {
  color: ThemeColorPalete.primary.main,
}
export const noBtnIconStyle = {
  ...loginFieldIconStyle,
  mr: "8px"
}
export const loginImageStyle = {
  height: "100%",
  width: "100%"
}
export const heading1 = {
  textTransform: "capitalize",
  fontSize: "1.27rem",
  color: "#000",
  fontWeight: 600
};

export const userNameTextStyle = {
  whiteSpace: 'normal',
  wordBreak: 'break-all'
}
export const heading2 = {
  color: ThemeColorPalete.primary.main,
  textAlign: "center",
  fontWeight: 600,
  fontSize: "1.1rem"
};
export const heading3 = {
  color: ThemeColorPalete.primary.main,
  textAlign: "left",
  fontWeight: 600,
  fontSize: "1.1rem",
  my: 1
};
export const heading4 = {
  color: ThemeColorPalete.common.black,
  fontSize: "40px",
  fontStyle: "bold",
  fontWeight: 600
}
export const heading5 = {
  color: ThemeColorPalete.common.black,
  fontSize: "20px",
  fontStyle: "bold",
  fontWeight: 600
}
export const heading6 = {
  fontSize: "1.27rem",
  color: "#000",
  fontWeight: 600
};
// heading ends

export const useFileChipStyles = () => {
  return (fileOption, viewedFiles) => ({
    cursor: 'pointer',
    backgroundColor: viewedFiles.some(file => file.fileName === fileOption.fileName)
      ? ThemeColorPalete.primary.dark
      : ThemeColorPalete.grey.light,
    color: 'white',
    border: '1px solid',
    borderColor: viewedFiles.some(file => file.fileName === fileOption.fileName)
      ? ThemeColorPalete.primary.dark
      : ThemeColorPalete.grey.light,
  });
};


// app lable style start
export const dropDownLableStyle = {
  fontWeight: 400,
  fontSize: "1.2rem",
  marginBottom: "2px",
  lineHeight: "1.4375em",
  marginLeft: "5px"
};

// app lable style END
export const datepickerpx = {
  width: "160px"
}
// input start
export const inputFieldStyle = {
  width: "100%",
  margin: "10px",
  padding: 0,
};

export const inputFieldStyle2 = {
  width: "90%",
  margin: "10px 0px",
  padding: 0,
  marginRight: "auto",
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: ThemeColorPalete.primary.main,
  },
};
export const inputFieldStylesx = {
  width: "100%",
  margin: "10px 0px",
  padding: 0,
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: ThemeColorPalete.primary.main,
  },
};
export const datePickerinputFieldStyle2 = {
  '& .MuiFormControl-root': {
    ...inputFieldStyle2
  }
};
export const inputFieldStyleAdded = {
  width: "100%",
  margin: 0,
  padding: 0
};
export const textField1Sx = {
  "& .css-1ddqow9-MuiInputBase-root-MuiFilledInput-root::before": {
    display: "none",
    borderRadius: "5px",
  },
  "& input": {
    height: "2px"
  },
  width: "50%"
}
export const profilePasswordContainerSx = {
  flexDirection: "row",
  gap: 1
}
// input end

// card starts
export const cardAppbar = {
  bgcolor: ThemeColorPalete.common.white,
  color: ThemeColorPalete.common.black,
  p: { xs: 2, sm: 2.8 }

};
// card ends
export const zoombuttonStyle = {
  color: '#fff',
  mr: "1rem",
  backgroundColor: ThemeColorPalete.primary.main,
  "&:hover": {
    color: '#fff',
    transform: 'scale(1.05)',
    backgroundColor: ThemeColorPalete.primary.light,
  },
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)',
  transition: 'transform 0.2s, background-color 0.2s',

}
// Alert
const alertStyle = {
  width: "100%",
  fontSize: { xs: 14, sm: 16, md: 18 },
  alignItems: "center",
  color: ThemeColorPalete.common.black
};
export const alertErrorStyle = {
  ...alertStyle,
  backgroundColor: ThemeColorPalete.error.main
};
export const alertSuccessStyle = {
  ...alertStyle,
  backgroundColor: ThemeColorPalete.success.main
};
// disable class
export const disableStyle = {
  pointerEvents: "none",
  opacity: 0.4
};
export const text3 = {
  fontFamily: AppStyle.typography.secondaryFont,
  fontWeight: 700,
  fontSize: "1.5rem",
  lineHeight: "107.5%",
  color: "#FFFFFF"
};
export const text2 = {
  fontSize: "0.75rem",
  lineHeight: 1.5,
  fontWeight: 500
};
export const text1 = {
  fontFamily: AppStyle.typography.fontFamily,
  fontWeight: 400,
  fontSize: "0.70rem"
};
export const text4 = {
  fontWeight: 400,
  fontSize: "0.8rem",
  color: ThemeColorPalete.primary.main
};
export const text5 = {
  fontWeight: 400,
  fontSize: "0.9rem",
  color: ThemeColorPalete.error.main,
  fontStyle: "italic",
  textDecoration: "underline"
};
export const clickableCell = {
  whiteSpace: "nowrap",
  fontSize: "0.8rem",
  width: "190px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  cursor: "pointer",
  color: "#e82e27",
  // marginLeft: "12px",
  textDecoration: "underline",
  marginLeft: '-2px'
}
export const tableHeader = {
  fontFamily: AppStyle.typography.fontFamily,
  fontWeight: 550,
  fontSize: "0.875rem",
  lineHeight: "1.5rem"
};

export const styles = {
  paperStyle: {
    width: '100%',
    height: { xs: '100vh', md: 'auto' },
    maxWidth: { xs: '100vw', sm: '95vw', md: '90vw', lg: '85vw', xl: '75vw' },
    padding: { xs: '10px', md: '20px', lg: '30px' },
    boxSizing: 'border-box',
    margin: '0 auto'
  },

  btnstyle: {
    margin: "8px 0",
    "&:hover": {
      bgColor: "#1638b4"
    }
  },
  stackimageContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    backgroundColor: "#8029bb29",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: { xs: '100%', md: 'auto' }
  },

  loginsection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: { xs: '10px', sm: '20px', md: '30px' },
    flex: 1,
    justifyContent: 'center'
  },
  containerStyles: {
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100vw',
    padding: {
      xs: '0',
      md: '10px'
    },
    margin: '0 auto',
    boxSizing: 'border-box',
  },
};
export const imageContainer = {
  width: { xs: '300px', sm: '360px', md: '200px' },
  margin: '0 auto',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
export const logoImageStyle = {
  height: "auto",
  width: "50%",
  objectFit: "contain"
}

// horizontal and vertical centering
export const centerAbsoluteItem = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute"
};
// horizontal and vertical centering
// loader start
export const loaderContainer = {
  ...centerAbsoluteItem,
  zIndex: 1301
};
export const loaderStyle = {
  border: "5px solid #FFFFFF",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  height: "16.35vw",
  width: "16.35vw",
  borderRadius: "50%"
};
export const backgroundOverLay = {
  zIndex: 1400,
  width: "100vw",
  height: "100vh",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "fixed",
  background: "rgba(26, 67, 119, 0.5)",
  backdropFilter: "blur(5px)"
};
export const overLayText = {
  mt: "2rem",
  ...text3
};
// loader end

// search container
export const searchContainer = {
  height: "fit-content",
  width: "fit-content",
  borderRadius: "8px",
  bgcolor: ThemeColorPalete.primary.main,
  mx: "0.5rem"
};
//######## Page general setup start
// step heading starts
export const dividerStyle = {
  flexDirection: "row",
  borderBottom: "1px solid #C7C8D0",
  marginBottom: "5px"
}
const stepHeadingStyleCommon = {
  ...dividerStyle,
  height: { xs: "45px", md: "58px" }
}

export const stepContainerStyle = {
  ...stepHeadingStyleCommon,
  alignItems: "start"
};

export const stepContainerStyleHeading = {
  ...stepHeadingStyleCommon,
  alignItems: "center"
};
const circleDiameter = { xs: "28px", md: "34px" };
export const stepNumberContainerStyle = {
  width: circleDiameter,
  height: circleDiameter,
  background: "#F4F6FA",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  border: "1px solid #C7C8D0",
  color: "#C7C8D0"
};
export const smallstepNumberContainerStyle = {
  width: "20px",
  height: "20px",
  background: "#F4F6FA",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  border: "1px solid #C7C8D0",
  color: "#C7C8D0",
  marginTop: "3.5px"

};
export const stepHeadingStyle = {
  fontWeight: 500,
  fontSize: { xs: ".75rem", md: "1rem" },
  marginLeft: ".8rem",
  marginTop: "5px"
};

export const activeStepStyle = {

  '& > .MuiStepLabel-iconContainer': {
    border: '3px solid white',
    borderRadius: '50%',
    borderSpacing: '15px',
    outline: `2px solid ${AppStyle.palette.primary.main}`,
    transform: 'scale(1.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)',
  }
}

export const indActiveStepStyle = {
  '& > .MuiStepLabel-iconContainer': {
    border: '3px solid white',
    borderRadius: '50%',
    borderSpacing: '15px',
    outline: '2px solid white'
  }
}

// step heading ends

export const casesyle = {
  fontSize: '0.8rem',
  padding: "10px",
  fontWeight: 500,
  marginTop: '2rem'

};
// todo start
export const lableStyle = {
  fontWeight: 400,
  fontSize: ".9rem",
  marginBottom: "2px",
  lineHeight: "1.4375em",
  marginLeft: "5px"
};
const lableCommonStyle = {
  fontWeight: 600,
  // fontSize: ".70rem",
  fontSize: "1rem",
  marginBottom: "2px",
  lineHeight: "1.4375em",
  paddingLeft: '12px'
}
export const lable1Style = {
  ...lableCommonStyle,
  marginLeft: "5px"
};
export const lable1CopyStyle = {
  ...lableCommonStyle,
  padding: "0px !important"
};

export const questionStyle = {
  fontWeight: 550,
  // fontSize: ".70rem",
  fontSize: "1rem",
  marginBottom: "2px",
  lineHeight: "1.4375em",
  paddingLeft: '12px',
  padding: "0px !important"
}

export const lable2Style = {
  ...lableCommonStyle
};
export const lable3Style = {
  ...lableCommonStyle,
  fontSize: ".75rem"
};
export const lableRedStyle = {
  ...lableCommonStyle,
  fontSize: "1rem",
  color: ThemeColorPalete.red.main,
};
export const inputPropsStyle = {
  //todo
}
export const labelDividerStyle = {}
// todo end
//######## Page general setup end
// Data Table start

export const toolbarsx = {
  pl: { sm: 2 },
  pr: { xs: 1, sm: 1 },
  bgcolor: `${alpha(ThemeColorPalete.lightPink.main, 0.23)}`,
  borderBottom: "1px solid rgba(224, 224, 224, 1)"
};
export const firstCell = {
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap"
};

// Data Table end

// small list table start
export const tableHeadRowStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  bgcolor: "#fff"

}
export const smallTableContainer = {
  maxHeight: "65vh",
  overflowX: 'auto'
}

export const smallTableHeaderCellStyle = {
  fontFamily: AppStyle.typography.fontFamily,
  textAlign: "left",
  fontSize: { xs: '.9rem', md: '1.2rem' },
  fontWeight: 600,
  color: "#000",
  "&:hover": {
    color: "#000"
  }
}

// small list table end

// White screen starts
export const whiteScreen = {
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 5,
  height: "100%",
  width: "100%",
  backgroundColor: "#EAEBEC"
};
// White screen ends

export const dashboardtextStyle = {
  fontFamily: AppStyle.typography.fontFamily,
  fontSize: { xs: '.9rem', md: '1.2rem' },
  textAlign: "left"
};
// Table action icons starts
export const tableActionIconListStylesx = {
  bgcolor: ThemeColorPalete.common.white,
  p: 1,
  borderRadius: "8px",
  flexDirection: "row",
  position: "absolute",
  right: "100%",
  top: "50%",
  transform: "translate(0, -50%)",
  zIndex: "1000"
};
export const actionIconStyle = {
  margin: ".5rem ",
};
export const downloadIconStyle = {
  ...actionIconStyle,
  color: "white",
  bgcolor: ThemeColorPalete.primary.main,
  '&:hover': {
    bgcolor: ThemeColorPalete.primary.light,
    transform: 'scale(1.05)'
  },
  borderRadius: "50%",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
  transition: 'transform 0.2s, background-color 0.2s',
  padding: "8px",
  fontSize: "1.5rem",
};
export const _addFabStyle = {
  bgcolor: ThemeColorPalete.primary.main,
  "&:hover": {
    bgcolor: ThemeColorPalete.primary.main
  },
};
export const greenFabStyle = {
  ...actionIconStyle,
  zIndex: 0,
  position: "relative",
  // right: "10px",
  // top: "10px",
  // width: { xs: 40, sm: 40 },

  // height: { xs: 40, sm: 40 },
  // width: { xs: 40, sm: 40 },
  // height: { xs: 40, sm: 40 },
  bgcolor: ThemeColorPalete.green1.light,
  color: ThemeColorPalete.common.white,
  "&:hover": {
    bgcolor: ThemeColorPalete.green1.main
  },
};
export const primaryFabStyle = {
  ...actionIconStyle,
  zIndex: 0,
  position: "relative",
  // right: "10px",
  // top: "10px",
  // width: { xs: 40, sm: 40 },
  // height: { xs: 40, sm: 40 },
  // width: { xs: 40, sm: 40 },
  // height: { xs: 40, sm: 40 },
  bgcolor: ThemeColorPalete.primary.main,
  color: ThemeColorPalete.common.white,
  "&:hover": {
    bgcolor: ThemeColorPalete.primary.light
  },
};
export const redFabStyle = {
  zIndex: 0,
  ...actionIconStyle,
  bgcolor: ThemeColorPalete.error.main,
  color: ThemeColorPalete.common.white,
  "&:hover": {
    bgcolor: ThemeColorPalete.error.main
  },
};
export const yellowFabStyle = {
  ...actionIconStyle,
  bgcolor: ThemeColorPalete.yellow1.main,
  color: ThemeColorPalete.common.white,
  "&:hover": {
    bgcolor: ThemeColorPalete.yellow1.light
  },
};
// Table action icons

export const genderTypeStyle = {
  fontSize: "1.2rem",
  fontWeight: 500
};

export const headingType1 = {
  ...lable1CopyStyle,
  fontWeight: 500,
  ...fontSizeType1
}

export const checkBoxLabelStyle = {
  ...lable1CopyStyle,
  margin: 'auto',
}
export const checkBoxStyle = {
  '& .css-j204z7-MuiFormControlLabel-root': {
    marginLeft: 0,
  },
}
export const genderSectionContainer = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  borderRadius: "7px"
}

export const autocompleteStyle = {
  "& .MuiInputBase-root": {
    height: "46px",
    alignContent: "center"
  },
};

// Disble section style
export const disableSectionStyle = {
  position: "absolute",
  left: { xs: "4px", md: "12px" },
  top: "5px",
  height: '100%',
  background: "black",
  opacity: "0.2",
  width: "100%",
  zIndex: "3",
  borderRadius: "8px"
};

// verification style starts

export const verificationStyle = {
  fontSize: "16px",
  ml: "2px",
};
export const docNotVerifiedColor = ThemeColorPalete.warning.main;
export const docVerifySuccess = ThemeColorPalete.success.main;
export const docVerifyFailed = ThemeColorPalete.error.main;

const verifyIconStyle = {
  height: "6rem",
  width: "12rem"
};
export const verifyFailedIconStyle = {
  color: ThemeColorPalete.error.main,
  ...verifyIconStyle,
  cursor: "pointer"
};
export const verifySuccessIconStyle = {
  color: ThemeColorPalete.success.main,
  ...verifyIconStyle,
  cursor: "pointer"
};
export const notVerifySuccessIconStyle = {
  color: ThemeColorPalete.warning.main,
  ...verifyIconStyle,
  cursor: "text"
};

// verification style ends
// appointee view page start
export const linkStyle = {
  textAlign: "center",
  cursor: "pointer",
  color: "#202B46",
  fontSize: "1.1rem"
};
export const gridContainerStyle = {
  flexGrow: 1,
  width: "90%",
  mx: "auto",
  py: "2rem"
};
export const cardStyle = {
  bgcolor: "white",
  padding: "1rem",
  borderRadius: "8px",
  // margin: "1rem 0 "
  margin: "1rem 0 "
};
export const cardStyle2 = {
  bgcolor: "white",
  padding: "1rem",
  borderRadius: "8px",
  // margin: "1rem 0 "
  // marginTop: "1rem"
};
export const listStyle = {
  borderBottom: "1px solid #E2E8F0",
  padding: "1rem",
  ml:0,
  mt:0
};
export const fieldNameStyle = {
  fontSize: { xs: '12px', md: '14px', lg: '16px' }
}
export const listHeadingConteinerStyle = {
  flexDirection: "row",
  ...listStyle,
  justifyContent: "center",
  alignItems: "center"
};
export const listHeadingConteinerStylesx = {
  flexDirection: "row",
  ...listStyle,
  justifyContent: "space-between",
  alignItems: "center"
};

export const documentListStyle = {
  ...listStyle,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}
export const documentListItemStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between"
}
export const memberNameStyle = {
  fontWeight: 600,
  fontSize: "1.5rem",
  textAlign: "center"
};
export const appointeeImageViewStyle = {
  width: { xs: '6vw', md: '2vw' },
  cursor: "pointer"
}
export const displayImageStyle = {
  height: 'auto',
  width: '100%'
}
export const floatingIconListStyle = {
  position: "fixed",
  top: 100,
  right: 50,
  alignItems: "center"
};
export const actionIconListStyle = {
  marginTop: "2rem"
};
export const actionIconListStylesx = {
  marginTop: "10px"
};
export const actionstyle={
  position: "absolute",
  top: "1rem",         
  right: "0.6rem", 
}
export const listHeadingStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.2rem"
};

export const buttonStyleSx = {
  background: 'linear-gradient(45deg, #7851A9, #5E3D8D)',
  borderRadius: '25px',
  padding: '8px 20px',
  fontWeight: 'bold',
  color: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s, background-color 0.2s',
  '&:hover': {
    backgroundColor: '#68439A',
    transform: 'scale(1.05)',
  }
}
// appointee view page end
// Acticvity log start

export const accordionStyle = {
  maxHeight: "100vh",
  overflowY: "auto",
  scrollBehavior: "smooth"
}
export const badgeDesc = {
  fontSize: "0.7rem",
  fontWeight: 600
};
export const timelineDot = {
  borderWidth: "6px",
  padding: "4px",
  borderColor: "#5a5a5a"
};
// Acticvity log end

export const modelToolbar = {
  backgroundColor: ThemeColorPalete.primary.main,
  minHeight: { xs: "48px" }
};
// chip style start

export const appointeeVerificationStatusChipPropsStyle = {
  mx: "3px",
  fontWeight: 500,
  color: "#ffffff"
}
const chipStyle = {
  px: "4px",
  color: "#fff",
  margin: "1px",

};
const issueColor = "#e71a64";
export const issueTextStyle = {
  color: issueColor
}
export const issueChipStyle = {
  ...chipStyle,
  backgroundColor: issueColor
};

export const consetPendingChipStyle = {
  ...chipStyle,
  backgroundColor: "#9e9e9e"
};
export const consetGivenChipStyle = {
  ...chipStyle,
  backgroundColor: "#30bb20"
};
export const consetDeclinedChipStyle = {
  ...chipStyle,
  backgroundColor: '#e0040c'
};
export const reprocessedChipStyle = {
  ...chipStyle,
  backgroundColor: "#676ef7"
};
export const submittedStyle = {
  ...chipStyle,
  backgroundColor: ThemeColorPalete.primary.main
};

export const ongoingStyle = {
  ...chipStyle,
  backgroundColor: ThemeColorPalete.secondary.main
};
export const noResponseStyle = {
  ...chipStyle,
  backgroundColor: ThemeColorPalete.error.main
};
export const successStyle = {
  ...chipStyle,
  backgroundColor: ThemeColorPalete.success.main
};
export const xsChipIconCommonStyle = {
  width: '12px', height: '12px'
}
export const successGreenXsOutlineStyle = {

  color: "#2e7d32",
  backgroundColor: "transparent",
  border: "1px solid #2e7d32",
  fontSize: '.6rem',
  '&.MuiChip-root': {
    height: '18px'
  }
}
export const cancelledStyle = {
  ...chipStyle,
  backgroundColor: ThemeColorPalete.error.main
};
export const lapsedStyle = {
  ...chipStyle,
  backgroundColor: ThemeColorPalete.error.main
};
export const manualStyle={
  ...chipStyle,
  backgroundColor:"#6F4A9F"
}
export const manualstyle1={
  ...chipStyle,
  backgroundColor:"#E12009"
}
export const candidatefileViewContainerStyle = {
  // width: '100%',
  // overflowX: 'scroll',
  width: '89.47%',
  height: '300px',
  margin: 'auto',
  // backgroundColor: '',
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "4px",
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '4px',
  marginBottom: '30px'

}
export const imagestyleContainer = {
  border: '2px dashed #ccc',
  borderRadius: '8px',
  padding: '16px',
  margin: 'auto',
  marginTop: '25px',
  marginBottom: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  overflowX: 'auto',
  overflowY: 'auto',
  width: "85%",
  height: "100%"
}

export const getStatusChipStyle = (status) => {
  switch (status) {
    case "Submitted":
      return submittedStyle;
    case "Ongoing":
      return ongoingStyle;
    case "No Response":
      return noResponseStyle;
    case "Verified":
      return successStyle;
    case "Cancelled":
      return cancelledStyle;
    case "Lapsed":
      return lapsedStyle;
    case "Consent Pending":
      return consetPendingChipStyle;
    case "Consent Given":
      return consetGivenChipStyle;
    case "Consent Declined":
      return consetDeclinedChipStyle;
    case "Reprocessed":
      return reprocessedChipStyle;
    default:
      return {};
  }
};
export const statusstyle={
  margin: "5px 0", 
  color: "#fff",
  fontSize:"0.8rem" 
}
export const statusBoxstyle={
  padding: "5px", 
  backgroundColor: "#333",
  borderRadius: "4px" 
}
export const pendingverificationsx={
  boxShadow: 10,
  fontSize: "1rem", 
  border: "2px solid rgba(255, 255, 255, 0.8)", 
  borderRadius: "8px", 
  "&:hover": {
    boxShadow: 20, 
    transform: "scale(1.05)", 
  },
  transition: "box-shadow 0.3s, transform 0.3s",
}
export const buttonStyle = {
  width: '80px',
  height: '36px',
  padding: '4px 0',
  borderRadius: '8px',
  bgcolor: ThemeColorPalete.primary.dark,
  "&:hover": {
    bgcolor: ThemeColorPalete.primary.light
  },
}

export const popupStyle = {
  direction: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  cursor: 'pointer',
  padding: '8px',
  spacing: 1

}
// chip style end
// Upload file starts
export const fileUploadSectionContainerStyle = {
  margin: '10px 0px!important',
}
const fileUploadSectionTextMargin = '6px';
export const fileNameStyle = {
  fontSize: ".875rem",
  textAlign: 'center',
  marginTop: fileUploadSectionTextMargin,
  texWrap: 'nowrap',
  marginBottom: "8px"
}
export const boxStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  zIndex: 1
}
export const fileNameStyleinview = {
  fontSize: "0.9rem",
  textAlign: 'center',
  marginTop: 0,
  texWrap: 'nowrap'
}
export const PopupboxStyle = {
  padding: '4px 8px',
  borderRadius: '16px',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  display: 'inline-block'
}
export const filenameContainer = {
  flexDirection: 'row',
  alignItems:'center',
  justifyContent: 'center',
  // marginTop: '10px',
  padding: '0 10px',
  paddingY: '15px',
  marginBottom: "15px",
  position: 'relative',
  zIndex: 2
}
export const uploadIconContainer = {
  backgroundColor: ThemeColorPalete.common.white,
  borderRadius: "50%",
  width: "20px"
};
export const uploadIconStyle = {
  color: ThemeColorPalete.primary.main,
  "&:hover": {
    color: ThemeColorPalete.primary.dark
  },
};
export const fileCard = {
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  width: "fitcontent"
};
export const fileInputs = {
  position: "relative",
  marginTop: "-15px",
  // marginBottom:"25px",
  "& input": {
    position: "relative",
    textAlign: "right",
    opacity: 0,
    zIndex: 2,
    cursor: "pointer",
    height: "46px",
    maxWidth: "120px"
  },

  "& button": {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    maxWidth: "200px",
    height: "100%",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    outline: "none",
    boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.5)"
  }

};

export const uploadBtnCommonStyle = {
  margin: "5px",
  height: 'fit-content',
  padding: '0 10px',
  width: 'fit-content!important',
  maxWidth: 'fit-content!important'
}

export const uploadBtnStyle = {
  ...uploadBtnCommonStyle,
  bgcolor: ThemeColorPalete.primary.main,
  "&:hover": {
    bgcolor: ThemeColorPalete.primary.dark
  },
  // ...buttonfontSize
};

export const otpInputSize = {
  width: { xs: "37px", sm: '40px' },
  marginX: "5px"
};
export const otpTextFieldStyle = {
  width: "100%",
  margin: "5px"
};
export const otpModalTextStyle = {
  fontWeight: "bold",
  fontSize: { xs: '0.9rem', md: '1.25rem' },
  m: "20px",
  textAlign: "center"
}
export const modelButtonStyle = {
  m: "10px 5px",
  backgroundColor: ThemeColorPalete.primary.main,
  fontWeight: 700,
  fontSize: "0.875rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: ThemeColorPalete.primary.light
  },
};
export const hideBoxSx = {
  display: { xs: 'none', md: 'block' }
}
export const otpInputSeperatorSx = {
  alignItems: "center",
  justifyContent: "center",
  height: "100%"
}
// otp forn ends
// Full screen model starts
export const fullScreenListItemStyle = {
  // paddingY: "20px",
  // paddingX: { xs: "16px", md: "24px" }
  height: 'fit-content'
};
// status chart style start
const secondary = ThemeColorPalete.secondary.main;
const successlight = ThemeColorPalete.green1.light;
const yellow = ThemeColorPalete.yellow1.light;
const rejected = ThemeColorPalete.red.main;

export const statusChartColorList = [successlight, secondary, yellow, rejected];
export const barcharcolour=[yellow,secondary]
// status chart style end

// skelton style starts
export const circularSkeltonStyle1 = {
  height: "40px",
  width: "40px",
};
export const uploadAreaStyle = {
  alignContent: "center",
  justifyItems: "center",
  border: "1px dashed",
  height: "150px",
};
// skelton style ends
// search style starts

export const searchInputContainer = {
  color: "#fff",
  alignItems: "center"
}

export const interactiveListCustomeStyle = {
  boxStyle: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    marginTop: "6px",
    maxHeight: "231px",
    overflowY: "scroll",
    borderRadius: "8px",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
  },
  listItemStyle: {
    cursor: "pointer"
  }
}

export const searchIconWrapperStyle = {
  padding: AppStyle.spacing(0, 2),
  height: '100%',
  cursor: "pointer",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
export const searchInputBaseStyle = {
  color: 'inherit',
  padding: AppStyle.spacing(0, 2),
  '& .MuiInputBase-input': {
    padding: AppStyle.spacing(1, 1, 1, 0),
    transition: AppStyle.transitions.create('width'),
    width: '100%',
    [AppStyle.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
};
export const searchStyle = {
  position: 'relative',
  borderRadius: "8px",
  backgroundColor: alpha(AppStyle.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(AppStyle.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [AppStyle.breakpoints.up('sm')]: {
    width: 'auto'
  },
};

export const interactiveListContainter = {
  flexGrow: 1,
  maxWidth: 752
}
export const interactiveListBoxStyle = {
  backgroundColor: ThemeColorPalete.background.paper
}
export const criticalFabStyle = {
  bgcolor: ThemeColorPalete.error.main,
  color: ThemeColorPalete.common.white,
  "&:hover": {
    bgcolor: ThemeColorPalete.error.dark
  }
}
export const dashBoardwidget = {
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 1
}
// search style ends

export const infoButtonStyle = {
  padding: 0.5,
  color: ThemeColorPalete.primary.main
}

export const fileInputboxContainerStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
  // overflowY:'scroll',
  background: "#F7FAFF",
  border: "2px dashed #375993",
  marginTop: "5px"
}
export const menuFooterTextStyle = {
  fontSize: ".9rem",
  textAlign: "center",
  color: ThemeColorPalete.common.white,
  paddingY: 1.6,
  fontWeight: 500
}
export const sidebarContainerStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}
export const sidebarWidth = { xs: '80vw', sm: '27vw', md: '20vw', lg: '18vw' };
export const menuDrawerBoxContainer = {
  width: sidebarWidth,
  flexShrink: 0,
  position: 'relative',
  height: '100vh',
  '& .MuiPaper-root': {
    width: sidebarWidth
  }
}

export const sidebarDrawerPaperStyle = {
  width: sidebarWidth,
  boxShadow: AppStyle.shadows[8],

}
export const fileImageHeaderStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}
export const fileTypeStyle = {
  fontWeight: "bold"
}
export const imageFileContainerStyle = {
  width: "70%",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",

}
export const pdfFileContainerStyle = {
  width: "100%",
  margin: "auto"
}
export const fileImageStyle = {
  mt: 2,
  width: "100%",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",

}
export const imageFileContainerStackStyle = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  width: { xs: "100%", md: "650px", xl: "900px" },
  maxWidth: "100%",
  border: "2px dashed #dbb4db",
  overflow: "hidden",
  overflowX: 'auto',
  overflowY: "auto",
}

export const zoomOutstackStyle = {
  position: 'sticky',
  top: '5%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 10,
}
export const listTableBoxContainerStyle = {
  width: "100%"
}
export const button2 = {
  bgcolor: ThemeColorPalete.primary.main,
  color: ThemeColorPalete.common.white,
  fontSize: ".8rem",
  fontWeight: 600,
  borderRadius: "20px",
  "&:hover": {
    bgcolor: ThemeColorPalete.primary.main,
    color: ThemeColorPalete.common.white
  }
}

export const otpTimerContainerStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "20px"
}

export const menuIconSx = {
  color: AppStyle.palette.common.white
}

export const containerSx = {
  padding: { xs: "20px", md: "20px 16px 0 16px" }
}
export const ScrollableContainer = styled("div")(() => ({
  height: "calc(100vh - 60px)", // Ensures enough height to scroll
  width: "100%",                // Full width for horizontal scroll
  overflowX: "auto",
  overflowY: "auto",
  whiteSpace: "nowrap",
  backgroundColor: 'transparent',
  zIndex: 1,
}));
export const smallFormModelHeadingSx = {
  fontWeight: "bold",
  fontSize: "20px",
  marginTop: "20px",
  textAlign: "center"
}
export const fieldValueSx = {

  whiteSpace: "normal",
  wordWrap: "break-word"
}

export const remarksInputContainerSx = {
  marginTop: "20px",
  marginLeft: "-12px"
}
export const iconStyle = {
  color: ThemeColorPalete.info.main,
  cursor: "pointer"
}
export const downLoadListSx = {
  backgroundColor: ThemeColorPalete.common.white,

  zIndex: 2,
  borderRadius: "8px",
  boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  marginTop: 0,
}
export const genderIconStyle = { fontSize: "3rem" };

export const infoDialogTitleStyle = {
  '&.MuiTypography-root': {
    fontSize: '1.1rem',
  }
}
export const midiumFontSize = { fontSize: '0.9rem' };
export const subHeadingContentTextStyle = {
  ...midiumFontSize
}

export const prerequisiteListStyle = {
  '& span': {
    ...midiumFontSize,
  },
  '& >span': {
    color: '#9A208C'
  },
  '&>p': {
    marginTop: '5px'
  }
}

export const prereqModalShowMoreInfoStyle = {
  fontSize: { xs: '.6rem', md: '.875rem' }
}

export const responsiveBtnType1Style = {
  padding: { xs: '4px 8px', sm: '6px 16px' },
  minWidth: { xs: '45px', sm: '65px' },
  ...buttonfontSize,
  backgroundColor: ThemeColorPalete.primary.main,
  "&:hover": {
    backgroundColor: ThemeColorPalete.primary.light
  },
}

export const useStyles = makeStyles(() => ({
  cardTitle: {
    fontSize: (props) => (props.isSmallScreen ? '1.0rem' : '0.80rem'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: (props) => (props.isSmallScreen ? 'normal' : 'nowrap'),
  },
}));


export const ResponsiveFab = styled(Fab)(({ backgroundColor, hoverColor }) => ({
  backgroundColor: backgroundColor || AppStyle.palette.yellow1.light,
  color: AppStyle.palette.common.white,
  padding: '0.5rem',
  borderRadius: '50%',
  [AppStyle.breakpoints.down('sm')]: {
    width: '2rem',
    height: '2rem',
    fontSize: '0.8rem',
  },
  [AppStyle.breakpoints.between('sm', 'md')]: {
    width: '2.2rem',
    height: '2.2rem',
    fontSize: '1rem',
  },
  [AppStyle.breakpoints.between('md', 'lg')]: {
    width: '2.2rem',
    height: '2.2rem',
    fontSize: '1.5rem',
  },
  [AppStyle.breakpoints.between('lg', 'xl')]: {
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '2.5rem',
  },
  [AppStyle.breakpoints.up('xl')]: {
    width: '3rem',
    height: '3rem',
    fontSize: '2.5rem',
  },

  // Hover effect
  '&:hover': {
    backgroundColor: hoverColor || AppStyle.palette.yellow1.main,
  },
}));


export const datePickerstyle = {
  width: '100%',
  '& .MuiFormControl-root': {
    width: '100%',
  }
}

export const page3formContainerStyle = {
  width: "100%",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer'
}

export const candidateRegistrationFormContainerStyle = {
  '& .customeTextField': {
    // marginX: 0
  }
}

export const formHeadingGridContainerStyle = {
  marginX: '10px',
}
export const divederStyle = {
  my: 2,
  borderBottom: '0.9px bold #000',
  width: '90%',
  mx: 'auto'
}

export const formHeadingContainerStyle = {
  paddingLeft: '0px !important'
}
const stepSize = { xs: '30px', md: '40px' };
export const stepAvataContainerStyle = {
  '& .MuiAvatar-root': {
    width: { ...stepSize },
    height: { ...stepSize }
  },
  minWidth: { xs: '46px', md: '56px' }
}

export const stepModelDividerStyle = {
  marginLeft: { xs: '63px', md: '72px' }
}

const submitButtonCommonStyle = {
  width: 'fit-content',
  height: 'fit-content',
  ...buttonfontSize
}
export const submitBtnStyle = {
  marginTop: '10px',
  marginBottom: '10px',
  marginRight: '24px',
  backgroundColor: AppStyle.palette.primary.main,
  ...submitButtonCommonStyle,
  "&:hover": {
    color: '#fff',
    backgroundColor: ThemeColorPalete.primary.light,
  },
}

export const rightMostBtnStyle = {
  marginTop: '10px',
  marginBottom: '10px',
  backgroundColor: AppStyle.palette.primary.main,
  ...submitButtonCommonStyle,
}

export const endJustifiedbtnContainer = {
  flexDirection: 'row',
  justifyContent: 'end'
}
export const verificationBtnStyle = {
  margin: "5px 0",
  ...submitButtonCommonStyle
}
export const submitBtnContainerStyle = {
  flexDirection: { xs: 'column', md: 'row' }
}

export const dropdownMenuItemStyle = {
  '&:hover, &.Mui-selected:hover': {
    backgroundColor: '#ffe6ff'
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(154, 32, 140, 0.08)'
  }
}
// export const submitButtonSubcontainerStyle = {
//   flexDirection: {399:'column'},
// }
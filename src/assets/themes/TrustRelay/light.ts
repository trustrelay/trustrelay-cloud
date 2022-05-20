import { createTheme } from '@mui/material/styles';

export default createTheme(
    {
        palette: {
            mode: "light",
            primary: {
                light:"#f5f5f5",
                main: "#0090BF",
                contrastText: "#FFFFFF"
            },
            secondary: {
                main: "#666666",
                contrastText: "#FFFFFF"
            },
            background: {
                default: "#f5f5f5"
            },
            // action:{
            //         "active": lightBlue[200],
            //         "activeOpacity": 1,
            //         "hover": lightBlue[100],
            //         "hoverOpacity": 0.7,
            //         "focus": lightBlue[600],
            //         "focusOpacity": 1,
            //         "selected": lightBlue[300],
            //         "selectedOpacity": 1,

            // }
        },
        typography: {
            fontFamily: 'raleway'
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    elevation: 0,
                    sx: {
                        backgroundColor: "#FFFFFF"
                    }
                },
                styleOverrides: {

                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#FFFFFF",
                        "boxShadow": "none"
                    }
                },
                defaultProps: {
                    sx: {
                        // backgroundColor: "#FFFFFF"
                        "&:hover": {
                            "boxShadow": "none"
                        }
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        // backgroundColor: "#999999",
                        "& .MuiCard-root": {
                            backgroundColor: "#FFFFFF",
                       },
                    }
                },
                defaultProps: {
                    sx: {
                        backgroundColor: "#FFFFFF"
                    }
                },
            },
            MuiLink: {
                defaultProps: {
                    "underline": "none",
                    sx: {
                        "color": "#444444"
                    }
                }
            },
            MuiAvatar: {
                defaultProps: {
                    sx: {
                        backgroundColor: "transparent"
                    }
                }

            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        "& .MuiButtonBase-root": {
                            "minWidth": "80px"
                        },
                    },
                    "flexContainer": {
                        backgroundColor: "inherit"
                    },
                    "scroller": {
                        backgroundColor: "inherit"
                    }
                }
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        "color": "#666666"
                    }
                }
            },
            MuiTab: {
                defaultProps: {
                    sx: {
                        "textTransform": "none",
                    }
                }
            },
            MuiButton: {
             
                defaultProps: {
                    sx: {
                        textTransform: "none",
                        borderRadius: "5px",
                        boxShadow: "none", 
                        '&:hover:not(.Mui-disabled)': {
                            cursor: "pointer"
                        }
                    },

                }
            },
            MuiTable: {
                defaultProps: {
                    sx: {
                        // "borderColor": "#ffffff"
                    }
                }
            },
            MuiTableRow: {
                defaultProps: {
                    sx: {
                        "&:hover": {
                            backgroundColor: "#bbdefb"
                        }
                    }
                }
            },
            MuiTableBody: {
                defaultProps: {
                    sx: {
                        "&:hover": {
                            // backgroundColor:"green"
                        }
                    }
                }
            },
            MuiTableCell: {
                defaultProps: {
                    sx: {
                        "borderColor": "#ffffff",
                        "&:hover": {
                            // backgroundColor:"red"
                        }
                    }
                }
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        "borderColor": "#ffffff"
                    }
                }
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        "flexDirection": "row-reverse"
                    }
                }
            },

            MuiTypography: {
                styleOverrides: {
                    h1: { 
                        fontSize: "35px"
                    },
                            h2: { 
                                fontSize: "30px"
                            },
                            h3: { 
                                fontSize: "25px"
                            },
                            h4: { 
                                fontSize: "20px"
                            },
                            h5: { 
                                fontSize: "18px"
                            },
                            h6: { 
                                fontSize: "16px"
                            },
                    //         "subtitle1": {
                    //             "color": "#444444",
                    //             fontSize: "20px"
                    //         },
                    //         "subtitle2": {
                    //             "color": "#444444",
                    //             fontSize: "20px"
                    //         },
                    body1: { 
                        fontSize: "13px"
                    },
                    //         "body2": {
                    //             "color": "#444444",
                    //             fontSize: "14px"
                    //         },
                    caption: { 
                        fontSize: "10px"
                    },
                    //         "button": {
                    //             "textTransform": "uppercase",
                    //         },
                    //         "overline": {
                    //             "color": "#444444",
                    //             fontSize: "12px"
                    //         }
                }
            }
        }
    }
)
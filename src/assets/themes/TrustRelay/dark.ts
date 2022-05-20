import { createTheme } from '@mui/material/styles';

export default createTheme(
    {
        palette: {
            mode: "dark",
            primary: {
                dark:"#21252b",
                main: "#0090BF",
                contrastText: "#FFFFFF"
            },
            secondary: {
                main: "#666666",
                contrastText: "#FFFFFF"
            },
            background: {
                default: "#21252b"
            }
        }, 
        typography: {
            fontFamily: 'raleway'
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    elevation: 0,
                    sx: {
                        // backgroundColor: "#f3f2ef",
                        // color:"#0090BF"
                    }
                } 
            },
            MuiCard: { 
                defaultProps: {
                    sx: {
                        // backgroundColor: "#FFFFFF"
                        "&:hover": {
                            boxShadow: "none"
                        }
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: { 
                         backgroundColor: "#282c34",
                        "& .MuiCard-root": {
                            backgroundColor: "#282c34",
                       },
                    }
                },
                defaultProps: {
                    sx: {
                        backgroundColor: "#282c34"
                    }
                },
            },
            MuiGrid: {
                defaultProps: {
                    sx: {
                        backgroundColor: "transparent"
                    }
                }
            },
            MuiLink: {
                defaultProps: { 
                    underline: "none",
                    sx: {
                    }

                }
            },
            MuiAvatar: {

                defaultProps: {
                    sx: {
                        // backgroundColor: "transparent"
                    }
                },
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent"
                    },
                }
            },  
            MuiTabs: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#21252b",
                        "& .MuiButtonBase-root": {
                            "minWidth":"80px"
                       },
                    },
                    flexContainer: {
                        backgroundColor: "inherit"
                    },
                    scroller: {
                        backgroundColor: "inherit"
                    }
                }
            }, 
            MuiSvgIcon:{
                styleOverrides:{
                    root:{
                        color:"#aaaaaa"
                    }
                }
            },
            MuiTab: {
                defaultProps: {
                    sx: {
                        "textTransform": "none",
                        backgroundColor: "#21252b"
                    }
                },
                styleOverrides: {
                    root:{ 
                        "&.Mui-selected": {
                            backgroundColor: "transparent"
                        },
                    },
                    
                    textColorPrimary: {
                        color: "#0090BF"
                    }
                }
            },
            MuiButton: {
                defaultProps: {
                    sx: {
                        textTransform: "none",
                        borderRadius: "5px",
                        boxShadow: "none",
                        "&:hover:not(.Mui-disabled)": {
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
                            backgroundColor: "#222222"
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
                        borderColor: "#ffffff",
                        "&:hover": {
                            // backgroundColor:"red"
                        }
                    }
                }
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        borderColor: "#ffffff"
                    }
                }
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        flexDirection: "row-reverse"
                    }
                }
            },
            MuiBreadcrumbs: {
                defaultProps: {
                    color: "#0090BF"
                },
                styleOverrides: {
                    li: {
                        color: "#0090BF"
                    },
                }
            },
            MuiToggleButton:{
                defaultProps:{ 
                }
            },
            MuiTypography: {
                defaultProps: {
                    sx: {
                        color: "#FFFFFF"
                    }
                },
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
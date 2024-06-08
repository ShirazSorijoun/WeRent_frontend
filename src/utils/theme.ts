import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  direction: "rtl",
  components: {
    MuiTextField: {
      styleOverrides: {
        root: { direction: "rtl" },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { direction: "rtl" },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: { padding: "8px 0px" },
      },
    },
    MuiButton: {
      styleOverrides: {
        endIcon: { marginLeft: "-4px", marginRight: "8px" },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // overflow: "hidden",
        },
      },
    },
  },
  palette: {
    background: {
      default: "whitesmoke",
    },
  },
  typography: {
    allVariants: { textAlign: "start", wordWrap: "break-word" },
  },
});

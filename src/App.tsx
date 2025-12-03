import { AppRoutes } from "./routes/AppRoutes";
import { WrapperProvider } from "./contexts/wrapper";
import { ToastProvider } from "./contexts/toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const customTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#333 !important",
          color: "#fff",
          padding: "1rem",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: "8px 0 !important",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: "8px 0 !important",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "60px !important",
          "&.Mui-expanded": {
            minHeight: "60px !important",
          },
        },
        content: {
          margin: "6px 0",
          "&.Mui-expanded": {
            margin: "6px 0",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "12px 16px",
        },
      },
    },
  },
  typography: {
    fontSize: 12,
  },
  spacing: 4,
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <WrapperProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </WrapperProvider>
    </ThemeProvider>
  );
}

export default App;

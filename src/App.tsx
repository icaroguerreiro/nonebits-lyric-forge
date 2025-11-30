import { AppRoutes } from "./routes/AppRoutes";
import { WrapperProvider } from "./contexts/wrapper";
import { ToastProvider } from "./contexts/toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <WrapperProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </WrapperProvider>
    </ThemeProvider>
  );
}

export default App;

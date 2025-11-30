import { AppRoutes } from "./routes/AppRoutes";
import { WrapperProvider } from "./contexts/wrapper";
import { ToastProvider } from "./contexts/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <WrapperProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </WrapperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

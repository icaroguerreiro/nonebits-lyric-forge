import { Alert, Snackbar } from "@mui/material";
import { createContext, ReactNode, useState } from "react";

export type ToastSeverity = "success" | "info" | "warning" | "error";

export interface ToastOptions {
  message: string;
  severity?: ToastSeverity;
  duration?: number;
  position?: {
    vertical?: "top" | "bottom";
    horizontal?: "left" | "right" | "center";
  };
}

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastOptions>({
    message: "",
    severity: "info",
    duration: 3000,
    position: { vertical: "bottom", horizontal: "left" },
  });

  const showToast = (options: ToastOptions) => {
    setToast({
      message: options.message,
      severity: options.severity || "info",
      duration: options.duration || 3000,
      position: { vertical: "bottom", horizontal: "left" },
    });
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* MUI Component */}
      <Snackbar
        open={open}
        autoHideDuration={toast.duration}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={toast.severity}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

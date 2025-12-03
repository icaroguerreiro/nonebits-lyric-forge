import { TextField } from "@mui/material";

const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

export default function NumberField(props: any) {
  const { value, onChange, label, max = 0, ...rest } = props;

  return (
    <TextField
      type="number"
      label={label}
      fullWidth
      value={value}
      onKeyDown={(__ev: any) => {
        if (!/\d/.test(__ev.key) && !allowedKeys.includes(__ev.key)) {
          __ev.preventDefault();
        }
      }}
      onChange={(__ev: any) => {
        onChange(__ev);
      }}
      slotProps={{
        htmlInput: {
          ...rest,
          sx: {
            "&::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&[type=number]": { MozAppearance: "textfield" },
          },
        },
      }}
    />
  );
}

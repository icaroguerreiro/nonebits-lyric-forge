import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

interface Props {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  limitTags?: number;
  options?: string[];
  fullWidth?: boolean;
  allowDuplicates?: boolean;
  onFocus?: Function;
  onClick?: Function;
  onKeyDown?: Function;
}

export default function FreeSoloChipsAutocomplete({
  label,
  value,
  onChange,
  limitTags,
  options = [],
  fullWidth = true,
  allowDuplicates = false,
  onFocus = () => {},
  onClick = () => {},
  onKeyDown = () => {},
}: Props) {
  const [pending, setPending] = useState("");

  const addChip = (chip: string) => {
    const trimmed = chip.trim();
    if (!trimmed) return;

    if (!allowDuplicates && value.includes(trimmed)) return;

    onChange([...value, trimmed]);
  };

  const addPending = () => {
    addChip(pending);
    setPending("");
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      fullWidth={fullWidth}
      limitTags={limitTags}
      options={options}
      value={value}
      inputValue={pending}
      onInputChange={(_ev, newInput) => {
        setPending(newInput);
      }}
      onBlur={addPending}
      onKeyDown={(e) => {
        onKeyDown();
        if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          addPending();
        }
      }}
      onChange={(_ev, newValue, reason, details) => {
        // Se o usuário selecionou uma opção sugerida (option)
        if (reason === "selectOption" && details?.option) {
          addChip(details.option);
          setPending("");
          return;
        }

        // Se apagou um chip
        if (reason === "removeOption") {
          onChange(newValue);
          return;
        }

        // fallback para outros casos
        onChange(newValue);
      }}
      onFocus={() => {
        onFocus();
      }}
      onClick={() => {
        onClick();
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

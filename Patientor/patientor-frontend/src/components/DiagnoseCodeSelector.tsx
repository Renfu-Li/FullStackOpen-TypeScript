import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import diagonoseService from "../services/diagnoses";
import { Diagnose } from "../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(code: string, selectedCodes: string[], theme: Theme) {
  return {
    fontWeight:
      selectedCodes.indexOf(code) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultipleSelectProps {
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MultipleSelect(props: MultipleSelectProps) {
  const theme = useTheme();
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  let codes: string[] = [];

  useEffect(() => {
    const getDiagnoses = async () => {
      const diagnoses: Diagnose[] = await diagonoseService.getDiagnoses();
      setDiagnoses(diagnoses);
    };

    getDiagnoses();
  }, []);

  codes = diagnoses.map((d) => d.code);

  const handleChange = (
    event: SelectChangeEvent<typeof props.diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    props.setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Code</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={props.diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Code" />}
          MenuProps={MenuProps}
        >
          {codes.map((code) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, props.diagnosisCodes, theme)}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

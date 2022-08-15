import { FormControlLabel, Switch, Typography } from "@mui/material";
import React, { FC } from "react";
import { Controller } from "react-hook-form";

interface SwitchProps {
  name: string;
  control: any;
  error: any;
  label: string;
}

const MSwitch: FC<SwitchProps> = ({ name, control, error, label }) => {
  return (
    <>
      <Controller
        render={({ field }) => (
          <FormControlLabel
            control={<Switch color='secondary' {...field} defaultChecked />}
            label={label}
          />
        )}
        name={name}
        control={control}
      />
      <Typography color='error' textAlign={"left"} sx={{ py: "4px" }}>
        {error[name] && error[name].message}
      </Typography>
    </>
  );
};

export default MSwitch;

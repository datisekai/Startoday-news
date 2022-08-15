import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { primary } from "../theme/themeColors";

interface SelectProps {
  name: string;
  control: any;
  error: any;
  rules: any;
  label: string;
  data: any[];
}

const MSelect: FC<SelectProps> = ({
  name,
  control,
  error,
  rules,
  label,
  data,
}) => {
  return (
    <>
      <Controller
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label' color='info'>
              {label}
            </InputLabel>
            <Select
              {...field}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Đơn vị'
              color='secondary'
              sx={{
                ".css-1u2x234-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1u2x234-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1u2x234-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                  {
                    bgcolor: primary[100],
                  },
              }}
            >
              <MenuItem value={""}>Chọn loại</MenuItem>
              {data.map((item: any, index: number) => (
                <MenuItem key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        name={name}
        control={control}
        rules={rules}
      />
      {error[name] && (
        <Typography color='error' textAlign={"left"} sx={{ py: "4px" }}>
          {error[name].message}
        </Typography>
      )}
    </>
  );
};

export default MSelect;

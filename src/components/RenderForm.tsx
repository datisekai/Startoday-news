import React from "react";
import { primary } from "../theme/themeColors";
import MSelect from "./MSelect";
import MSwitch from "./MSwitch";
import MTextField from "./MTextField";

const RenderForm = ({ data, control, errors }: any) => {
  return (
    <>
      {data.type === "textfield" ? (
        <MTextField
          control={control}
          error={errors}
          label={data.label}
          name={data.name}
          rules={data.rules}
          customSx={{
            ".css-1wvp7yn-MuiInputBase-input-MuiOutlinedInput-input": {
              backgroundColor: primary[100],
            },
            ".css-9q7mxj": {
              bgcolor: primary[100],
            },
          }}
        />
      ) : data.type === "select" ? (
        <MSelect
          control={control}
          data={data.data}
          error={errors}
          label={data.label}
          name={data.name}
          rules={data.rules}
        />
      ) : data.type === "switch" ? (
        <MSwitch
          control={control}
          error={errors}
          label={data.label}
          name={data.name}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RenderForm;

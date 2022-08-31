import { Box } from "@mui/material";
import React, { FC } from "react";
import Props from "../models/Props";

const WidthLayout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ maxWidth: "980px", mx: "auto", width: "calc(100% - 20px)" }}>
      {children}
    </Box>
  );
};

export default WidthLayout;

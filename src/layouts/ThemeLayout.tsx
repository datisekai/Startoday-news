import { createTheme, ThemeProvider } from "@mui/material";
import React, { FC } from "react";
import Props from "../models/Props";
import { getDesignTokens } from "../theme/theme";

const ThemeLayout: FC<Props> = ({ children }) => {
  const theme = createTheme(getDesignTokens("light"));
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeLayout;

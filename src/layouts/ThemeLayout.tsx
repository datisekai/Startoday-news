import { createTheme, ThemeProvider } from "@mui/material";
import React, { FC, useEffect } from "react";
import Props from "../models/Props";
import { getDesignTokens } from "../theme/theme";
import AOS from "aos";
import "aos/dist/aos.css";

const ThemeLayout: FC<Props> = ({ children }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const theme = createTheme(getDesignTokens("light"));
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeLayout;

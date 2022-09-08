import { Box } from "@mui/material";
import React, { FC } from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import OnTop from "../components/OnTop";
import Slider from "../components/Slider";
import Props from "../models/Props";

const SearchLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Categories />
      <OnTop />
      <Box sx={{ minHeight: "100vh" }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default SearchLayout;

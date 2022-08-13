import { Box, Button } from "@mui/material";
import React from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import useScrollY from "../hooks/useScrollY";
import { primary } from "../theme/themeColors";
import handleOnTop from "../utils/handleOnTop";
const OnTop = () => {
  const scroll = useScrollY();

  return (
    <div
      onClick={handleOnTop}
      style={{ display: scroll > 500 ? "block" : "none" }}
    >
      <ArrowCircleUpIcon
        sx={{
          position: "fixed",
          right: "20px",
          bottom: "50px",
          color: primary.main,
          cursor: "pointer",
          bgcolor: "white",
          borderRadius: "5px",
          zIndex: 1000,
          transition: "0.3s linear",
        }}
        id='shadowBox'
        fontSize='large'
      />
    </div>
  );
};

export default OnTop;

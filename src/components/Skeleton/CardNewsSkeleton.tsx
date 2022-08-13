import { Box, Button, Skeleton, Typography } from "@mui/material";
import React from "react";
import styleLineClamp from "../../utils/styleLineClamp";
import FlexBox from "../FlexBox";

const CardNewsSkeleton = () => {
  return (
    <FlexBox alignItems={"center"}>
      <Box sx={{ width: "100%" }}>
        <Skeleton width={"100%"} />
        <Skeleton width={"80%"} />
        <Skeleton width={"50%"} />
      </Box>
      <Box p={2}>
        <Skeleton width={"100%"} height={"100px"} />
      </Box>
    </FlexBox>
  );
};

export default CardNewsSkeleton;

import { Box, Skeleton } from "@mui/material";
import React from "react";

const NewsDetailSkeleton = () => {
  return (
    <Box px={2} pl={{ md: 5, xs: 2 }} mt={4}>
      <Skeleton height={30} />
      <Skeleton height={500} sx={{ transform: "scale(1, 0.96)" }} />
    </Box>
  );
};

export default NewsDetailSkeleton;

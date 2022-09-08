import { Box, Card, Skeleton, Stack } from "@mui/material";
import React from "react";
import FlexBox from "../FlexBox";

const SearchSkeleton = () => {
  return (
    <Stack direction={"row"} alignItems='center' spacing={2} mt={2}>
      <Box sx={{ width: "60%" }}>
        <Skeleton animation={"wave"} width={"100%"} height={40} />
        <Skeleton animation={"wave"} width={"100%"} height={70} />
      </Box>
      <Box sx={{ width: "40%" }}>
        <Skeleton
          width={"100%"}
          height='110px'
          sx={{ pl: 2, transform: "scale(1,1)" }}
        />
      </Box>
    </Stack>
  );
};

export default SearchSkeleton;

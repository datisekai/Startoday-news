import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import TinTucItem from "../../models/TinTucItem";
import CardSection2 from "../Card/CardSection2";

interface Section2Props {
  data: TinTucItem[];
}

const Section2: FC<Section2Props> = ({ data }) => {
  return (
    <Box mt={5}>
      <Typography fontWeight={500} fontSize={20}>
        Top lượt xem
      </Typography>
      <Grid container spacing={2} sx={{ width: "100%" }} mt={1}>
        {data.map((item: TinTucItem, index: number) => (
          <Grid item key={index} xs={6} md={4} lg={2.4}>
            <CardSection2 {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section2;

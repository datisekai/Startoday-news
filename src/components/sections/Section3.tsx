import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import TinTucItem from "../../models/TinTucItem";
import CardSection1 from "../Card/CardSection1";
import CardSection3Left from "../Card/CardSection3Left";
import Section4 from "./Section4";

interface Section3Props {
  data: any;
}

const Section3: FC<Section3Props> = ({ data }) => {
  const { news1, news2 } = data;
  return (
    <Box mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography
            textTransform={"capitalize"}
            fontWeight={500}
            fontSize={20}
          >
            {news1.category.name}
          </Typography>
          <Section4 data={news1.data} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            textTransform={"capitalize"}
            fontWeight={500}
            fontSize={20}
          >
            {news2.category.name}
          </Typography>
          <Stack mt={2} spacing={1}>
            {news2.data.map((item: TinTucItem) => (
              <CardSection1 {...item} key={item._id} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section3;

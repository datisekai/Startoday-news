import { Box, Grid, Pagination, Stack } from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import TinTucItem from "../../models/TinTucItem";
import CardSection1 from "../Card/CardSection1";
import CardSection1Big from "../Card/CardSection1Big";
import FlexBox from "../FlexBox";

interface Section1Props {
  data: TinTucItem[];
}

const Section1: FC<Section1Props> = ({ data }) => {
  const [page, setPage] = useState(1);
  const perpage = 5;

  const section = useMemo(() => {
    return data.slice((page - 1) * perpage, page * perpage);
  }, [page, data]);

  return (
    <>
      <Stack direction={{ md: "row", xs: "column" }} spacing={2} mt={2}>
        <Box sx={{ width: { md: "65%", xs: "100%" } }}>
          <CardSection1Big {...section[0]} />
        </Box>
        <Stack spacing={2} sx={{ width: { md: "35%", xs: "100%" } }}>
          {section.slice(1).map((item: TinTucItem, index: number) => (
            <CardSection1 {...item} key={index} />
          ))}
        </Stack>
      </Stack>
      <FlexBox mt={5} justifyContent='center'>
        <Pagination
          color='secondary'
          count={Math.ceil(data.length / perpage)}
          onChange={(e, page) => setPage(page)}
          variant='outlined'
          shape='rounded'
        />
      </FlexBox>
    </>
  );
};

export default Section1;

import { Stack } from "@mui/material";
import React, { FC } from "react";
import TinTucItem from "../../models/TinTucItem";
import CardSection3Left from "../Card/CardSection3Left";

interface Section4Props {
  data: TinTucItem[];
}

const Section4: FC<Section4Props> = ({ data }) => {
  return (
    <Stack mt={2} spacing={1}>
      {data.map((item: TinTucItem) => (
        <CardSection3Left {...item} key={item._id} />
      ))}
    </Stack>
  );
};

export default Section4;

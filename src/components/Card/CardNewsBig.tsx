import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import NewsBaseItem from "../../models/NewsBaseItem";
import { primary } from "../../theme/themeColors";
import styleLineClamp from "../../utils/styleLineClamp";
import FlexBox from "../FlexBox";
import NImage from "../NImage";

const CardNewsBig: FC<NewsBaseItem> = ({
  description,
  href,
  images,
  title,
}) => {
  return (
    <Link href={`/${href}`}>
      <FlexBox
        sx={{
          borderRadius: 1,
          flexDirection: {
            md: "row",
            xs: "column",
          },
          justifyContent: {
            md: "flex-start",
            xs: "center",
          },
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box sx={{ m: "0px auto" }}>
          {" "}
          <NImage src={images} alt={title} />
        </Box>
        <Box p={{ md: 2, xs: 0 }}>
          <Typography
            mt={1}
            sx={styleLineClamp(2)}
            component={"h3"}
            fontWeight={500}
            fontSize='18px'
          >
            {title}
          </Typography>
          <Typography
            mt={1}
            sx={styleLineClamp(3)}
            component={"p"}
            fontSize='16px'
          >
            {description}
          </Typography>
        </Box>
      </FlexBox>
    </Link>
  );
};

export default CardNewsBig;

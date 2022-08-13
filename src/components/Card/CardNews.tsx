import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import NewsBaseItem from "../../models/NewsBaseItem";
import styleLineClamp from "../../utils/styleLineClamp";
import FlexBox from "../FlexBox";

const CardNews: FC<NewsBaseItem> = ({ description, href, images, title }) => {
  return (
    <Link href={`/${href}`}>
      <FlexBox
        alignItems={"center"}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
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
            sx={styleLineClamp(2)}
            component={"p"}
            fontSize='16px'
          >
            {description}
          </Typography>
          <Button
            variant='text'
            color='secondary'
            sx={{
              textDecoration: "underline",
              paddingLeft: "0px",
            }}
          >
            Xem chi tiết
          </Button>
        </Box>
        <Box p={2}>
          {" "}
          <Image
            src={images}
            width='440px'
            alt={title}
            height={"264px"}
            className='imagesBig'
          />
        </Box>
      </FlexBox>
    </Link>
  );
};

export default CardNews;

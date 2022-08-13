import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import NewsBaseItem from "../../models/NewsBaseItem";
import styleLineClamp from "../../utils/styleLineClamp";

const CardNewsChild: FC<NewsBaseItem> = ({
  description,
  href,
  images,
  title,
}) => {
  return (
    <Link href={`/${href}`}>
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
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
          sx={styleLineClamp(4)}
          component={"p"}
          fontSize='16px'
        >
          {description}
        </Typography>
      </Box>
    </Link>
  );
};

export default CardNewsChild;

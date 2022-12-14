import { Card, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TinTucItem from "../../models/TinTucItem";
import { secondary } from "../../theme/themeColors";
import { calculateCreatedTime } from "../../utils/formatTime";
import styleLineClamp from "../../utils/styleLineClamp";

const CardSection2: FC<TinTucItem> = ({
  category,
  description,
  createdAt,
  avatar,
  title,
  slug,
}) => {
  // const viewCurrent = useMemo(() => {
  //   return new Intl.NumberFormat("en-US", {
  //     notation: "compact",
  //     compactDisplay: "short",
  //   }).format(view);
  // }, [view]);
  return (
    <Card>
      <Link href={`/${slug}`}>
        <Stack spacing={1} sx={{ cursor: "pointer", py: 1 }}>
          <LazyLoadImage
            alt={title}
            height={"100%"}
            style={{
              aspectRatio: "120/80",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={avatar} // use normal <img> attributes as props
            width={"100%"}
          />
          <Typography
            px={1}
            fontWeight={500}
            fontSize={16}
            component={"h2"}
            sx={{
              ...styleLineClamp(2),
              "&:hover": {
                color: secondary.main,
                transition: "0,3s",
              },
            }}
          >
            {title}
          </Typography>
          <Typography px={1} color='primary.400' sx={styleLineClamp(2)}>
            {description}
          </Typography>
          {/* 
          <Stack
            direction={"row"}
            justifyContent='space-between'
            spacing={2}
            px={1}
            pb={1}
          >
            <Typography color='primary.400'>{viewCurrent} lượt xem</Typography>
            <Typography color='primary.400'>
              {calculateCreatedTime(createdAt || "")}
            </Typography>
          </Stack> */}
        </Stack>
      </Link>
    </Card>
  );
};

export default CardSection2;

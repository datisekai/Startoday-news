import { Card, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TinTucItem from "../../models/TinTucItem";
import { calculateCreatedTime } from "../../utils/formatTime";
import styleLineClamp from "../../utils/styleLineClamp";

const CardSection2: FC<TinTucItem> = ({
  category,
  description,
  createdAt,
  avatar,
  title,
  view,
  slug,
}) => {
  const viewCurrent = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(view);
  }, [view]);
  return (
    <Card>
      <Link href={`/${slug}`}>
        <Stack spacing={1} sx={{ cursor: "pointer" }}>
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
            sx={styleLineClamp(2)}
          >
            {title}
          </Typography>

          <Stack
            direction={"row"}
            justifyContent='space-between'
            spacing={2}
            px={1}
            pb={1}
          >
            <Typography>{viewCurrent} lượt xem</Typography>
            <Typography>{calculateCreatedTime(createdAt || "")}</Typography>
          </Stack>
        </Stack>
      </Link>
    </Card>
  );
};

export default CardSection2;

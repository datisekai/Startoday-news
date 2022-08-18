import {
  Card,
  CardActionArea,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TinTucItem from "../../models/TinTucItem";
import styleLineClamp from "../../utils/styleLineClamp";

const CardSection1Big: FC<TinTucItem> = ({
  category,
  description,
  title,
  avatar,
  createdAt,
  slug,
}) => {
  return (
    <Card sx={{ position: "relative" }}>
      <LazyLoadImage
        alt={title}
        height={"100%"}
        src={avatar} // use normal <img> attributes as props
        width={"100%"}
        style={{
          objectFit: "cover",
          display: "block",
          objectPosition: "center",
          aspectRatio: "390/240",
        }}
      />
      <Stack
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          background:
            "linear-gradient(90deg,#202125,rgba(32,33,37,0) 50%,#202125)",
          p: 3,
          cursor: "pointer",
        }}
      >
        <Stack spacing={3} direction='row'>
          <Link href={`/danh-muc/${category.slug}`}>
            <Typography
              color='primary.200'
              fontSize={16}
              textTransform='capitalize'
              fontWeight={300}
            >
              {category.name}
            </Typography>
          </Link>
          <Typography
            color='primary.200'
            fontSize={16}
            textTransform='capitalize'
            fontWeight={300}
          >
            {dayjs(createdAt).format("MMMM D, YYYY")}
          </Typography>
        </Stack>
        <Link href={`/${slug}`}>
          <Typography
            color='primary.100'
            fontWeight={500}
            fontSize={{ md: 22, xs: 18 }}
            sx={styleLineClamp(2)}
          >
            {title}
          </Typography>
        </Link>
        <Link href={`/${slug}`}>
          <Typography
            color='primary.200'
            fontWeight={300}
            fontSize={16}
            sx={styleLineClamp(2)}
          >
            {description}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
};

export default CardSection1Big;

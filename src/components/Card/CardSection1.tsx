import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TinTucItem from "../../models/TinTucItem";
import { primary, secondary } from "../../theme/themeColors";
import styleLineClamp from "../../utils/styleLineClamp";

const CardSection1: FC<TinTucItem> = ({
  category,
  description,
  title,
  createdAt,
  avatar,
  slug,
}) => {
  return (
    <Card sx={{ height: "100%", width: "100%", display: "block" }}>
      <Grid container columnSpacing={1}>
        <Grid item xs={4}>
          <LazyLoadImage
            alt={title}
            height={"100%"}
            style={{
              aspectRatio: "127/92",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={avatar} // use normal <img> attributes as props
            width={"100%"}
          />
        </Grid>
        <Grid item xs={8}>
          <Link href={`/${slug}`}>
            <Stack spacing={1} py={1} sx={{ cursor: "pointer" }}>
              <Typography>{dayjs(createdAt).format("MMMM D, YYYY")}</Typography>
              <Typography
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
            </Stack>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardSection1;

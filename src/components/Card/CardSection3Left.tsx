import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TinTucItem from "../../models/TinTucItem";
import { secondary } from "../../theme/themeColors";
import { calculateCreatedTime } from "../../utils/formatTime";
import styleLineClamp from "../../utils/styleLineClamp";
import FlexBox from "../FlexBox";

const CardSection3Left: FC<TinTucItem> = ({
  title,
  description,
  createdAt,
  avatar,
  slug,
}) => {
  return (
    <Card>
      <FlexBox alignItems={"center"}>
        <Box
          sx={{
            width: {
              md: "60%",
              xs: "100%",
            },
            cursor: "pointer",
          }}
        >
          <Link href={`/${slug}`}>
            <Stack spacing={1} py={1} px={2}>
              <Typography
                fontWeight={500}
                fontSize={16}
                component='h2'
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
              <Typography
                color='primary.400'
                fontSize={14}
                sx={styleLineClamp(2)}
              >
                {description}
              </Typography>
              {/* <Stack direction={"row"} justifyContent='space-between' pb={1}>
                <Typography color='primary.400'>
                  {viewCurrent} lượt xem
                </Typography>
                <Typography color='primary.400'>
                  {calculateCreatedTime(createdAt || "")}
                </Typography>
              </Stack> */}
            </Stack>
          </Link>
        </Box>
        <Box
          sx={{
            width: {
              md: "40%",
              xs: "100%",
            },
          }}
        >
          <LazyLoadImage
            alt={title}
            height={"100%"}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
            src={avatar} // use normal <img> attributes as props
            width={"100%"}
          />
        </Box>
      </FlexBox>
    </Card>
  );
};

export default CardSection3Left;

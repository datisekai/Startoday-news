import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WidthLayout from "../../layouts/WidthLayout";
import FlexBox from "../FlexBox";
import LazyImage from "../LazyImage";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";

const TopHeader = () => {
  return (
    <WidthLayout>
      <FlexBox
        justifyContent={"space-between"}
        alignItems='center'
        height={28}
        sx={{
          display: {
            md: "flex",
            xs: "none",
          },
        }}
      >
        <Stack direction={"row"} spacing={0.5}>
          {[1, 2, 3, 4].map((item: any) => (
            <LazyLoadImage
              key={item}
              alt={"Logo"}
              height={"100%"}
              src={"https://static.mediacdn.vn/tuoitre/web_images/LogoTTTV.png"} // use normal <img> attributes as props
              width={"100%"}
              style={{
                objectFit: "cover",
                display: "block",
                width: 80,
                height: 26,
              }}
            />
          ))}
        </Stack>
        <Stack direction={"row"} spacing={1.5} alignItems='center'>
          <FlexBox alignItems={"center"}>
            <CallIcon fontSize='small' />
            <Typography ml={1}>Hotline: 0886249022</Typography>
          </FlexBox>
          <Typography fontSize={13}>Đặt báo</Typography>
          <Typography fontSize={13}>Quảng cáo</Typography>
          <Stack direction={"row"} spacing={0.5}>
            <Button
              size='small'
              variant='text'
              startIcon={<PersonIcon fontSize='small' />}
            >
              Đăng nhập
            </Button>
            <Button size='small' variant='text'>
              Đăng ký
            </Button>
          </Stack>
        </Stack>
      </FlexBox>
    </WidthLayout>
  );
};

export default TopHeader;
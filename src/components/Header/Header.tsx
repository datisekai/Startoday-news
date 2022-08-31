import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FlexBox from "../FlexBox";
import MenuIcon from "@mui/icons-material/Menu";
import WidthLayout from "../../layouts/WidthLayout";
import { primary } from "../../theme/themeColors";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Link from "next/link";
import MDrawer from "../MDrawer";
import TopHeader from "./TopHeader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderMobile from "./HeaderMobile";

const Header = () => {
  return (
    <>
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        <TopHeader />
        <Box
          sx={{ backgroundImage: "linear-gradient(to left,#9f041b,#e32)" }}
          height={48}
        >
          <WidthLayout>
            <FlexBox justifyContent={"space-between"} alignItems='center'>
              <LazyLoadImage
                alt={"Logo"}
                height={"100%"}
                src={
                  "https://static.mediacdn.vn/thumb_w/150/tuoitre/web_images/logo_tuoitrecuoi-01.png"
                } // use normal <img> attributes as props
                width={"100%"}
                style={{
                  objectFit: "cover",
                  display: "block",
                  width: 100,
                  height: 48,
                }}
              />
              <TextField
                id='outlined-basic'
                size='small'
                placeholder='Tìm kiếm tin tức'
                sx={{
                  width: "40%",
                  input: {
                    backgroundColor: "#fff",
                  },
                  div: {
                    borderRadius: 0,
                    bgcolor: "#fff",
                  },
                }}
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FlexBox>
          </WidthLayout>
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
          },
        }}
      >
        <HeaderMobile />
      </Box>
    </>

    // <Box
    //   sx={{
    //     borderBottom: `2px dotted ${primary[400]}`,
    //     bgcolor: primary.main,
    //   }}
    //   px={2}
    // >
    //   <FlexBox
    //     alignItems='center'
    //     justifyContent={"space-between"}
    //     height='70px'
    //   >
    //     <FlexBox alignItems={"center"}>
    //       <IconButton
    //         size='large'
    //         edge='start'
    //         color='inherit'
    //         aria-label='menu'
    //         sx={{ mr: 2 }}
    //         onClick={() => setNavbar(true)}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Box id='separate' sx={{ mr: 2 }}></Box>
    //       <IconButton
    //         size='large'
    //         edge='start'
    //         color='inherit'
    //         aria-label='menu'
    //       >
    //         <SearchIcon />
    //       </IconButton>
    //       <IconButton
    //         size='large'
    //         edge='start'
    //         color='inherit'
    //         aria-label='menu'
    //       >
    //         <NotificationsNoneIcon />
    //       </IconButton>
    //     </FlexBox>
    //     <Box>
    //       <Link href='/'>
    //         <Typography
    //           sx={{
    //             "&:hover": {
    //               cursor: "pointer",
    //             },
    //           }}
    //           fontSize={"24px"}
    //           fontWeight={600}
    //         >
    //           StarToday
    //         </Typography>
    //       </Link>
    //     </Box>
    //     <Stack
    //       direction={"row"}
    //       spacing={2}
    //       sx={{
    //         display: {
    //           md: "flex",
    //           xs: "none",
    //         },
    //       }}
    //     >
    //       <Link href='/dang-nhap'>
    //         <Button
    //           variant='contained'
    //           color='primary'
    //           startIcon={<PersonOutlineIcon />}
    //         >
    //           Đăng nhập
    //         </Button>
    //       </Link>
    //     </Stack>
    //   </FlexBox>
    //   <MDrawer open={navbar} handleClose={() => setNavbar(false)} />
    // </Box>
  );
};

export default Header;

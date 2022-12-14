import { Box, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import MDrawer from "../MDrawer";
import SearchMobile from "./SearchMobile";
import Link from "next/link";

const HeaderMobile = () => {
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <>
      <Box sx={{ height: 47 }}></Box>
      <Stack
        direction={"row"}
        px={2}
        justifyContent='space-between'
        py={1}
        alignItems='center'
        height={47}
        sx={{
          position: "fixed",
          top: 0,
          bgcolor: "#fff",
          zIndex: 999,
          left: 0,
          right: 0,
        }}
      >
        <Link href='/'>
          <LazyLoadImage
            alt={"Logo"}
            height={"100%"}
            src={"/images/logo9.png"} // use normal <img> attributes as props
            width={"100%"}
            style={{
              display: "block",
              aspectRatio: "274/59",
              width: 105,
            }}
          />
        </Link>
        <Stack direction='row' spacing={0}>
          <IconButton>
            <YouTubeIcon fontSize='small' />
          </IconButton>
          <IconButton>
            <FacebookIcon fontSize='small' />
          </IconButton>
          <IconButton>
            <CallIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={() => setSearch(!search)}>
            <SearchIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={() => setNavbar(true)}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </Stack>
      <MDrawer open={navbar} handleClose={() => setNavbar(false)} />
      <SearchMobile open={search} handleClose={() => setSearch(false)} />
    </>
  );
};

export default HeaderMobile;

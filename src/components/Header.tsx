import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import FlexBox from "./FlexBox";
import MenuIcon from "@mui/icons-material/Menu";
import WidthLayout from "../layouts/WidthLayout";
import { primary } from "../theme/themeColors";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      sx={{
        borderBottom: `2px dotted ${primary[100]}`,
      }}
      px={2}
    >
      <FlexBox
        alignItems='center'
        justifyContent={"space-between"}
        height='70px'
      >
        <FlexBox alignItems={"center"}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box id='separate' sx={{ mr: 2 }}></Box>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
          >
            <NotificationsNoneIcon />
          </IconButton>
        </FlexBox>
        <Box>
          <Link href='/'>
            <Typography
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              fontSize={"24px"}
              fontWeight={600}
            >
              StarToday
            </Typography>
          </Link>
        </Box>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            display: {
              md: "flex",
              xs: "none",
            },
          }}
        >
          <Button
            variant='contained'
            color='primary'
            startIcon={<PersonOutlineIcon />}
          >
            Đăng nhập
          </Button>
          <Button
            variant='contained'
            sx={{ border: `1px solid ${primary[200]}` }}
            color='info'
          >
            Đăng ký
          </Button>
        </Stack>
      </FlexBox>
    </Box>
  );
};

export default Header;

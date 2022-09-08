import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WidthLayout from "../../layouts/WidthLayout";
import FlexBox from "../FlexBox";
import HeaderMobile from "./HeaderMobile";
import TopHeader from "./TopHeader";

const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    router.push(`/tim-kiem?keywords=${search}`);
    setSearch("");
  };

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
          height={56}
        >
          <WidthLayout>
            <FlexBox justifyContent={"space-between"} alignItems='center'>
              <Link href='/'>
                <LazyLoadImage
                  alt={"Logo"}
                  height={"100%"}
                  src={"/images/logo7.png"} // use normal <img> attributes as props
                  width={"100%"}
                  style={{
                    display: "block",
                    width: 140,
                    height: 55,
                  }}
                />
              </Link>
              <TextField
                id='outlined-basic'
                size='small'
                placeholder='Tìm kiếm tin tức'
                value={search}
                onKeyUp={(e: any) => {
                  if (e.keyCode === 13) {
                    handleSearch();
                  }
                }}
                onChange={(e: any) => setSearch(e.target.value)}
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
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
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

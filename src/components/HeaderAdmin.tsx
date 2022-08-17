import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { primary } from "../theme/themeColors";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slices/AuthSlice";
import { useRouter } from "next/router";

const HeaderAdmin = ({ handleSidebar }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/dang-nhap");
  };
  return (
    <Stack
      direction={"row"}
      justifyContent='space-between'
      p={{ md: 2, xs: 0 }}
      mt={2}
    >
      <IconButton
        onClick={() => handleSidebar(true)}
        sx={{ display: { md: "none", xs: "block" } }}
      >
        <WidgetsIcon />
      </IconButton>
      <Box width={"50%"} sx={{ display: { md: "block", xs: "none" } }}>
        <TextField
          fullWidth
          color='secondary'
          label={"Tìm kiếm"}
          variant='outlined'
          sx={{
            ".css-66s059-MuiInputBase-input-MuiOutlinedInput-input": {
              backgroundColor: primary[100],
            },
          }}
        />
      </Box>
      <Stack direction={"row"} spacing={1}>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </IconButton>

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default HeaderAdmin;

import { Avatar, Box, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { primary } from "../theme/themeColors";
import WidgetsIcon from "@mui/icons-material/Widgets";

const HeaderAdmin = ({ handleSidebar }: any) => {
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
        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      </Stack>
    </Stack>
  );
};

export default HeaderAdmin;

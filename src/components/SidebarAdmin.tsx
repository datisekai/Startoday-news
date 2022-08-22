import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import SidebarItem from "../Item/SidebarItem";
import { primary } from "../theme/themeColors";
import sidebar, { sidebarItem } from "./data/sidebar";

const SidebarAdmin = ({ display }: any) => {
  return (
    <Box
      width={{ md: 250, xs: display ? 250 : 0 }}
      sx={{
        position: {
          md: "inherit",
          xs: "fixed",
        },
        bottom: 0,
        top: 0,
        left: 0,
        zIndex: 1000,
        bgcolor: primary[100],
        boxShadow: {
          md: "none",
          xs: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        },
        display: { md: "block", xs: display ? "block" : "none" },
        transition: "width 1s",
      }}
    >
      <Link href='/'>
        <Typography
          fontWeight={600}
          fontSize={18}
          mt={4}
          textAlign='center'
          color='secondary'
        >
          StarToday
        </Typography>
      </Link>
      <Stack spacing={2} mt={4}>
        {sidebar.map((item: sidebarItem, index: number) => (
          <SidebarItem {...item} key={index} />
        ))}
      </Stack>
    </Box>
  );
};

export default SidebarAdmin;

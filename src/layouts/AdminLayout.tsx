import { Box } from "@mui/material";
import React, { FC, useState } from "react";
import FlexBox from "../components/FlexBox";
import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Props from "../models/Props";
import { primary } from "../theme/themeColors";

const AdminLayout: FC<Props> = ({ children }) => {
  const [display, setDisplay] = useState(false);

  const handleDisplay = (value: boolean) => {
    setDisplay(value);
  };
  return (
    <>
      <FlexBox>
        <SidebarAdmin display={display} />
        <Box sx={{ flex: 1, bgcolor: primary[200], minHeight: "100vh", px: 2 }}>
          <HeaderAdmin handleSidebar={handleDisplay} />
          <Box>{children}</Box>
        </Box>
        {display && (
          <div onClick={() => handleDisplay(false)}>
            <Box
              sx={{
                display: { md: "none", xs: "block" },
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.616)",
              }}
            ></Box>
          </div>
        )}
      </FlexBox>
    </>
  );
};

export default AdminLayout;

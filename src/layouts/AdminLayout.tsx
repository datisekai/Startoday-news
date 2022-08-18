import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBox from "../components/FlexBox";
import HeaderAdmin from "../components/HeaderAdmin";
import { IsBrowser } from "../components/IsBrowser";
import Spinner from "../components/Loading/Spinner";
import SidebarAdmin from "../components/SidebarAdmin";
import Props from "../models/Props";
import { setAuth } from "../redux/slices/AuthSlice";
import { RootState } from "../redux/store";
import { primary } from "../theme/themeColors";

const AdminLayout: FC<Props> = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage && localStorage.getItem("info")) {
      const info = JSON.parse(localStorage.getItem("info") || "");
      dispatch(setAuth(info));
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      router.push("/dang-nhap");
    }
  }, [token, user]);

  if (!token || !user) {
    return <Spinner />;
  }

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

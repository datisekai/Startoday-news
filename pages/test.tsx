import { Box } from "@mui/material";
import React from "react";
import MainLayout from "../src/layouts/MainLayout";

const test = () => {
  return (
    <MainLayout>
      <Box className='layout'>
        {[0, 1, 2, 3, 4, 5].map((item: any) => (
          <Box key={item} className='layout-item'>
            <img
              src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt=''
            />
          </Box>
        ))}
      </Box>
    </MainLayout>
  );
};

export default test;

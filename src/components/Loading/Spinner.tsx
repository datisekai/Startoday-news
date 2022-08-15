import { CircularProgress, Container, Stack } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
        }}
        justifyContent='center'
        alignItems='center'
      >
        <CircularProgress color='secondary' />
      </Stack>
    </Container>
  );
};

export default Spinner;

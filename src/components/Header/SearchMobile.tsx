import { Box, TextField } from "@mui/material";
import React, { FC } from "react";

interface SearchMobileProps {
  open: boolean;
  handleClose: () => void;
}

const SearchMobile: FC<SearchMobileProps> = ({ open, handleClose }) => {
  return (
    <Box>
      <div onClick={handleClose}>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 11,
            bgcolor: "rgba(0,0,0,0.616)",
            display: open ? "block" : "none",
          }}
        ></Box>
      </div>
      <Box
        sx={{
          position: "fixed",
          zIndex: 12,
          bgcolor: "#fff",
          left: 0,
          right: 0,
          top: 47,
          transform: open ? "translateY(0)" : "translateY(-200px)",
          transition: "0.2s",
        }}
      >
        <TextField
          id='standard-basic'
          size='medium'
          sx={{
            borderTop: "1px solid #ccc",
            input: {
              px: 2,
              py: 1,
            },
          }}
          fullWidth
          placeholder='Tìm kiếm tin tức'
          variant='standard'
        />
      </Box>
    </Box>
  );
};

export default SearchMobile;

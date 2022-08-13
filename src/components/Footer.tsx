import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import CategoryItem from "../models/CategoryItem";
import { primary } from "../theme/themeColors";
import EmailIcon from "@mui/icons-material/Email";
import ApprovalIcon from "@mui/icons-material/Approval";
import Link from "next/link";
import slugify from "slugify";
import { Stack } from "@mui/system";
import categoryAPI from "../actions/category";

const Footer = () => {
  const { data, isLoading } = useQuery(["danh-muc"], categoryAPI.getCategory);
  return (
    <Box>
      <Grid
        container
        sx={{ borderTop: `5px solid ${primary[100]}`, px: 2, py: 3 }}
      >
        <Grid item xs={12} md={8}>
          <Grid
            container
            spacing={1}
            sx={{
              borderRight: {
                md: `1px dotted ${primary[200]}`,
                xs: "none",
              },
            }}
          >
            {data &&
              data.data.data.map((item: CategoryItem, index: number) => (
                <Grid item xs={6} md={3} key={index}>
                  <Link href={`/danh-muc/${slugify(item.name)}`}>
                    <Button
                      variant='text'
                      sx={{
                        color: primary[200],
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            px: {
              md: 2,
              xs: 0,
            },
            mt: {
              md: 0,
              xs: 2,
            },
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography fontWeight={600} fontSize={18}>
                Liên hệ
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Button variant='text' startIcon={<EmailIcon />}>
                    Tòa soạn
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant='text' startIcon={<ApprovalIcon />}>
                    Quảng cáo
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ borderTop: `2px dotted ${primary[200]}`, py: 2, px: 2 }}
        alignItems='center'
      >
        <Typography fontSize={16}>Báo điện tử</Typography>
        <Typography fontWeight={600} fontSize={18}>
          StarToday
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;

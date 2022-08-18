import { Box, Button, Stack, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import slugify from "slugify";
import categoryAPI from "../actions/category";
import DanhMucItem from "../models/DanhMucItem";
import { primary } from "../theme/themeColors";
import FlexBox from "./FlexBox";

const Categories = () => {
  const options: any = { weekday: "long" };
  const date = new Date();

  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading } = useQuery(["danh-muc"], categoryAPI.getCategory);

  return (
    <FlexBox
      alignItems={"center"}
      px={2}
      py={1}
      sx={{
        display: {
          md: "flex",
          xs: "none",
        },
      }}
    >
      <Box mt={1} sx={{ textAlign: "center" }}>
        <Typography component={"p"} fontWeight='600' fontSize={"15px"}>
          {new Intl.DateTimeFormat("en-US", options).format(date)}
        </Typography>{" "}
        <Typography
          whiteSpace={"nowrap"}
          textOverflow='ellipsis'
          component={"p"}
        >{`${date.getDate()}, ${new Intl.DateTimeFormat(
          "en-US",
          options
        ).format(date)}, ${date.getFullYear()}`}</Typography>
      </Box>
      <Stack direction={"row"} pl={2} flexWrap='wrap'>
        <Link href={`/`}>
          <Button
            size='large'
            variant='text'
            sx={{
              color: !id ? primary.main : primary[500],
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}
          >
            Tất cả
          </Button>
        </Link>
        {data &&
          data.map((item: DanhMucItem, index: number) => (
            <Link key={index} href={`/danh-muc/${item.slug}`}>
              <Button
                size='large'
                variant='text'
                sx={{
                  color: id === item.slug ? primary.main : primary[500],
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </Button>
            </Link>
          ))}
      </Stack>
    </FlexBox>
  );
};

export default Categories;

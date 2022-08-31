import { Box, Button, Stack, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import slugify from "slugify";
import categoryAPI from "../actions/category";
import useChangeWidth from "../hooks/useChangWidth";
import useScrollY from "../hooks/useScrollY";
import WidthLayout from "../layouts/WidthLayout";
import DanhMucItem from "../models/DanhMucItem";
import { primary } from "../theme/themeColors";
import FlexBox from "./FlexBox";

const Categories = () => {
  const options: any = { weekday: "long" };
  const date = new Date();

  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading } = useQuery(["danh-muc"], categoryAPI.getCategory);

  const scrollY = useScrollY();
  const width = useChangeWidth();

  return (
    <Box
      pt={1}
      sx={{
        position: scrollY > 100 && width > 768 ? "fixed" : "relative",
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: "#fff",
        zIndex: 10,
      }}
    >
      <WidthLayout>
        <Stack
          direction={"row"}
          spacing={1}
          overflow='scroll'
          flexWrap={"nowrap"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
            borderBottom: `2px solid ${primary.main}`,
          }}
        >
          <Link href={`/`}>
            <Button
              size='small'
              variant='text'
              sx={{
                color: !id ? primary.main : primary[700],
                fontWeight: "500",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              Tất cả
            </Button>
          </Link>
          {data &&
            data.map((item: DanhMucItem, index: number) => (
              <Link key={index} href={`/danh-muc/${item.slug}`}>
                <Button
                  size='small'
                  variant='text'
                  sx={{
                    color: id === item.slug ? primary.main : primary[700],
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
        </Stack>
      </WidthLayout>
    </Box>
    // <FlexBox
    //   alignItems={"center"}
    //   px={2}
    //   py={1}
    //   sx={{
    //     display: {
    //       md: "flex",
    //       xs: "none",
    //     },
    //   }}
    // >
    //   <Box mt={1} sx={{ textAlign: "center" }}>
    //     <Typography component={"p"} fontWeight='600' fontSize={"15px"}>
    //       {new Intl.DateTimeFormat("en-US", options).format(date)}
    //     </Typography>{" "}
    //     <Typography
    //       whiteSpace={"nowrap"}
    //       textOverflow='ellipsis'
    //       component={"p"}
    //     >
    //       {dayjs().format("MMMM D, YYYY")}
    //     </Typography>
    //   </Box>
    //   <Stack direction={"row"} pl={2} flexWrap='wrap'>
    //     <Link href={`/`}>
    //       <Button
    //         size='large'
    //         variant='text'
    //         sx={{
    //           color: !id ? primary.main : primary[500],
    //           fontWeight: "500",
    //           whiteSpace: "nowrap",
    //         }}
    //       >
    //         Tất cả
    //       </Button>
    //     </Link>
    //     {data &&
    //       data.map((item: DanhMucItem, index: number) => (
    //         <Link key={index} href={`/danh-muc/${item.slug}`}>
    //           <Button
    //             size='large'
    //             variant='text'
    //             sx={{
    //               color: id === item.slug ? primary.main : primary[500],
    //               fontWeight: "500",
    //               whiteSpace: "nowrap",
    //             }}
    //           >
    //             {item.name}
    //           </Button>
    //         </Link>
    //       ))}
    //   </Stack>
    // </FlexBox>
  );
};

export default Categories;

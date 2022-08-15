import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import baseAPI from "../src/actions/base";
import CardNews from "../src/components/Card/CardNews";
import CardNewsSkeleton from "../src/components/Skeleton/CardNewsSkeleton";
import NewsDetailSkeleton from "../src/components/Skeleton/NewsDetailSkeleton";
import { API_URL } from "../src/config";
import MainLayout from "../src/layouts/MainLayout";
import WidthLayout from "../src/layouts/WidthLayout";
import NewsBaseItem from "../src/models/NewsBaseItem";

const NewsDetail = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const { data, isLoading } = useQuery(["chi-tiet-news", id], () =>
    baseAPI.getDetail(id)
  );

  return (
    <MainLayout>
      {/* <Grid container spacing={2} pb={4}>
        <Grid item xs={12} md={8}>
          {!isLoading && (
            <Box px={2} pl={{ md: 5, xs: 2 }}>
              <Typography
                textAlign={"center"}
                fontWeight={500}
                fontSize={22}
                mt={2}
                mb={2}
              >
                {data?.data.data.title}
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={18}
                textAlign='justify'
                mb={1}
                lineHeight={1.5}
              >
                {data?.data.data.description}
              </Typography>
              <div
                dangerouslySetInnerHTML={{ __html: data?.data.data.html }}
              ></div>
            </Box>
          )}
          {isLoading && <NewsDetailSkeleton />}
        </Grid>
        <Grid item xs={12} md={4}>
          {!isLoading &&
            data?.data.data.recommends.map(
              (item: NewsBaseItem, index: number) => (
                <Box pl={2} key={index}>
                  <CardNews {...item} />
                </Box>
              )
            )}
          {isLoading && (
            <Box pl={2}>
              <CardNewsSkeleton />
              <CardNewsSkeleton />
              <CardNewsSkeleton />
              <CardNewsSkeleton />
            </Box>
          )}
        </Grid>
      </Grid> */}
    </MainLayout>
  );
};

export default NewsDetail;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = params?.id as string;
//   const data = await axios.get(`${API_URL}/co-ban/chi-tiet?id=${id}`);

//   return {
//     props: {
//       data: data.data.data,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

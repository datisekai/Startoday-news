import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import CardNews from "../src/components/Card/CardNews";
import { API_URL } from "../src/config";
import MainLayout from "../src/layouts/MainLayout";
import WidthLayout from "../src/layouts/WidthLayout";
import NewsBaseItem from "../src/models/NewsBaseItem";

const NewsDetail = ({ data }: any) => {
  return (
    <MainLayout>
      {data && (
        <Grid container spacing={2} pb={4}>
          <Grid item xs={12} md={8}>
            <Box px={{ md: 5, xs: 2 }}>
              <Typography
                textAlign={"center"}
                fontWeight={500}
                fontSize={22}
                mt={2}
                mb={2}
              >
                {data.title}
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={18}
                textAlign='justify'
                mb={1}
                lineHeight={1.5}
              >
                {data.description}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            {data.recommends.map((item: NewsBaseItem, index: number) => (
              <Box pl={2}>
                {" "}
                <CardNews key={index} {...item} />
              </Box>
            ))}
          </Grid>
        </Grid>
      )}
    </MainLayout>
  );
};

export default NewsDetail;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const data = await axios.get(`${API_URL}/co-ban/chi-tiet?id=${id}`);

  return {
    props: {
      data: data.data.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

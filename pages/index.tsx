import { Box, Grid, Pagination, Typography } from "@mui/material";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import baseAPI from "../src/actions/base";
import axiosClient from "../src/axios/axiosClient";
import CardNews from "../src/components/Card/CardNews";
import CardNewsBig from "../src/components/Card/CardNewsBig";
import CardNewsChild from "../src/components/Card/CardNewsChild";
import { API_URL } from "../src/config";
import MainLayout from "../src/layouts/MainLayout";
import NewsBaseItem from "../src/models/NewsBaseItem";
import { secondary } from "../src/theme/themeColors";
import styles from "../styles/Home.module.css";

interface HomeProps {
  chinhTri: NewsBaseItem[];
}

const Home: NextPage<HomeProps> = ({ chinhTri }) => {
  return (
    <>
      <MainLayout>
        <Grid container px={2} py={3} spacing={2}>
          <Grid item xs={12} md={12} lg={8}>
            <Typography
              fontSize={22}
              fontWeight={600}
              textTransform={"capitalize"}
              mb={2}
              sx={{
                "&::after": {
                  content: '""',
                  width: "60px",
                  height: "5px",
                  display: "block",
                  bgcolor: secondary.main,
                  top: 0,
                  borderRadius: "10px",
                },
              }}
            >
              Thời sự
            </Typography>
            <CardNewsBig {...chinhTri[0]} />
            <Grid container spacing={2} mt={1}>
              {chinhTri.map((item: NewsBaseItem, index: number) => {
                if (index > 0 && index <= chinhTri.length / 2 + 3) {
                  return (
                    <Grid item key={index} xs={12} md={4}>
                      <CardNewsChild {...item} />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {chinhTri.map((item: NewsBaseItem, index: number) => {
              if (index > chinhTri.length / 2 + 3) {
                return <CardNews key={index} {...item} />;
              }
            })}
          </Grid>
        </Grid>
        <Pagination
          sx={{
            pb: "50px",
            mt: 2,
            ".css-wjh20t-MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
          siblingCount={-1}
          size='large'
          count={10}
          color='secondary'
          shape='rounded'
        />
      </MainLayout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const dataChinhTri = await baseAPI.getData("thoi-su/chinh-tri");

  //https://startoday123.herokuapp.com
  return {
    props: {
      chinhTri: dataChinhTri,
    },
    revalidate: 60,
  };
};

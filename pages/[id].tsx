import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useCallback } from "react";
import newsAPI from "../src/actions/news";
import Section4 from "../src/components/sections/Section4";
import MainLayout from "../src/layouts/MainLayout";
import WidthLayout from "../src/layouts/WidthLayout";
import WidthLayout2 from "../src/layouts/WidthLayout2";
import TinTucItem from "../src/models/TinTucItem";

interface NewsDetailProps {
  data: TinTucItem;
  similars: TinTucItem[];
}

const NewsDetail: FC<NewsDetailProps> = ({ data, similars }) => {
  return (
    <MainLayout>
      <WidthLayout2>
        <Stack spacing={2}>
          <Stack justifyContent={"space-between"} direction='row'>
            <Typography
              color='primary.600'
              fontSize={16}
              textTransform='capitalize'
              fontWeight={300}
            >
              {data.category.name}
            </Typography>
            <Typography
              color='primary.600'
              fontSize={16}
              textTransform='capitalize'
              fontWeight={300}
            >
              {dayjs(data.createdAt).format("MMMM D, YYYY")}
            </Typography>
          </Stack>
          <Typography fontWeight={500} fontSize={{ md: 28, xs: 24 }}>
            {data.title}
          </Typography>
          <Typography sx={{ lineHeight: 2, fontSize: 18 }}>
            {data.description}
          </Typography>
          <Box sx={{ lineHeight: 2, fontSize: 18 }}>
            <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
          </Box>
          <Box>
            <Section4 data={similars} />
          </Box>
        </Stack>

        <Box pb={10}></Box>
      </WidthLayout2>
    </MainLayout>
  );
};

export default NewsDetail;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const data = await newsAPI.getDetailNews(id);
  const similars = await newsAPI.getSimilarNews(data.category._id);

  return {
    props: {
      data: data,
      similars: similars.filter(
        (item: TinTucItem) => item._id !== data._id && item.status === true
      ),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await newsAPI.getNews();

  const paths = news.map((item: TinTucItem) => ({
    params: { id: item.slug },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

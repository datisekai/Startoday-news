import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import newsAPI from "../src/actions/news";
import CommentFacebook from "../src/components/CommentFacebook";
import LikeShareFacebook from "../src/components/LikeShareFacebook";
import Meta from "../src/components/Meta";
import Section4 from "../src/components/sections/Section4";
import Title from "../src/components/Title";
import MainLayout from "../src/layouts/MainLayout";
import WidthLayout from "../src/layouts/WidthLayout";
import WidthLayout2 from "../src/layouts/WidthLayout2";
import TinTucItem from "../src/models/TinTucItem";

interface NewsDetailProps {
  data: TinTucItem;
  similars: TinTucItem[];
}

const NewsDetail: FC<NewsDetailProps> = ({ data, similars }) => {
  useEffect(() => {
    const increase = async () => {
      const res = await newsAPI.increaseView(data.slug || "");
    };
    increase();
  }, []);

  const router = useRouter();

  return (
    <>
      <Meta
        image={
          data.avatar ||
          "https://images.unsplash.com/photo-1586339949216-35c2747cc36d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        }
        description={data.description}
        title={data.title}
        adsense={process.env.NEXT_PUBLIC_ADVENSE_URL}
      />
      <MainLayout>
        <Title title={data.title} />
        <WidthLayout>
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
            <Typography
              fontWeight={500}
              component='h1'
              fontSize={{ md: 28, xs: 24 }}
            >
              {data.title}
            </Typography>
            <Typography sx={{ lineHeight: 2, fontSize: 18 }}>
              {data.description}
            </Typography>
            <Box sx={{ lineHeight: 2, fontSize: 18 }}>
              <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
            </Box>
            {/* <LikeShareFacebook href={router.asPath} />
            <CommentFacebook href={router.asPath} /> */}
            <Box>
              <Section4 data={similars} />
            </Box>
          </Stack>

          <Box pb={10}></Box>
        </WidthLayout>
      </MainLayout>
    </>
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
      similars: similars
        .filter(
          (item: TinTucItem) => item._id !== data._id && item.status === true
        )
        .slice(0, 5),
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

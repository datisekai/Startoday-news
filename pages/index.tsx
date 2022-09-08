import { Box } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import categoryAPI from "../src/actions/category";
import newsAPI from "../src/actions/news";
import CommentFacebook from "../src/components/CommentFacebook";
import Meta from "../src/components/Meta";
import Section1 from "../src/components/sections/Section1";
import Section2 from "../src/components/sections/Section2";
import Section3 from "../src/components/sections/Section3";
import Title from "../src/components/Title";
import MainLayout from "../src/layouts/MainLayout";
import WidthLayout from "../src/layouts/WidthLayout";
import DanhMucItem from "../src/models/DanhMucItem";
import TinTucItem from "../src/models/TinTucItem";

interface HomeProps {
  data: TinTucItem[];
  categories: DanhMucItem[];
}

const Home: NextPage<HomeProps> = ({ data, categories }) => {
  const section2 = useMemo(() => {
    const views = data.sort((a: any, b: any) => b.view - a.view);

    return views.slice(0, 5) || [];
  }, [data]);

  const section3 = useMemo(() => {
    const randomCategory = () => {
      const i = Math.floor(Math.random() * categories.length);

      return categories[i];
    };

    const getRandomCategory: any = () => {
      const category1 = randomCategory();
      const category2 = randomCategory();
      if (category1._id === category2._id) {
        return getRandomCategory();
      }
      return { category1, category2 };
    };

    const { category1, category2 } = getRandomCategory();

    const news1 = data.filter(
      (item: TinTucItem) => item.category._id === category1._id
    );
    const news2 = data.filter(
      (item: TinTucItem) => item.category._id === category2._id
    );

    return {
      news1: {
        data: news1,
        category: category1,
      },
      news2: {
        data: news2,
        category: category2,
      },
    };
  }, [data]);

  return (
    <>
      <Meta
        description='Thông tin nhanh và chính xác được cập nhật hàng giờ. Đọc báo tin tức online Việt Nam'
        image='https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
        title='Startoday - Báo tiếng Việt nhiều người xem nhất'
        adsense={process.env.NEXT_PUBLIC_ADVENSE_URL}
      />
      <MainLayout>
        <WidthLayout>
          <Section1 data={data} />
          <Section2 data={section2} />
          <Section3 data={section3} />
          <Box mt={5}>
            <CommentFacebook href={"/startoday-home"} />
          </Box>
          <Box pb={10}></Box>
        </WidthLayout>
      </MainLayout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const news = await newsAPI.getNews();
  const categories = await categoryAPI.getCategory();

  return {
    props: {
      data: news.filter((item: TinTucItem) => item.status === true),
      categories,
    },
    revalidate: 60,
  };
};

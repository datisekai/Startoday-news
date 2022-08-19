import { Box } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useMemo } from "react";
import slugify from "slugify";
import categoryAPI from "../../src/actions/category";
import newsAPI from "../../src/actions/news";
import Meta from "../../src/components/Meta";
import Section1 from "../../src/components/sections/Section1";
import Section2 from "../../src/components/sections/Section2";
import Title from "../../src/components/Title";
import MainLayout from "../../src/layouts/MainLayout";
import WidthLayout from "../../src/layouts/WidthLayout";
import DanhMucItem from "../../src/models/DanhMucItem";
import TinTucItem from "../../src/models/TinTucItem";

interface DanhMucProps {
  data: TinTucItem[];
}

const DanhMuc: FC<DanhMucProps> = ({ data }) => {
  const section2 = useMemo(() => {
    const views = data.sort((a: any, b: any) => b.view - a.view);

    return views.slice(0, 5) || [];
  }, [data]);

  return (
    <>
      <Meta
        description='Danh mục'
        title='Startoday - Danh mục'
        image='https://images.unsplash.com/photo-1586339949216-35c2747cc36d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        advense={process.env.NEXT_PUBLIC_ADVENSE_URL}
      />
      <MainLayout>
        <Title title={"Danh mục"} />
        <WidthLayout>
          <Section1 data={data} />
          <Section2 data={section2} />
          <Box pb={10}></Box>
        </WidthLayout>
      </MainLayout>
    </>
  );
};

export default DanhMuc;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const news = await newsAPI.getNews();

  const news2 = news.filter((item: TinTucItem) => item.status === true);

  const newsData = news2.filter(
    (item: TinTucItem) => item.category.slug === id
  );

  return {
    props: {
      data: newsData,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await categoryAPI.getCategory();

  const paths = categories.map((item: DanhMucItem) => ({
    params: { id: item.slug },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

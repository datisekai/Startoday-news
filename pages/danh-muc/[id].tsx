import { Grid, Pagination, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import slugify from "slugify";
import baseAPI from "../../src/actions/base";
import categoryAPI from "../../src/actions/category";
import CardNews from "../../src/components/Card/CardNews";
import CardNewsBig from "../../src/components/Card/CardNewsBig";
import CardNewsChild from "../../src/components/Card/CardNewsChild";
import MainLayout from "../../src/layouts/MainLayout";
import CategoryItem from "../../src/models/CategoryItem";
import NewsBaseItem from "../../src/models/NewsBaseItem";
import { secondary } from "../../src/theme/themeColors";
import handleOnTop from "../../src/utils/handleOnTop";

const DanhMuc = ({ data }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const categories: any = queryClient.getQueryData(["danh-muc"]);

  const { id } = router.query;

  useEffect(() => {
    handleOnTop();
  }, [id]);

  const title = useMemo(() => {
    let initial = "Thời sự";
    if (categories) {
      const currentCategory = categories.data.data.find(
        (item: CategoryItem, index: number) =>
          slugify(item.name.toLowerCase()) === id
      );
      if (currentCategory) {
        initial = currentCategory.name;
      }
    }
    return initial;
  }, [id, categories]);

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
              {title}
            </Typography>
            <CardNewsBig {...data[0]} />
            <Grid container spacing={2} mt={1}>
              {data.map((item: NewsBaseItem, index: number) => {
                if (index > 0 && index <= data.length / 2 + 3) {
                  console.log(item.href);
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
            {data.map((item: NewsBaseItem, index: number) => {
              if (index > data.length / 2 + 3) {
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

export default DanhMuc;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let data: any;
  const slug = params?.id as string;
  switch (slug) {
    case "thoi-su":
      data = await baseAPI.getData("thoi-su/chinh-tri");
      break;
    case "the-gioi":
      data = await baseAPI.getData("the-gioi/tu-lieu");
      break;
    case "kinh-doanh":
      data = await baseAPI.getData("kinh-doanh/quoc-te");
      break;
    case "khoa-hoc":
      data = await baseAPI.getData("khoa-hoc/tin-tuc");
      break;
    case "giai-tri":
      data = await baseAPI.getData("giai-tri/gioi-sao");
      break;
    case "the-thao":
      data = await baseAPI.getData("bong-da");
      break;
    default:
      data = await baseAPI.getData("thoi-su/chinh-tri");
      break;
  }
  return {
    props: {
      data: data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await categoryAPI.getCategory();

  const paths = categories
    ? categories.data.data.map((item: CategoryItem, index: number) => ({
        params: { id: slugify(item.name.toLowerCase()) },
      }))
    : [];

  return {
    paths: paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
};

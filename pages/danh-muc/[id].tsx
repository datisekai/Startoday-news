import { GetStaticPaths, GetStaticProps } from "next";
import slugify from "slugify";
import categoryAPI from "../../src/actions/category";
import MainLayout from "../../src/layouts/MainLayout";

const DanhMuc = () => {
  // const router = useRouter();
  // const queryClient = useQueryClient();
  // const categories: any = queryClient.getQueryData(["danh-muc"]);

  // const { id } = router.query;

  // useEffect(() => {
  //   handleOnTop();
  // }, [id]);

  // const title = useMemo(() => {
  //   let initial = "Thời sự";
  //   if (categories) {
  //     const currentCategory = categories.data.data.find(
  //       (item: CategoryItem, index: number) =>
  //         slugify(item.name.toLowerCase()) === id
  //     );
  //     if (currentCategory) {
  //       initial = currentCategory.name;
  //     }
  //   }
  //   return initial;
  // }, [id, categories]);

  return (
    <>
      <MainLayout>
        abc
        {/* <Grid container px={2} py={3} spacing={2}>
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
        /> */}
        Detail
      </MainLayout>
    </>
  );
};

export default DanhMuc;

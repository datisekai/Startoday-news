import { Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import statisticAPI from "../../src/actions/statistic";
import CardStatistic from "../../src/components/Card/CardStatistic";
import FlexBox from "../../src/components/FlexBox";
import Spinner from "../../src/components/Loading/Spinner";
import AdminLayout from "../../src/layouts/AdminLayout";

const Admin = () => {
  const { data, isLoading } = useQuery(["thong-ke"], statisticAPI.dashboard);
  console.log(data);
  return (
    <AdminLayout>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <FlexBox justifyContent={"space-between"} alignItems='center' mt={2}>
            <Typography fontWeight={500} fontSize={18}>
              Thống kê
            </Typography>
            <Link href='/'>
              <Button variant='contained' color='secondary'>
                Trở về Home
              </Button>
            </Link>
          </FlexBox>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <CardStatistic
                title={"Người dùng"}
                label={`Tổng người dùng: ${data.users}`}
                image='https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardStatistic
                title={"Danh mục"}
                label={`Tổng danh mục: ${data.category}`}
                image='https://images.unsplash.com/photo-1529270296466-b09d5f5c2bab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardStatistic
                title={"Tin tức"}
                label={`Tổng tin tức: ${data.news}`}
                image='https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardStatistic
                title={"Lượt xem"}
                label={`Tổng lượt xem: ${data.view}`}
                image='https://images.unsplash.com/photo-1607703703520-bb638e84caf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              />
            </Grid>
          </Grid>
        </>
      )}
    </AdminLayout>
  );
};

export default Admin;

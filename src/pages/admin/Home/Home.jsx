import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import PageTitle from "../../../components/PageTitle";
import { useGetDashboardDataQuery } from "../../../features/dashboard/instructionApiSlice";
import { Container, Card, Grid } from "@mui/material";
import ACard from "./components/ACard";
function Home() {
  const { data } = useGetDashboardDataQuery();
  console.log(data);
  return (
    <div>
      <PageTitleWrapper>
        <PageTitle heading="Dashboard" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        {data && (
          <Grid
            container
            sx={{
              justifyContent: "center",
            }}
            gap={2}
          >
            <Grid item lg={3} md={3.5}>
              <ACard data={data?.data?.users} title="Users" />
            </Grid>
            <Grid item lg={3} md={3.5}>
              <ACard data={data?.data?.users} title="Manager" />
            </Grid>
            <Grid item lg={3} md={3.5}>
              <ACard data={data?.data?.clinics} title="Clinics" />
            </Grid>
            <Grid item lg={3} md={3.5}>
              <ACard data={data?.data?.records} title="Records" />
            </Grid>
            <Grid item lg={3} md={3.5}>
              <ACard data={data?.data?.requests} title="Requests" />
            </Grid>
            <Grid item lg={3} md={3.5}>
              <ACard data={data?.data?.admins} title="Admins" />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default Home;

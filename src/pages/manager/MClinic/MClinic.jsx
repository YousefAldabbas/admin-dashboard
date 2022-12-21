import React from "react";
import { useGetManagerClinicInfoQuery } from "../../../features/user/userApiSlice";
import { Box, TextField, Grid } from "@mui/material";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import PageTitle from "../../../components/PageTitle";
import Form from "./components/Form";
function MClinic() {
  const { data, isLoading } = useGetManagerClinicInfoQuery();

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle heading="Clinic Settings" />
      </PageTitleWrapper>

      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
         
        }}
      >
        <Form clinic={data?.data} />
      </Box>
    </div>
  );
}

export default MClinic;

import React from "react";
import PageTitle from "../../../components/PageTitle";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import { useGetManagerClinicInfoQuery } from "../../../features/user/userApiSlice";

function PHome() {
  const { data, isLoading } = useGetManagerClinicInfoQuery();


    console.log(data);


  return (
    <div>
      <PageTitleWrapper>
        <PageTitle heading="Dashboard" />
      </PageTitleWrapper>
      manager only
      list of doctors name
      
    </div>
  );
}

export default PHome;

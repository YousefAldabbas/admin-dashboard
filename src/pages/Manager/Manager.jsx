import React from "react";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageTitle from "../../components/PageTitle";
import { Container } from "@mui/material";

import MTable from "./components/MTable";
import { useGetManagersQuery } from "../../features/manager/managerApiSlice";
import AddModal from "./components/AddModal";

function Manager() {
  const { data, isLoading } = useGetManagersQuery();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AddModal open={open} handleClose={handleClose} />
      <PageTitleWrapper>
        <PageTitle
          heading="Manager"
          isButton={true}
          buttonText="Add Manager"
            handleOpen={handleOpen}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        {data && <MTable data={data?.data?.managers} />}
      </Container>
    </>
  );
}

export default Manager;

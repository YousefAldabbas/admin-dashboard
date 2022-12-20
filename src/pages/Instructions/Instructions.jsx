import React from "react";
import { useGetInstructionsQuery } from "../../features/instruction/instructionApiSlice";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageTitle from "../../components/PageTitle";
import BasicModal from "./components/BasicModal";
import {
  useTheme,
  Grid,
} from "@mui/material";

import ACard from "./components/ACard";

function Instructions() {

  const { data: instructions, isLoading } = useGetInstructionsQuery();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  console.log(open);
  if (!isLoading) {
    console.log(instructions);
  }
  return (
    <>
      <BasicModal open={open} handleClose={handleClose} />
      <div>
        <PageTitleWrapper>
          <PageTitle
            heading="Instructions"
            isButton={true}
            buttonText="Add Instruciton"
            handleOpen={handleOpen}
          />
        </PageTitleWrapper>

        <Grid container gap={2} maxWidth="lg" justifyContent="center"

        sx={{
          p:{
            xs:2
          }
        }}
        >
          {instructions?.data?.map((inst, i) => {
            return (
              <Grid xs={12} md={4} lg={3.6} key={`INST___${i}`}>
                <ACard inst={inst} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default Instructions;

import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import { logOut } from "../../../features/auth/authSlice";
import { useGetManagerHealthInfoQuery } from "../../../features/user/userApiSlice";
import PTab from "./components/PTab";
import TabPanel from "./components/TabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function PHome() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetManagerHealthInfoQuery();

  const [value, setValue] = React.useState(1);
  console.log(data);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m:4
        }}
      >
        <Typography variant="h6" color="initial">
          Your Health
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(logOut());
          }}
        >
          {" "}
          Logout
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            maxWidth: "fit-content",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="medecine" {...a11yProps(0)} />
            <Tab label="records" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PTab data={data.data.medicine} tab="med" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PTab data={data.data.records} tab="rec" />
        </TabPanel>
      </Box>
    </div>
  );
}

export default PHome;

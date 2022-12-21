import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { SearchTwoTone } from "@mui/icons-material";
import { useFindPatientQuery } from "../../../features/clinic/clinicApiSlice";
import AddRecord from "./components/AddRecord";
import AddMedicine from "./components/AddMedicine";

function CRecord() {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(null);

  const { data, isSuccess } = useFindPatientQuery(search, {
    skip: search === "" && search === null,
  });
  const [showAddMed, setShowAddMed] = useState(false);
  const [showMed, setShowMed] = useState(false);

  console.log(data);

  const [showAddRec, setShowAddRec] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearch(searchValue);
    console.log(data?.data);
  };
  return (
    <div>
      {" "}
      <PageTitleWrapper>
        <Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton sx={{ p: 2 }} type="submit">
              <SearchTwoTone />
            </IconButton>{" "}
            <TextField
              // value={searchValue}
              fullWidth
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <SearchTwoToneIcon />
              //     </InputAdornment>
              //   ),
              // }}
              placeholder="Search by National ID"
            />
          </Box>
          {data !== undefined && (
            <>
              <Button
                variant="contained"
                sx={{
                  borderRaduis: "5px",
                }}
                onClick={() => {
                  setShowAddRec(!showAddRec);
                  setShowAddMed(false);
                }}
              >
                Add Record
              </Button>
              <Button
                sx={{
                  borderRaduis: "5px",
                }}
                variant="contained"
                onClick={() => {
                  setShowAddMed(!showAddMed);
                  setShowAddRec(false);
                }}
              >
                Add Medicine
              </Button>
            </>
          )}
        </Box>
      </PageTitleWrapper>
      <Box>
        {data === undefined ? (
          <div>no results</div>
        ) : (
          <Card
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Avatar variant="rounded" alt={data?.data?.patient.full_name}>
                {data?.data?.patient.full_name.charAt(0)}
              </Avatar>
              <Box>
                <Typography>name : {data?.data.patient.full_name}</Typography>

                <Typography>ID : {data?.data.patient.nat_id}</Typography>
                <Typography>
                  birth date : {data?.data.patient.birth_date}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                setShow(!show);

                setShowMed(false);
              }}
              sx={{
                mt: 1,
              }}
            >
              Records
            </Button>
            {show &&
              data?.data?.records.map((x, i) => {
                return (
                  <Box
                    sx={{
                      p: 1,
                      my: 1,
                      border: "0.2px solid",
                    }}
                    key={`CMRD___${i}`}
                  >
                    <Typography>doctor : {x.doctor}</Typography>
                    <Box>
                      <Typography>records</Typography>
                      <Box
                        sx={{
                          ml: 1,
                        }}
                      >
                        {x.fields.map((r, ind) => {
                          return (
                            <Typography key={`RCCS__${ind}`}>
                              {r.record_title} : {r.record_content}
                            </Typography>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                );
              })}

            <Button
              variant="contained"
              onClick={() => {
                setShowMed(!showMed);
                setShow(false);
              }}
              sx={{
                mt: 1,
              }}
            >
              Medicine
            </Button>
            {showMed &&
              data?.data?.medicines?.map((x, i) => {
                return (
                  <Box
                    sx={{
                      p: 1,
                      my: 1,
                      border: "0.2px solid",
                    }}
                    key={`CME___${i}`}
                  >
                    <Typography>doctor : {x.name}</Typography>
                    <Box>
                      <Typography>records:{x.use}</Typography>
                      <Typography>records:{x.doctor}</Typography>
                    </Box>
                  </Box>
                );
              })}
          </Card>
        )}
      </Box>
      {showAddRec && data?.data && (
        <AddRecord patientId={data?.data?.patient?.id} />
      )}
      {showAddMed && data?.data && (
        <AddMedicine patientId={data?.data?.patient?.id} />
      )}
    </div>
  );
}

export default CRecord;

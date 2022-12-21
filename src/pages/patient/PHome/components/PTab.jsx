import { Box, Chip, Typography } from "@mui/material";
import React from "react";

function PTab({ data, tab }) {
  if (data?.length < 1 || !data) {
    return <div> No Data</div>;
  }
  console.log(data);
  return tab === "rec" ? (
    data?.map((x, i) => {
      return (
        <Box
          key={`PP__${i}`}
          sx={{
            border: "2px solid",
            m: 2,
            p: 2,
            borderRadius: "10px",
            minWidth: "300px",
          }}
        >
          <Chip variant="contained" label={x.clinic_name}></Chip>

          <Box
            sx={{
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Typography variant="body1" color="initial">
                fields
              </Typography>

              <Box>
                {x.fields.map((y, index) => {
                  return (
                    <Typography key={`PPD__${index}`}>
                      {y.record_title}: {y.record_content}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
            <Typography color="initial">Doctor : {x.doctor}</Typography>
          </Box>
        </Box>
      );
    })
  ) : (
    <div>
      {data.map((x, i) => {
        return (
          <Box
            key={`PC__${i}`}
            sx={{
              border: "2px solid",
              m: 2,
              p: 2,
              borderRadius: "10px",
              minWidth: "300px",
            }}
          >
            <Chip variant="contained" label={x.clinic_name} />
            <Typography variant="body1" color="initial">
              med name: {x.name}
            </Typography>
            <Typography variant="body2" color="initial">
              {x.use}
            </Typography>
            <Typography color="initial">Doctor : {x.doctor}</Typography>
          </Box>
        );
      })}
    </div>
  );
}

export default PTab;

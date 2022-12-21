import React, { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useUpdateManagerClinicInfoMutation } from "../../../../features/user/userApiSlice";
function Form({ clinic }) {
  const [edit, setEdit] = useState(false);
  const [update] = useUpdateManagerClinicInfoMutation();
  //   console.log(clinic);
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      name: clinic.name,
      username: clinic.username,
    },
    onSubmit: async (values) => {
      console.log(values);

      await update(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        bgcolor: theme.colors.alpha.trueWhite[10],
        p: 2,
        borderRadius: 1,
        maxWidth:"400px"
      }}
    >
      <Grid
        container
        sx={{
          gap: 2,
        }}
      >
        <Grid
          item={true}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              ml: 1,
            }}
          >
            Name
          </Typography>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            disabled={!edit}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid
          item={true}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              ml: 1,
            }}
          >
            username
          </Typography>
          <TextField
            required
            fullWidth
            id="username"
            name="username"
            disabled={!edit}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          xs={12}
        >
          <Button
            variant="contained"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? "disable" : "enable"} edit
          </Button>
          {edit && (
            <Button variant="contained" type="submit">
              Submit changes
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;

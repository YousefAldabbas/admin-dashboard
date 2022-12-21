import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, Checkbox, MenuItem, FormControlLabel } from "@mui/material";

import { useSelector } from "react-redux";
import { selectCurrentDoctors } from "../../../../features/auth/authSlice";
import { useAddMedicineMutation } from "../../../../features/clinic/clinicApiSlice";

const style = {
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  mt: 2,
};

const roles = [
  {
    value: "MANAGER",
    label: "Manager",
  },
  {
    value: "USER",
    label: "User",
  },
];

const validationSchema = Yup.object({
  name: Yup.string("Invalid input").required("this field is required"),
  use: Yup.string("Invalid input").required("this field is required"),

  doctor: Yup.string("Invalid input").required(),
});

export default function AddMedicine({ patientId }) {
  const [add, { isLoading }] = useAddMedicineMutation();
  const doctors = useSelector(selectCurrentDoctors);
  const formik = useFormik({
    initialValues: {
      use: "",
      name: "",
      doctor: doctors[0] || null,
      patient_id: patientId,
    },
    validationSchema,
    onSubmit: async (values) => {
      await add(values);
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={style}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Medicine name ?"
        name="name"
        autoComplete="name"
        autoFocus
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        margin="normal"
        required
        multiline
        rows={4}
        fullWidth
        id="use"
        label="How to use ?"
        name="use"
        value={formik.values.use}
        onChange={formik.handleChange}
        error={formik.touched.use && Boolean(formik.errors.use)}
        helperText={formik.touched.use && formik.errors.use}
      />
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        name="doctor"
        value={formik.values.doctor}
        onChange={formik.handleChange}
        error={formik.touched.doctor && Boolean(formik.errors.doctor)}
        helperText={formik.touched.doctor && formik.errors.doctor}
      >
        {doctors?.map((option) => (
          <MenuItem key={`RSC__${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

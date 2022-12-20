import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, Checkbox, MenuItem, FormControlLabel } from "@mui/material";
import {
  useAddInstructionMutation,
  useUpdateInstructionMutation,
} from "../../../features/instruction/instructionApiSlice";
import { useAddManagerMutation } from "../../../features/manager/managerApiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
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
  job_id: Yup.string().required("this field is required"),
  nat_id: Yup.string().required("this field is required"),
  full_name: Yup.string().required("this field is required"),
  birth_date: Yup.string().required(),
  clinic_name: Yup.string().required("this field is required"),
});

export default function AddModal({ open, handleClose }) {
  const [add, { isLoading }] = useAddManagerMutation();

  const formik = useFormik({
    initialValues: {
      job_id: "",
      nat_id: "",
      full_name: "",
      birth_date: "20-10-2000",
      clinic_name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await add(values);
      handleClose();
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={style}
      >
        <TextField
          margin="normal"
          required

          rows={4}
          fullWidth
          id="job_id"
          label="Job ID"
          name="job_id"
          autoComplete="job_id"
          autoFocus
          value={formik.values.job_id}
          onChange={formik.handleChange}
          error={formik.touched.job_id && Boolean(formik.errors.job_id)}
          helperText={formik.touched.job_id && formik.errors.job_id}
        />
        <TextField
          margin="normal"
          required

          rows={4}
          fullWidth
          id="nat_id"
          label="National ID"
          name="nat_id"
          autoComplete="nat_id"
          
          value={formik.values.nat_id}
          onChange={formik.handleChange}
          error={formik.touched.nat_id && Boolean(formik.errors.nat_id)}
          helperText={formik.touched.nat_id && formik.errors.nat_id}
        />

        <TextField
          margin="normal"
          required

          rows={4}
          fullWidth
          id="full_name"
          label="Full Name"
          name="full_name"
          autoComplete="full_name"
          
          value={formik.values.full_name}
          onChange={formik.handleChange}
          error={formik.touched.full_name && Boolean(formik.errors.full_name)}
          helperText={formik.touched.full_name && formik.errors.full_name}
        />
        <TextField
          margin="normal"
          required

          rows={4}
          fullWidth
          id="birth_date"
          label="Birth Date"
          name="birth_date"
          autoComplete="birth_date"
          
          value={formik.values.birth_date}
          onChange={formik.handleChange}
          error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
          helperText={formik.touched.birth_date && formik.errors.birth_date}
        />
        <TextField
          margin="normal"
          required

          rows={4}
          fullWidth
          id="clinic_name"
          label="Clinic Name"
          name="clinic_name"
          autoComplete="clinic_name"
          
          value={formik.values.clinic_name}
          onChange={formik.handleChange}
          error={formik.touched.clinic_name && Boolean(formik.errors.clinic_name)}
          helperText={formik.touched.clinic_name && formik.errors.clinic_name}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

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
} from "../../../../features/instruction/instructionApiSlice";
import { useAddManagerMutation } from "../../../../features/manager/managerApiSlice";
import {
  useAddDoctorMutation,
  useUpdateDoctorMutation,
} from "../../../../features/user/userApiSlice";

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
  name: Yup.string().required("this field is required"),
});

export default function AddModal({ open, handleClose, old = null }) {
  const [add, { isLoading }] = useAddDoctorMutation();
  const [update] = useUpdateDoctorMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!old) {
        await add(values);
      } else {
        await update({ old, new: values.name });
      }
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
          fullWidth
          id="name"
          label="Doctor Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius:"10px",
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
  content: Yup.string("Invalid input").required("content is required"),
  role: Yup.string("Invalid input").oneOf(["MANAGER", "USER"]).required(),
});

export default function BasicModal({ open, handleClose }) {
  const [add, { isLoading }] = useAddInstructionMutation();
  const formik = useFormik({
    initialValues: {
      content: "",
      role: "MANAGER",
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
          id="outlined-select-currency"
          select
          label="Select"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}

        >
          {roles?.map((option) => (
            <MenuItem key={`RSC__${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          required
          multiline
          rows={4}
          fullWidth
          id="content"
          label="content"
          name="content"
          autoComplete="content"
          autoFocus
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
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

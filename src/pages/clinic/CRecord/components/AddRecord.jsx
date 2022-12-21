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
import { useSelector } from "react-redux";
import { selectCurrentDoctors } from "../../../../features/auth/authSlice";
import { useAddRecordMutation } from "../../../../features/clinic/clinicApiSlice";
import FormComponent from "./FormComponent";

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

// const validationSchema = Yup.object({
//   content: Yup.string("Invalid input").required("content is required"),
//   role: Yup.string("Invalid input").oneOf(["MANAGER", "USER"]).required(),
// });

export default function AddRecord({ patientId }) {
  const [add, { isLoading }] = useAddRecordMutation();
  const doctors = useSelector(selectCurrentDoctors);
  console.log(doctors);

  const [fields, setFields] = React.useState([
    { record_title: "", record_value: "" },
  ]);

  const [doctor, setDoctor] = React.useState(doctors[0] || null);

  const handleAddField = () => {
    setFields([...fields, { record_title: "", record_value: "" }]);
  };
  const handleFieldsChange = (event, index) => {
    const values = [...fields];
    if (event.target.name === "record_title") {
      values[index].record_title = event.target.value;
    } else {
      values[index].record_content = event.target.value;
    }
    setFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      patient_id: patientId,
      fields,
      doctor,
    };
    console.log(body);
    try {
      await add(body);
      setFields([])
    } catch (error) {
      console.log(error);
    }
  };

  const deleteField = (index) => {
    const newFields = [...fields].filter((f, i) => {
      return i !== index;
    });

    console.log(index, newFields);
    setFields(newFields);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
      <FormComponent
        handleAddField={handleAddField}
        handleChange={handleFieldsChange}
        deleteField={deleteField}
        fields={fields}
      />
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        name="doctor"
        value={doctor}
        onChange={(e) => {
          setDoctor(e.target.value);
        }}
      >
        {doctors?.map((doc) => (
          <MenuItem key={`CD__${doc}`} value={doc}>
            {doc}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

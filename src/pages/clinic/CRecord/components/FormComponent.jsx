import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export default function FormComponent({
  fields,
  handleChange,
  handleAddField,
  deleteField,
}) {
  return (
    <Grid
      item={true}
      xs={12}
      sx={{
        mb: 2,
      }}
    >
      <Grid>
        {fields.map((field, index) => (
          <Grid
            item={true}
            key={index}
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: { xs: "column" },
            }}
          >
            <TextField
              type="text"
              label="Record title:"
              name="record_title"
              value={field.record_title}
              onChange={(event) => handleChange(event, index)}
            />

            <TextField
              label="Record content:"
              type="text"
              name="record_content"
              value={field.record_content}
              onChange={(event) => handleChange(event, index)}
            />
            <Button type="button" onClick={() => deleteField(index)}>
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button type="button" onClick={handleAddField}>
        Add field
      </Button>
    </Grid>
  );
}

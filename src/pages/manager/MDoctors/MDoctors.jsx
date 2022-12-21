import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {
  useDeleteDoctorMutation,
  useGetManagerClinicInfoQuery,
} from "../../../features/user/userApiSlice";
import AddDoctor from "./components/AddDoctor";
function MDoctors() {
  const { data, isLoading } = useGetManagerClinicInfoQuery();
  const [delDoctor] = useDeleteDoctorMutation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDoctor = async (name) => {
    await delDoctor({ name });
    handleClose();
  };

  return (
    <div>
      <AddDoctor
        open={open}
        handleClose={handleClose}
        old={name ? name : null}
      />
      <PageTitleWrapper>
        <PageTitle
          heading="Doctors"
          isButton={true}
          buttonText="Add Doctor"
          handleOpen={handleOpen}
        />
      </PageTitleWrapper>
      <Box p={2}>
        <Card
          sx={{
            p: 1,
          }}
        >
          {!isLoading &&
            data?.data?.doctors?.map((d, i) => {
              return (
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={`doc__${i}`}
                >
                  <Typography variant="h6">{d}</Typography>
                  <IconButton
                    aria-label="settings"
                    id="basic-button"
                    aria-controls={openMenu ? `${i}_doc` : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>

                  <Menu
                    id={`${i}_doc`}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={() => handleDeleteDoctor(d)}>
                      Delete
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setName(d);
                        handleOpen();
                      }}
                    >
                      Update
                    </MenuItem>
                  </Menu>
                </Container>
              );
            })}
        </Card>
      </Box>
    </div>
  );
}

export default MDoctors;

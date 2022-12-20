import React from "react";
import {
  Container,
  useTheme,
  Rating,
  Button,
  Divider,
  CardActions,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  CardHeader,
  Box,
  Card,
  Typography,
  Chip,
  Grid,
} from "@mui/material";
import { MoreVert, DeleteTwoTone } from "@mui/icons-material";
import { useDeleteInstructionMutation } from "../../../features/instruction/instructionApiSlice";
import UpdateModal from "./UpdateModal";

function ACard({ inst }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteInst] = useDeleteInstructionMutation();

  async function handleDelete() {
    try {
      await deleteInst(inst.id);
    } catch (error) {
      alert("instruction can't be deleted");
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <UpdateModal open={open} handleClose={handleClose} oldContent={inst?.content} oldRole={inst?.role} id={inst?.id} />

      <Card
        variant="outlined"
        sx={{
          p: 3,
          background: `${theme.colors.alpha.black[5]}`,
        }}
      >
        <Box
          sx={{
            pb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            sx={{
              mr: 0.5,
            }}
            size="small"
            label={inst?.role}
            color="secondary"
          />
          <IconButton
            aria-label="settings"
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleDelete();
              handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
          <MenuItem onClick={()=>{
            handleOpen()
          }}>Update</MenuItem>
        </Menu>
        <Typography
          sx={{
            pb: 2,
          }}
          color="text.secondary"
        >
          {inst?.content}
        </Typography>
        {/* <Button size="small" variant="contained">
                      View task
                    </Button>
                    <Divider
                      sx={{
                        my: 2,
                      }}
                    />
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        display="flex"
                        alignItems="center"
                        variant="subtitle2"
                      ></Typography>
                    </CardActions> */}
      </Card>
    </>
  );
}

export default ACard;

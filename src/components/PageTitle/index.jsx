import PropTypes from "prop-types";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { Typography, Button, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";

const PageTitle = ({
  heading = "",
  subHeading = "",
  docs = "",
  isButton = false,
  buttonText = "",
  setOpen,
  handleOpen,
  ...rest
}) => {
  return (
    <>
      <Helmet>
        <title>{heading}</title>
      </Helmet>
      <Grid
        container
        alignItems="center"
        sx={{
          justifyContent: {
            xs: "center",
            md: "space-between",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
        {...rest}
      >
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {heading}
          </Typography>
          <Typography variant="subtitle2">{subHeading}</Typography>
        </Grid>
        {isButton && (
          <Grid item>
            <Button
              onClick={handleOpen}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              {buttonText}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string,
};

export default PageTitle;

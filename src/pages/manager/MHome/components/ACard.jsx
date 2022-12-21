import React from "react";
import {
  Card,
  IconButton,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { AccountTreeRounded } from "@mui/icons-material";
function ACard({ data, title }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        p: 1,
        width: {
          xs: "150px",
          md: "auto"
        },
      }}
    >
      <IconButton
        aria-label=""
        sx={{
          bgcolor: `${theme.colors.alpha.black[10]}`,
        }}
      >
        <AccountTreeRounded />
      </IconButton>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h6"
          fontFamily={"sans-serif"}
          sx={{
            fontWeight: "bold",
          }}
        >
          {" "}
          {title}
        </Typography>
        <Typography variant="body1" color="initial">
          {" "}
          {data.length}
        </Typography>
      </Container>
    </Card>
  );
}

export default ACard;

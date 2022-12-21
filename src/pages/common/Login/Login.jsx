import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "./Copyrights";
import { useLoginMutation } from "../../../features/auth/authApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectCurrentUserRole,
  setCredentials,
} from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object({
  username: Yup.string("Enter your username").required("Username is required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(selectCurrentUserRole);
  const { pathname } = useLocation();
  const [login] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      username: localStorage.getItem("username") || "",
      password: localStorage.getItem("password") || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      let payload = {
        role: pathname.split("/")[1],
        body: values,
      };
      try {
        console.log(payload);
        const user = await login(payload).unwrap();

        dispatch(setCredentials(user?.data));
        console.log(user?.data?.user);
        localStorage.setItem("role", pathname.split("/")[1]);
        navigate(`/${user?.data?.user?.role?.toLowerCase()}/dashboard`);

        console.log(role?.toLowerCase());
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pathname.split("/")[1].charAt(0).toUpperCase() +
            pathname.split("/")[1].slice(1)}{" "}
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

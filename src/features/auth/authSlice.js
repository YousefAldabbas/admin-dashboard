import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    clinic: null,
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, tokens } = action.payload;
      console.log(action.payload);
      state.user = user;
      state.token = tokens.access_token;
      if (action.payload.tokens.refresh_token)
        localStorage.setItem("refresh", action.payload.tokens.refresh_token);
    },
    setClinic: (state, action) => {
      const { clinic, tokens } = action.payload;
      console.log(action.payload);
      state.clinic = clinic;
      state.token = tokens.access_token;
      if (action.payload.tokens.refresh_token)
        localStorage.setItem("refresh", action.payload.tokens.refresh_token);
    },
    refreshToken: (state, action) => {
      console.log("ref", action.payload);
      const { accessToken } = action.payload.tokens;
      state.token = accessToken;

      // if (!state.user) {
      //   state.user = {
      //     username: JSON.stringify(localStorage.getItem("username")),
      //     email: JSON.stringify(localStorage.getItem("email")),
      //   };
      // }
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.clinic = null;
      localStorage.removeItem("refresh");
    },
  },
});

export const { setCredentials, logOut, refreshToken, setClinic } =
  authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentClinic = (state) => state.auth.clinic;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentDoctors=(state) =>state.auth.clinic?.doctors
export const selectCurrentUserRole = (state) => state.auth.user?.role

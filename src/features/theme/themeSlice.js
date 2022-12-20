import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    sidebar: false,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebar = !state.sidebar;
    },
    closeSidebar: (state) => {
      state.sidebar = false;
    },
  },
});

export const { toggleSidebar,closeSidebar } = themeSlice.actions;
export default themeSlice.reducer;

export const selectSidebar = (state) => state.theme.sidebar;
// export const selectCurrentToken = (state) => state.auth.token;

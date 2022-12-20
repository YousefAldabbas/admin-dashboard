import { useState } from "react";
import { Routes, Router, Route } from "react-router-dom";

import BaseLayout from "./layouts/BaseLayout";
import SidebarLayout from "./layouts/SidebarLayout";

// auth provider
import RequireAuth from "./features/auth/RequireAuth";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Instructions from "./pages/Instructions";
import Manager from "./pages/Manager";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<RequireAuth />}>
            <Route path="" element={<Home />} />
            <Route path="instructions" element={<Instructions />} />
            <Route path="managers" element={<Manager />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;

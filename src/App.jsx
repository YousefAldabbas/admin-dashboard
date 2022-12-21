import { useState } from "react";
import { Routes, Router, Route } from "react-router-dom";

import BaseLayout from "./layouts/BaseLayout";
import SidebarLayout from "./layouts/SidebarLayout";

// auth provider
import RequireAuth from "./features/auth/RequireAuth";
// pages
import Login from "./pages/common/Login";
import Error404 from "./pages/common/Error404";
import Error403 from "./pages/common/Error403";

//  ---admin
import AHome from "./pages/admin/Home";
import AInstructions from "./pages/admin/Instructions";
import AManager from "./pages/admin/Manager";

//  --manager
import MHome from "./pages/manager/MHome";
import MDoctors from "./pages/manager/MDoctors";
import MClinic from "./pages/manager/MClinic/MClinic";

// --patient
import PHome from "./pages/patient/PHome";

// --clinic
import CHome from "./pages/clinic/CHome";
import CLogin from "./pages/clinic/CLogin/CLogin";
import CRecord from "./pages/clinic/CRecord";
import CHistory from "./pages/clinic/CHistory";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route element={<SidebarLayout />}>
          <Route
            path="/admin/dashboard"
            element={<RequireAuth allowedRole="ADMIN" />}
          >
            <Route path="" element={<AHome />} />
            <Route path="instructions" element={<AInstructions />} />
            <Route path="managers" element={<AManager />} />
          </Route>

          <Route
            path="/manager/dashboard"
            element={<RequireAuth allowedRole="MANAGER" />}
          >
            <Route path="" element={<MHome />} />
            <Route path="doctors" element={<MDoctors />} />
            <Route path="clinic" element={<MClinic />} />
          </Route>
          <Route
            path="/clinic/dashboard"
            element={<RequireAuth allowedRole="CLINIC" />}
          >
            <Route path="" element={<CHome />} />
            <Route path="patients" element={<CRecord />} />
            <Route path="history" element={<CHistory />} />
          </Route>
        </Route>
        <Route
          path="/user/dashboard"
          element={<RequireAuth allowedRole="USER" />}
        >
          <Route path="" element={<PHome />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/clinic/login" element={<CLogin />} />
      </Route>
      <Route path="/unauthenticated" element={<Error403 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;

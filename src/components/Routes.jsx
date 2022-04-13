import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import AdminLogin from "./AdminLogin/AdminLogin";
import ShortList from "./ShortList/ShortList";
import Interview from "./Interview/Interview";
import InterviewApplicant from "./Interview/InterviewApplicant";
import ShortListApplicant from "./ShortList/ShortListApplicant";
import Home from "./Home/Home";
import AddJob from "./AddJob/AddJob";
import ApplyJob from "./ApplyJob/ApplyJob";
import AllApplicant from "./Home/AllApplicant";

function AllRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/add-job"} element={<AddJob />} />
      <Route path={"/apply-job/:id"} element={<ApplyJob />} />
      <Route path={"/adminLogin"} element={<AdminLogin />} />
      <Route path={"/shortlist"} element={<ShortList />} />
      <Route path={"/all-applicant/:id"} element={<AllApplicant />} />
      <Route
        path={"/shortlist-applicant/:id"}
        element={<ShortListApplicant />}
      />
      <Route path={"/interview"} element={<Interview />} />
      <Route
        path={"/interview-applicant/:id"}
        element={<InterviewApplicant />}
      />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
}

export default AllRoutes;

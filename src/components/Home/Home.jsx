import React from "react";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import { useSelector } from "react-redux";

function Home() {
  const isLoginObj = useSelector((store) => store.isLogin.isLogin);
  return <>{isLoginObj.user.userName !== "" ? <AdminHome /> : <UserHome />}</>;
}

export default Home;

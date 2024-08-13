import { Outlet } from "react-router-dom";

import MainHeader from "../components/MainHeader/MainHeader.jsx";

import "./Layout.css";

function Layout() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;

import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
    </>
  );
}

export default Layout;

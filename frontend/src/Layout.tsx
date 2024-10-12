import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { isTokenExpired } from "./utils/isTokenExpired";
import { fetchAccessToken, resetGetAccessToken } from "./features/UserSlice";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ServerErrorPage from "./Pages/Error/ServerErrorPage";

function Layout() {
  const dispatch = useDispatch<any>();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const getAccessTokenStatus = useSelector(
    (state: any) => state.user.getAccessTokenStatus
  );
  useEffect(() => {
    if (userInfo) {
      if (isTokenExpired(userInfo?.access)) {
        dispatch(fetchAccessToken(userInfo?.refresh));
      }
    }
  }, []);

  useEffect(() => {
    if (getAccessTokenStatus === "succeeded") {
      window.location.reload();
      dispatch(resetGetAccessToken());
    }
  }, [getAccessTokenStatus]);

  return (
    <ErrorBoundary fallback={<ServerErrorPage />}>
      <Header />
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
    </ErrorBoundary>
  );
}

export default Layout;

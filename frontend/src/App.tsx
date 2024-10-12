import { ThemeProvider } from "@/components/theme-provider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import CreateTaskPage from "./Pages/CreateTaskPage";
import TaskPage from "./Pages/TaskPage";
import TaskUpdatePage from "./Pages/TaskUpdatePage";
import PageNotFound from "./Pages/Error/PageNotFound";
import SupportPage from "./Pages/SupportPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<PageNotFound />} />
      <Route index element={<HomePage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-task" element={<CreateTaskPage />} />
      <Route path="/task/:taskId" element={<TaskPage />} />
      <Route path="/update-task/:taskId" element={<TaskUpdatePage />} />
      <Route path="/support" element={<SupportPage />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;

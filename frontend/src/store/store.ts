import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/features/UserSlice";
import TaskSlice from "@/features/TaskSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    task: TaskSlice,
  },
});

export default store;

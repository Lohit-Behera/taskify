import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/Proxy";

interface RootState {
  user: {
    userInfo: {
      access: string;
      refresh: string;
      user: {
        id: number;
        username: string;
        email: string;
      };
    };
  };
}

export const fetchCreateTask = createAsyncThunk(
  "task/create",
  async (
    task: {
      title: string;
      description: string;
      priority: "LOW" | "MEDIUM" | "HIGH";
      status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
      dueDate: Date;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const { user: { userInfo } = {} } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/tasks/create/`,
        task,
        config
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchGetUserTasks = createAsyncThunk(
  "getUser/tasks",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user: { userInfo } = {} } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const { data } = await axios.get(`${baseUrl}/api/tasks/get/`, config);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    createTask: {},
    createTaskStatus: "idle",
    createTaskError: {},

    getUserTasks: [],
    getUserTasksStatus: "idle",
    getUserTasksError: {},

    tasks: [],
  },
  reducers: {
    resetCreateTask: (state) => {
      state.createTask = {};
      state.createTaskStatus = "idle";
      state.createTaskError = {};
    },
    resetGetUserTasks: (state) => {
      state.getUserTasks = [];
      state.getUserTasksStatus = "idle";
      state.getUserTasksError = {};
    },
    AddTasks(state: any, action) {
      state.tasks = state.tasks
        ? [...state.tasks, ...action.payload]
        : action.payload;
    },
    resetTasks: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateTask.pending, (state) => {
        state.createTaskStatus = "loading";
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        state.createTaskStatus = "succeeded";
        state.createTask = action.payload;
      })
      .addCase(fetchCreateTask.rejected, (state, action) => {
        state.createTaskStatus = "failed";
        state.createTaskError = action.payload || "Create task failed";
      })

      .addCase(fetchGetUserTasks.pending, (state) => {
        state.getUserTasksStatus = "loading";
      })
      .addCase(fetchGetUserTasks.fulfilled, (state, action) => {
        state.getUserTasksStatus = "succeeded";
        state.getUserTasks = action.payload;
      })
      .addCase(fetchGetUserTasks.rejected, (state, action) => {
        state.getUserTasksStatus = "failed";
        state.getUserTasksError = action.payload || "Get user tasks failed";
      });
  },
});

export const { resetCreateTask, resetGetUserTasks, AddTasks, resetTasks } =
  taskSlice.actions;
export default taskSlice.reducer;

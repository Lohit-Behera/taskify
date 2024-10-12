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
  async (page: number, { rejectWithValue, getState }) => {
    try {
      const { user: { userInfo } = {} } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/tasks/get?page=${page}`,
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

export const fetchGetTask = createAsyncThunk(
  "get/task",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const { user: { userInfo } = {} } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/tasks/get/${id}/`,
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

export const fetchUpdateTask = createAsyncThunk(
  "update/task",
  async (task: any, { rejectWithValue, getState }) => {
    try {
      const { user: { userInfo } = {} } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const { data } = await axios.patch(
        `${baseUrl}/api/tasks/update/${task.id}/`,
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

export const fetchDeleteTask = createAsyncThunk(
  "delete/task",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const { user: { userInfo } = {} } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const { data } = await axios.delete(
        `${baseUrl}/api/tasks/delete/${id}/`,
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

const taskSlice = createSlice({
  name: "task",
  initialState: {
    createTask: {},
    createTaskStatus: "idle",
    createTaskError: {},

    getUserTasks: [],
    getUserTasksStatus: "idle",
    getUserTasksError: {},

    getTask: {},
    getTaskStatus: "idle",
    getTaskError: {},

    updateTask: {},
    updateTaskStatus: "idle",
    updateTaskError: {},

    deleteTask: {},
    deleteTaskStatus: "idle",
    deleteTaskError: {},

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
    resetUpdateTask: (state) => {
      state.updateTask = {};
      state.updateTaskStatus = "idle";
      state.updateTaskError = {};
    },
    resetDeleteTask: (state) => {
      state.deleteTask = {};
      state.deleteTaskStatus = "idle";
      state.deleteTaskError = {};
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
      })

      .addCase(fetchGetTask.pending, (state) => {
        state.getTaskStatus = "loading";
      })
      .addCase(fetchGetTask.fulfilled, (state, action) => {
        state.getTaskStatus = "succeeded";
        state.getTask = action.payload;
      })
      .addCase(fetchGetTask.rejected, (state, action) => {
        state.getTaskStatus = "failed";
        state.getTaskError = action.payload || "Get task failed";
      })

      .addCase(fetchUpdateTask.pending, (state) => {
        state.updateTaskStatus = "loading";
      })
      .addCase(fetchUpdateTask.fulfilled, (state, action) => {
        state.updateTaskStatus = "succeeded";
        state.updateTask = action.payload;
      })
      .addCase(fetchUpdateTask.rejected, (state, action) => {
        state.updateTaskStatus = "failed";
        state.updateTaskError = action.payload || "Update task failed";
      })

      .addCase(fetchDeleteTask.pending, (state) => {
        state.deleteTaskStatus = "loading";
      })
      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        state.deleteTaskStatus = "succeeded";
        state.deleteTask = action.payload;
      })
      .addCase(fetchDeleteTask.rejected, (state, action) => {
        state.deleteTaskStatus = "failed";
        state.deleteTaskError = action.payload || "Delete task failed";
      });
  },
});

export const {
  resetCreateTask,
  resetGetUserTasks,
  resetUpdateTask,
  resetDeleteTask,
  AddTasks,
  resetTasks,
} = taskSlice.actions;
export default taskSlice.reducer;

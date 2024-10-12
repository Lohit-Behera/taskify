import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/Proxy";

export const fetchRegister = createAsyncThunk(
  "user/register",
  async (
    user: {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/register/`,
        user,
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

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/login/`,
        user,
        config
      );
      document.cookie = `userInfoTaskify=${encodeURIComponent(
        JSON.stringify(data.data)
      )}; path=/; max-age=${60 * 24 * 60 * 60}; secure; sameSite=None;`;
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

export const fetchAccessToken = createAsyncThunk(
  "user/accessToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/token/refresh/`,
        { refresh: refreshToken },
        config
      );

      const userInfoTaskify = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userInfoTaskify="))
        ?.split("=")[1];

      if (userInfoTaskify) {
        const parsedCookie = JSON.parse(decodeURIComponent(userInfoTaskify));

        parsedCookie.access = data.access;

        document.cookie = `userInfoTaskify=${encodeURIComponent(
          JSON.stringify(parsedCookie)
        )}; path=/`;
      }

      return data.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length > 1) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
}

const userInfoCookie = getCookie("userInfoTaskify");

const userSlice = createSlice({
  name: "user",
  initialState: {
    register: {},
    registerStatus: "idle",
    registerError: {},

    userInfo: userInfoCookie ? JSON.parse(userInfoCookie) : null,
    userInfoStatus: "idle",
    userInfoError: {},

    getAccessToken: {},
    getAccessTokenStatus: "idle",
    getAccessTokenError: {},
  },
  reducers: {
    logout: (state) => {
      document.cookie = `userInfoTaskify=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      state.userInfo = null;
      state.userInfoStatus = "idle";
      state.userInfoError = {};
    },
    resetGetAccessToken: (state) => {
      state.getAccessToken = {};
      state.getAccessTokenStatus = "idle";
      state.getAccessTokenError = {};
    },
    reSignIn: (state) => {
      document.cookie = `userInfoTaskify=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(fetchRegister.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.register = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.payload as string;
      })

      // login
      .addCase(fetchLogin.pending, (state) => {
        state.userInfoStatus = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.userInfoStatus = "succeeded";
        state.userInfo = action.payload.data;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.userInfoStatus = "failed";
        state.userInfoError = action.payload as string;
      })

      // get access token
      .addCase(fetchAccessToken.pending, (state) => {
        state.getAccessTokenStatus = "loading";
      })
      .addCase(fetchAccessToken.fulfilled, (state, action) => {
        state.getAccessTokenStatus = "succeeded";
        state.getAccessToken = action.payload;
      })
      .addCase(fetchAccessToken.rejected, (state, action) => {
        state.getAccessTokenStatus = "failed";
        state.getAccessTokenError = action.payload as string;
      });
  },
});

export const { logout, resetGetAccessToken, reSignIn } = userSlice.actions;
export default userSlice.reducer;

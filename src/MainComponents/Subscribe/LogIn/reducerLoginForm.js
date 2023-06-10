import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchLoginForm = createAsyncThunk(
  "loginForm/fetchLoginForm",
  async ({ email, password }) => {
    try {
      const response1 = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data1 = await response1.json();
      console.log(data1);
      localStorage.setItem("token", data1.token);
      localStorage.setItem("status", data1.status);
      const response2 = await fetch("http://localhost:5000/user/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${data1.token}`,
        },
        body: JSON.stringify({ email, password }),
      });
      const data2 = await response2.json();
      console.log(data2);
      return data2;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState: {
    isAuthenticated: false,
    wrongStatus: null,
    status: null,
    user: null,
    token: null,
    error: null,
    id: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchLoginForm.pending, (state, action) => {
      state.isAuthenticated = false;
      state.wrongStatus = null;
      state.status = null;
      state.user = null;
      state.token = null;
      state.error = "Incorect email or password";
      state.id = null;
    })
    .addCase(fetchLoginForm.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.wrongStatus = action.payload.wrongStatus;
      state.status = action.payload.user.status;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.id = state.user.id;

      if (state.user && state.user.id) {
        localStorage.setItem("id", state.user.id);
      }
    }) 
    .addCase(fetchLoginForm.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.wrongStatus = null;
      state.status = null;
      state.user = null;
      state.token = null;
      console.log(action.error);
      state.error = "Incorect email or password";
    })
    
  },
});

export default loginFormSlice.reducer;
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, userId: null },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      console.log(state.userId);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});

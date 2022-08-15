import { createSlice } from "@reduxjs/toolkit";

interface AuthITF {
  token: string;
  user: any;
}

const initialState: AuthITF = {
  token: "",
  user: undefined,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    clearAuth: (state) => {
      state.token = "";
      state.user = undefined;
    },
  },
});

export const { setAuth, clearAuth } = AuthSlice.actions;
export default AuthSlice.reducer;

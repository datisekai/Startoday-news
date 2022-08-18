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
      localStorage.setItem("info", JSON.stringify({ token, user }));
    },
    clearAuth: (state) => {
      state.token = "";
      state.user = undefined;
      localStorage.removeItem("info");
    },
  },
});

export const { setAuth, clearAuth } = AuthSlice.actions;
export default AuthSlice.reducer;

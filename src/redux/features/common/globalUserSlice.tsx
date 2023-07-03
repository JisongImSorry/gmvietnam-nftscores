import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGlobalUserState {
  name?: string;
  userId?: number;
  email?: string;
  token?: string;
  session_token?: string;
  balance?: number;
}

const initialState: IGlobalUserState = {
  userId: -1,
  name: "",
  email: "",
  token: "",
  session_token: "",
  balance: 0,
};

const globalUserSlice = createSlice({
  name: "globalUxctrl",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IGlobalUserState>) {
      // replace, but if null, keep the old value
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setUser } = globalUserSlice.actions;

export default globalUserSlice.reducer;

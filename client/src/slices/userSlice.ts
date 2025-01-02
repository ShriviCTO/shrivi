import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  role: "founder" | "inventory manager" | "dispatch manager" | "customer";
  userDetails: { id: string; name: string } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  role: "customer", // Default role
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        role: UserState["role"];
        userDetails: UserState["userDetails"];
      }>
    ) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userDetails = action.payload.userDetails;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = "customer";
      state.userDetails = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

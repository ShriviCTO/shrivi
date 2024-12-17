import { configureStore } from "@reduxjs/toolkit";

// Placeholder reducer: Replace this with your actual reducers or slices
const store = configureStore({
  reducer: {
    // Add reducers here, e.g., auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

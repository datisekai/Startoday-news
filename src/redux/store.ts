import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import AuthSlice from "./slices/AuthSlice";
import CkSlice from "./slices/CkSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth"],
};

const reducers = combineReducers({
  Auth: AuthSlice,
  CKEditor: CkSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

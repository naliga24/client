import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authenticateReducer from "./slices/authenticate";
import uiReducer from "./slices/ui";
import settingsReducer from "./slices/settings";
import logger from "redux-logger";
import { persistReducer, PERSIST, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  authenticate: authenticateReducer,
  ui: uiReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authenticate", "ui", "settings"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }).concat(logger),
});

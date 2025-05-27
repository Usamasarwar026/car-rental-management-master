// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authSlice from "./slices/authSlice";
// import userDetailsSlice from "./slices/userDetailsSlice";
// import carCrudSlice from "./slices/carCrudSlice";
// import eventSlice from "./slices/eventSlice";
// import { useDispatch, useSelector, useStore } from "react-redux";

// const rootReducer = combineReducers({
//   authStore: authSlice,
//   userDetailStore: userDetailsSlice,
//   carCrudStore: carCrudSlice,
//   eventStore: eventSlice,
// });

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = () => useStore<RootState>();

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@/lib/storage"; // Import custom storage
import authSlice from "./authSlice";
import userDetailsSlice from "./userDetailsSlice";
import carCrudSlice from "./carCrudSlice";
import eventSlice from "./eventSlice";
import bookingSlice from "./bookingSlice";
import { useDispatch, useSelector, useStore } from "react-redux";

const rootReducer = combineReducers({
  authStore: authSlice,
  userDetailStore: userDetailsSlice,
  carCrudStore: carCrudSlice,
  eventStore: eventSlice,
  booking: bookingSlice,
});

const persistConfig = {
  key: "root",
  storage, // Use custom storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = () => useStore<RootState>();

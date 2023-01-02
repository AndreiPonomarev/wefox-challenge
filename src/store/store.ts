import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { mapApi } from './mapApi';
import { postsApi } from './postsApi';

export const store = configureStore({
  reducer: {
    [mapApi.reducerPath]: mapApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(mapApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

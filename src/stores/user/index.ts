import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { defaultUserData, googleDefaultPass, StoreUser } from '@/models';
import { RootState } from '..';
import { handleLocalStorageLogout } from '@/utils/auth';
import { api } from '@/api';

// Define a type for the slice state
interface UserState {
  userData: StoreUser;
}

// Define the initial state using that type
const initialState: UserState = {
  userData: {
    userId: '',
    isWithGoogle: false,
    ...defaultUserData,
  },
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (userId: string): Promise<StoreUser> => {
    const response = await api.user.getUserById(userId);
    localStorage.setItem('isLoggedIn', String(true));

    return {
      userId,
      isWithGoogle: googleDefaultPass === response.password,
      ...response,
    };
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<StoreUser>>) => {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };
    },
    logout: () => {
      handleLocalStorageLogout();

      console.log('User logged out');
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const { updateUser, logout } = userSlice.actions;

export const selectUser = (state: RootState): StoreUser => state.user.userData;

export const selectUserId = createSelector(
  selectUser,
  (user: StoreUser): string => user.userId,
);

export const selectIsUserLoggedIn = createSelector(
  selectUserId,
  (userId: string): boolean => !!userId,
);

export const selectIsUserAdmin = createSelector(
  selectUser,
  (user: StoreUser): boolean => !!user.isAdmin,
);

export const selectIsUserWithGoogle = createSelector(
  selectUser,
  (user: StoreUser): boolean => !!user.isWithGoogle,
);

export default userSlice.reducer;

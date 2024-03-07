import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit/react';
import { RootState } from '../configureStore';

//Types//
type ActivitiesState = {
  activities: [];
  activities_initial_loading: boolean;
  activities_fetching_new: boolean;
  activities_error: string;
};

//Types//

const initialState: ActivitiesState = {
  activities: [],
  activities_initial_loading: true,
  activities_fetching_new: false,
  activities_error: '',
};

//Asinc actions//
export const getActivities = createAsyncThunk(
  'activities/getActivities',
  async () => {
    try {
      const response = await fetch('http://www.boredapi.com/api/activity/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching activities: ', error);
      return error;
    }
  }
);

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
        state.activities_initial_loading = false;
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.activities_error =
          action.error.message ?? 'Error fetching activities';
        state.activities_initial_loading = false;
      });
  },
});

export const selectActivitiesState = (state: RootState) => state.activities;

export const {} = activitiesSlice.actions;

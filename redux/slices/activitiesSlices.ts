import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit/react';
import { RootState } from '../configureStore';

//Types//
type ActivitiesState = {
  activities: TActivity[];
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
export const getActivities = createAsyncThunk<TActivity[], void>(
  'activities/getActivities',
  async () => {
    try {
      const response = await Promise.allSettled([
        fetch('http://www.boredapi.com/api/activity/'),
        fetch('http://www.boredapi.com/api/activity/'),
        fetch('http://www.boredapi.com/api/activity/'),
        fetch('http://www.boredapi.com/api/activity/'),
        fetch('http://www.boredapi.com/api/activity/'),
      ]);

      const data = await Promise.allSettled(
        response.map((res) => {
          if (res.status === 'fulfilled') {
            return res.value.json();
          }
        })
      );

      //Removing rejected/unfulfilled promises
      const fulfilled_data = data.filter((item) => {
        return item.status === 'fulfilled' && !item.value?.error;
      });

      let activities: TActivity[] = [];

      fulfilled_data.forEach((item) => {
        if (item.status === 'fulfilled') {
          const activity: TActivity = {
            key: item.value.key,
            activity: item.value.activity,
            link: item.value.link,
            participants: item.value.participants,
            category: item.value.type,
          };
          activities.push(activity);
        }
      });

      return activities;
    } catch (error) {
      console.log('Error fetching activities: ', error);
      throw error;
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

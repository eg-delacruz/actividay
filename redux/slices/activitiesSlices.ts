import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit/react';
import { RootState } from '../configureStore';

//Utils
import createRandomUniqueId from '@utils/createRandomUniqueId';

//Types
import { ActivityDto } from '@tsTypes/activity/activity.dto';
type ActivitiesState = {
  activities: TActivity[];
  activities_initial_loading: boolean;
  activities_fetching_new: boolean;
  activities_error: string;
};

//Initial state
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
        fetch('https://www.boredapi.com/api/activity/'),
        fetch('https://www.boredapi.com/api/activity/'),
        fetch('https://www.boredapi.com/api/activity/'),
        fetch('https://www.boredapi.com/api/activity/'),
      ]);

      const data = await Promise.allSettled(
        response.map((res) => {
          if (res.status === 'fulfilled') {
            return res.value.json();
          }
          return null;
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
            id: item.value.key,
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

export const getAnotherActivity = createAsyncThunk<TActivity, void>(
  'activities/getAnotherActivity',
  async (arg, { getState }) => {
    try {
      let newActivity: TActivity = {
        id: '',
        activity: '',
        link: '',
        participants: 0,
        category: '',
      };
      let continueFetching = true;
      const maxRetries = 3;
      let retries = 0;

      while (continueFetching && retries < maxRetries) {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        const data = await response.json();

        const state = getState() as RootState;

        const activity: TActivity = {
          id: data.key,
          activity: data.activity,
          link: data.link,
          participants: data.participants,
          category: data.type,
        };

        newActivity = activity;

        retries++;

        continueFetching = state.activities.activities.some(
          (item) => item.id === newActivity.id
        );
      }

      return newActivity;
    } catch (error) {
      console.log('Error fetching another activity: ', error);
      throw error;
    }
  }
);

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    eliminateActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter(
        (activity) => activity.id !== action.payload
      );
    },
    addCustomActivity: (state, action: PayloadAction<ActivityDto>) => {
      const { activity, link, participants, category } = action.payload;
      let uniqueID = createRandomUniqueId({});
      let keepGenerating = true;

      while (keepGenerating) {
        if (state.activities.some((item) => item.id === uniqueID)) {
          uniqueID = createRandomUniqueId({});
        } else {
          keepGenerating = false;
        }
      }

      state.activities.unshift({
        id: createRandomUniqueId({}),
        activity: activity,
        link: link,
        participants: participants,
        category: category,
      });
    },
    editActivity: (state, action: PayloadAction<TActivity>) => {
      const { id } = action.payload;

      const index = state.activities.findIndex(
        (activity) => activity.id === id
      );

      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    //Initial fetching of activities
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

    //Fetching another activity
    builder
      .addCase(getAnotherActivity.pending, (state, action) => {
        state.activities_fetching_new = true;
      })
      .addCase(getAnotherActivity.fulfilled, (state, action) => {
        state.activities_fetching_new = false;
        state.activities.unshift(action.payload);
      })
      .addCase(getAnotherActivity.rejected, (state, action) => {
        state.activities_error =
          action.error.message ?? 'Error fetching another activity';
        state.activities_fetching_new = false;
      });
  },
});

export const selectActivitiesState = (state: RootState) => state.activities;

export const { eliminateActivity, addCustomActivity, editActivity } =
  activitiesSlice.actions;

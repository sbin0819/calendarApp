import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import moment from 'moment';

const today = new Date();

interface CalendarStore {
  currYear: string;
  currMonth: string;
  currDate: string;
  currDay: string;
}

const initialState: CalendarStore = {
  currYear: moment(today).format('YYYY'),
  currMonth: moment(today).format('M'),
  currDate: moment(today).format('D'),
  currDay: moment(today).format('DD'),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;

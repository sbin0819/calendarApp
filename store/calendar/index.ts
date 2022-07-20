import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import moment from 'moment';

const today = new Date();

type EventType = 'event' | 'todo' | 'alaram';

interface EventSlotType {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  type: EventType;
  createdAt: string;
  updatedAt: string; // updatedAt 최신 순에 따라 순서가 바뀜?
  order?: number;
}

interface AllDataType {
  [data: string]: EventSlotType[];
}
interface CalendarStore {
  currYear: string;
  currMonth: string;
  currDay: string;
  currDate: string;
  selectedWeek?: string; //
  selectedDay?: string; // 해당 날짜 ex 7일
  selectedSlot?: string; // 0 ~ 48 단위 24 * 2
  selectedWeekData: AllDataType; // 활성화된 주의 데이터를 보여주어야함 7 이상의 key 값이 생길 수 없음
  allEventData: AllDataType; // 서버가 없기 때문에 전체 데이터를 저장해주어야함
}
//  includedDays = [4,5,6,7,8,9,10]
const initialState: CalendarStore = {
  currYear: moment(today).format('YYYY'),
  currMonth: moment(today).format('M'),
  currDay: moment(today).format('DD'),
  currDate: '목',
  selectedWeek: undefined,
  selectedDay: undefined,
  selectedSlot: undefined,
  selectedWeekData: {},
  allEventData: {
    '2022-7-22': [],
    '2022-7-23': [],
  },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    selectedDate: (state) => {},
    nextWeek: (state) => {
      // currDay + 7
    },
    prevWeek: (state) => {
      // currDay - 7
    },
    nextMonth: (state) => {
      // currMonth + 1
    },
    prevMonth: (state) => {
      // currMonth - 1
    },
    createdSlotEvent: (state) => {},
    updatedSlotEvent: (state) => {},
    deleteSlotEvent: (state) => {},
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;

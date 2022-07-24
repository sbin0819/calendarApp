import { createSlice, nanoid } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import moment from 'moment';

const today = moment();
const selectedWeek = [...Array(7).keys()].map((_, i) =>
  today
    .clone()
    .week(today.week() - 1)
    .startOf('week')
    .add(1 + i, 'day')
    .format('YYYY-MM-DD'),
);

type EventType = 'event' | 'todo' | 'alaram';

export interface SlotType {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  type: EventType;
  createdAt?: string | Date;
  updatedAt?: string | Date; // updatedAt 최신 순에 따라 순서가 바뀜?
  order?: number;
}

export interface EventSlotType {
  [data: string]: SlotType[];
}
interface CalendarStore {
  currYear: string;
  currMonth: string;
  currDay: string;
  currDate: string;
  selectedWeek: string[]; //
  selectedDay?: string; // 해당 날짜 ex 7일
  selectedSlot?: string; // 0 ~ 48 단위 24 * 2
  selectedWeekData: EventSlotType; // 활성화된 주의 데이터를 보여주어야함 7 이상의 key 값이 생길 수 없음
  allEventData: EventSlotType; // 서버가 없기 때문에 전체 데이터를 저장해주어야함
}
//  includedDays = [4,5,6,7,8,9,10]
const initialState: CalendarStore = {
  currYear: moment(today).format('YYYY'),
  currMonth: moment(today).format('M'),
  currDay: moment(today).format('DD'),
  currDate: '목',
  selectedWeek: selectedWeek,
  selectedDay: undefined,
  selectedSlot: undefined,
  selectedWeekData: {},
  allEventData: {
    [moment(today).format('YYYY-MM-DD')]: [
      {
        id: nanoid(),
        startTime: '00:00',
        endTime: '01:00',
        title: '이니셜 데이터 1',
        description: '상세내역',
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'event',
      },
      {
        id: nanoid(),
        startTime: '02:30',
        endTime: '03:30',
        title: '이니셜 데이터 2',
        description: '상세내역',
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'event',
      },
    ],
  },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    selectedDate: (state) => {},
    updatedSelectedWeek: (state, { payload: { selectedWeek } }) => {
      state.selectedWeek = selectedWeek;
    },
    nextWeek: (state) => {
      // 다음주의 날짜들 중 같은 인덱스
    },
    prevWeek: (state) => {
      // 이전주의 날짜들 중 같은 인덱스
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

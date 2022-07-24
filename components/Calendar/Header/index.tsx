import React from 'react';
import moment from 'moment';
import useCalendar from '@store/calendar/useCalendar';
import useCalendarActions from '@store/calendar/useCalendarActions';
import { GrNext, GrPrevious } from 'react-icons/gr';
const Header = () => {
  const { currYear, currMonth, selectedDay } = useCalendar();
  const { updatedSelectedWeek } = useCalendarActions();
  const selectedWeek = [...Array(7).keys()].map((_, i) =>
    selectedDay
      .clone()
      .week(selectedDay.week() - 1)
      .startOf('week')
      .add(1 + i, 'day')
      .format('YYYY-MM-DD'),
  );
  console.log(selectedDay);
  return (
    <div className="flex p-[8px] h-[64px] items-center px-10 gap-12">
      <div>캘린더</div>
      <div className="cursor-pointer">오늘</div>
      <div className="flex gap-4">
        <GrPrevious className="cursor-pointer text-xl" />
        <GrNext className="cursor-pointer text-xl" />
      </div>
      <div className="text-2xl">
        <span className="mr-2">{currYear}년</span>
        <span>{currMonth}월</span>
      </div>
    </div>
  );
};

export default Header;

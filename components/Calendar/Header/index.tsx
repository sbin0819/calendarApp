import React from 'react';
import moment from 'moment';
import useCalendar from '@store/calendar/useCalendar';
import useCalendarActions from '@store/calendar/useCalendarActions';
import { GrNext, GrPrevious } from 'react-icons/gr';
const Header = () => {
  const { currYYYYMMDD, selectedDay } = useCalendar();
  const { updateSelectedDate, updateCurrYYYYMMDD, updatedSelectedWeek } =
    useCalendarActions();
  const moveWeek = (num: number) => {
    const newCurrYYYYMMDD = selectedDay
      .clone()
      .week(selectedDay.week() + num)
      .startOf('week')
      .format('YYYY-MM-DD');
    const newSelectedWeek = [...Array(7).keys()].map((_, i) =>
      selectedDay
        .clone()
        .week(selectedDay.week() + num)
        .startOf('week')
        .add(1 + i, 'day')
        .format('YYYY-MM-DD'),
    );
    updateSelectedDate({ selectedDay: moment(newCurrYYYYMMDD) });
    updateCurrYYYYMMDD({ currYYYYMMDD: newCurrYYYYMMDD });
    updatedSelectedWeek({ selectedWeek: newSelectedWeek });
  };

  return (
    <div className="flex p-[8px] h-[64px] items-center px-10 gap-12">
      <div>캘린더</div>
      <div className="cursor-pointer">오늘</div>
      <div className="flex gap-4">
        <GrPrevious
          className="cursor-pointer text-xl"
          onClick={() => moveWeek(-1)}
        />
        <GrNext
          className="cursor-pointer text-xl"
          onClick={() => moveWeek(1)}
        />
      </div>
      <div className="text-2xl">
        <span className="mr-2">
          {moment(currYYYYMMDD).startOf('week').add(7, 'day').format('MM') ===
          moment(currYYYYMMDD).format('MM')
            ? moment(currYYYYMMDD).format('YYYY년 M월')
            : `${moment(currYYYYMMDD).format('YYYY년 M월')}~${moment(
                currYYYYMMDD,
              )
                .add(1, 'M')
                .format('M월')}`}
        </span>
      </div>
    </div>
  );
};

export default Header;

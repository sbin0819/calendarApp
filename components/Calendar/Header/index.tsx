import React from 'react';
import moment from 'moment';
import useCalendar from '@store/calendar/useCalendar';
import useCalendarActions from '@store/calendar/useCalendarActions';
import { GrNext, GrPrevious } from 'react-icons/gr';
const Header = () => {
  const accumulateNumberRef = React.useRef<number>(0);
  const { currYYYYMMDD, selectedDay } = useCalendar();
  const { updateCurrYYYYMMDD, updatedSelectedWeek } = useCalendarActions();
  const moveWeek = (type: string) => {
    if (type === 'add') {
      accumulateNumberRef.current += 1;
    } else {
      accumulateNumberRef.current -= 1;
    }
    const currYYYYMMDD = selectedDay
      .clone()
      .week(selectedDay.week() + accumulateNumberRef.current)
      .startOf('week')
      .format('YYYY-MM-DD');
    updateCurrYYYYMMDD({ currYYYYMMDD });
    const newSelectedWeek = [...Array(7).keys()].map((_, i) =>
      selectedDay
        .clone()
        .week(selectedDay.week() + accumulateNumberRef.current)
        .startOf('week')
        .add(1 + i, 'day')
        .format('YYYY-MM-DD'),
    );
    updatedSelectedWeek({ selectedWeek: newSelectedWeek });
  };
  return (
    <div className="flex p-[8px] h-[64px] items-center px-10 gap-12">
      <div>캘린더</div>
      <div className="cursor-pointer">오늘</div>
      <div className="flex gap-4">
        <GrPrevious
          className="cursor-pointer text-xl"
          onClick={() => moveWeek('minus')}
        />
        <GrNext
          className="cursor-pointer text-xl"
          onClick={() => moveWeek('add')}
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

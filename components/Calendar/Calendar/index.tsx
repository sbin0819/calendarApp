import React from 'react';
import useCalendar from '@store/calendar/useCalendar';

const Calendar = () => {
  const { currYear, currMonth } = useCalendar();
  const renderHeader = React.useMemo(() => {
    return (
      <div className="stroke-indigo-500">
        {currYear}년 {currMonth}월
      </div>
    );
  }, [currYear, currMonth]);
  return (
    <div className="p-10 bg-blue-300">
      <div className="header">
        <div>{renderHeader}</div>
      </div>
    </div>
  );
};

export default Calendar;

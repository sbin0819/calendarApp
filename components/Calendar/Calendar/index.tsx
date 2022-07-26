import React from 'react';
import moment, { Moment as MomentTypes } from 'moment';
import { GrNext, GrPrevious } from 'react-icons/gr';
import useCalendar from '@store/calendar/useCalendar';
import useCalendarActions from '@store/calendar/useCalendarActions';

const Calendar = () => {
  const [date, setdate] = React.useState<MomentTypes>(() => moment());
  const { updateCurrYYYYMMDD, updatedSelectedWeek, updateSelectedDate } =
    useCalendarActions();

  const handleDayClick = (current: MomentTypes) => setdate(moment(current));
  const jumpToMonth = (num: number) =>
    num
      ? setdate(date.clone().add(30, 'day'))
      : setdate(date.clone().subtract(30, 'day'));

  const generateDate = React.useCallback((): JSX.Element[] => {
    const today = date;

    const startWeek = today.clone().startOf('month').week();

    const endWeek =
      today.clone().endOf('month').week() === 1
        ? 53
        : today.clone().endOf('month').week();

    let calendar = [] as JSX.Element[];

    // 시작 주부터 마지막 주까지 +1 씩 증가시킴
    // 이제 주마다 일을 표기해야 하므로 len이 7인 arr를 생성 후 index를 기반으로 day를 표기하자
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="flex" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              // 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
              let current = today
                .clone()
                .week(week)
                .startOf('week')
                .add(n + 1 + i, 'day'); // 월요일 부터 시작이라 +1

              let isSelected =
                today.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'selected'
                  : '';

              let isGrayed =
                current.format('MM') !== today.format('MM') ? 'grayed' : '';

              return (
                <div
                  className={`box flex flex-1 items-center justify-center cursor-pointer`}
                  key={i}
                  style={{
                    color: isGrayed
                      ? '#999'
                      : isSelected
                      ? 'tomato'
                      : 'inherit',
                  }}
                  onClick={() => {
                    const selectedWeek = [...Array(7).keys()].map((_, i) =>
                      today
                        .clone()
                        .week(week)
                        .startOf('week')
                        .add(n + 1 + i, 'day')
                        .format('YYYY-MM-DD'),
                    );
                    updateCurrYYYYMMDD({
                      currYYYYMMDD: moment(today).format('YYYY-MM-DD'),
                    });
                    updateSelectedDate({
                      selectedDay: current,
                    });
                    updatedSelectedWeek({ selectedWeek });
                    handleDayClick(current);
                  }}
                >
                  <span className="text">{current.format('D')}</span>
                </div>
              );
            })}
        </div>,
      );
    }
    return calendar;
  }, [date, updateSelectedDate, updatedSelectedWeek]);

  return (
    <div className="px-[5px]">
      <div>
        <div className="flex gap-2 justify-between px-[8px]">
          <span className="title">{date.format('YYYY년 MM월')}</span>
          <div className="flex gap-2">
            <button onClick={() => jumpToMonth(0)}>
              <GrPrevious />
            </button>
            <button onClick={() => jumpToMonth(1)}>
              <GrNext />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
          {['월', '화', '수', '목', '금', '토', '일'].map((el) => (
            <div className="flex flex-1" key={el}>
              <div className="flex flex-1 items-center justify-center">
                {el}
              </div>
            </div>
          ))}
        </div>
        {generateDate()}
      </div>
    </div>
  );
};
export default Calendar;

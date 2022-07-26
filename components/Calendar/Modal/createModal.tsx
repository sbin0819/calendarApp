import React from 'react';
import useOnClickOutside from 'lib/useOnClickOutside';
import useCalendarActions from '@store/calendar/useCalendarActions';
import { nanoid } from '@reduxjs/toolkit';
import { getDay, timeOptions } from '../utils';
import { useModal } from './ModalProvider';
import moment from 'moment';
// 금토일은 왼쪽
//
const EventSlotModal = ({ colIdx, offset, onClose }: any) => {
  const { startTime, endTime, title } = useModal();
  const [slotHeight, setSlotHeight] = React.useState(40);
  const [top, setTop] = React.useState(offset.y);
  React.useEffect(() => {
    const minEnd = +endTime.slice(0, 2) * 60 + +endTime.slice(-2);
    const minStart = +startTime.slice(0, 2) * 60 + +startTime.slice(-2);
    const differTime = minEnd - minStart;
    const height =
      differTime % 60 == 0
        ? Math.floor(differTime / 60) * 40
        : Math.floor(differTime / 60) * 40 + 15;
    const top =
      +startTime.slice(-2) === 0
        ? +startTime.slice(0, 2) * 40
        : +startTime.slice(0, 2) * 40 + 20;
    setSlotHeight(height < 30 ? 40 : height);
    setTop(top + 148);
  }, [startTime, endTime]);

  const ref = React.useRef<any>();
  useOnClickOutside(ref, () => {
    onClose();
  });

  return (
    <div className="overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full overflow-hidden">
      <div
        ref={ref}
        style={{
          position: 'relative',
          top: top + 'px',
          left: 348 + +offset.width * colIdx + 'px',
          background: '#a2c2d8',
          width: offset.width + 'px',
          height: slotHeight + 'px',
          zIndex: 10,
          borderRadius: '4px',
          boxShadow: '2px 4px #888888',
        }}
      >
        <div className="text-[10px] pl-3 pt-[1px]">
          {title === '' ? '제목없음' : title}
        </div>
        <div className="text-[10px] pl-3">{`${startTime} ~ ${endTime}`}</div>
      </div>
      <div
        style={{
          position: 'relative',
          top: +offset.y - 150 + 'px',
          left: 348 + +offset.width + 15 + +offset.width * colIdx + 'px',
          width: '448px',
          zIndex: 10,
          background: 'white',
          border: '1px solid #888888',
        }}
        ref={ref}
      >
        <FormModal offset={offset} onClose={onClose} />
      </div>
    </div>
  );
};

const FormModal = ({ offset, onClose }: any) => {
  const { startTime, setStartTime, endTime, setEndTime, title, setTitle } =
    useModal();
  const { createEvent } = useCalendarActions();
  const createEventSlot = () => {
    createEvent({
      key: offset.date,
      data: {
        id: nanoid(),
        startTime,
        endTime,
        title,
        description: '상세내역',
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'event',
        date: offset.date,
      },
    });
    onClose();
  };

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="h-[36px] bg-slate-300 px-[16px]"></div>
      <div className="flex-1 mx-[16px]">
        <div className="h-[69px]">
          <div className="h-[61px] pl-[52px] pt-[8px] pb-[21px] w-full">
            <input
              className="h-[28px]  w-full text-[22px] border-b-2"
              placeholder="제목 및 시간 추가"
              onChange={onChangeTitle}
            />
          </div>
        </div>
        <div className="pl-[52px] flex gap-2 h-[36px] items-center">
          <div>이벤트</div>
          <div>할 일</div>
          <div>알림</div>
        </div>
        <div className="flex h-[36px] items-center">
          <div className="w-[44px] p-[8px] bg-rose-50 text-center">i</div>
          <div className="flex gap-2">
            <div>
              {moment(offset.date).format('M월 D일')}{' '}
              {getDay('' + moment(offset.date).day())}
            </div>
            <div>
              <select value={startTime} onChange={onChangeStartTime}>
                {timeOptions.map((data) => (
                  <option value={data.time} key={data.min}>
                    {data.type} {data.time}
                  </option>
                ))}
              </select>
            </div>
            <div>~</div>
            <div>
              {' '}
              <select value={endTime} onChange={onChangeEndTime}>
                {timeOptions.map((data) => (
                  <option value={data.time} key={data.min}>
                    {data.type} {data.time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center h-[44px] gap-4 px-[16px] pb-10 pt-20">
        <div>옵션 더보기</div>
        <div
          className="cursor-pointer bg-sky-500 text-white px-4 py-2"
          onClick={createEventSlot}
        >
          저장
        </div>
      </div>
    </div>
  );
};

export default EventSlotModal;

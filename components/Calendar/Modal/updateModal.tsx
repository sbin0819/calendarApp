import React from 'react';
import useOnClickOutside from 'lib/useOnClickOutside';
import useCalendarActions from '@store/calendar/useCalendarActions';
import { nanoid } from '@reduxjs/toolkit';
import { timeOptions } from '../utils';
import useCalendar from '@store/calendar/useCalendar';
import { SlotType } from '@store/calendar';
// 금토일은 왼쪽
//
const EventSlotModal = ({ colIdx, offset, onClose }: any) => {
  const ref = React.useRef<any>();
  useOnClickOutside(ref, () => {
    onClose();
  });

  return (
    <div className="overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full overflow-hidden">
      <div
        style={{
          position: 'relative',
          top: +offset.y - 150 + 'px',
          left: 348 + +offset.width + 15 + +offset.width * colIdx + 'px',
          width: '448px',
          // height: '515px',
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
  const { selectedSlot } = useCalendar();
  const { startTime, endTime, title, description } = selectedSlot as SlotType;
  const { createEvent } = useCalendarActions();
  const deleteEventSlot = () => {
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
      },
    });
    onClose();
  };

  const onChangeStartTime = (e) => {
    // setStartTime(e.target.value);
  };
  const onChangeEndTime = (e) => {
    // setEndTime(e.target.value);
  };

  const onChangeTitle = (e) => {
    // setTitle(e.target.value);
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
          <div className="w-[44px] p-[8px] bg-[pink] text-center">i</div>
          <div className="flex gap-2">
            <div>7월 18일 (월요일)</div>
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
      <div className="flex justify-end items-center h-[44px] gap-4 px-[16px]">
        <div
          className="cursor-pointer bg-red-400 text-white px-4 py-2"
          onClick={deleteEventSlot}
        >
          삭제
        </div>
        <div
          className="cursor-pointer bg-sky-500 text-white px-4 py-2"
          onClick={() => alert('미구현')}
        >
          수정
        </div>
      </div>
    </div>
  );
};

export default EventSlotModal;

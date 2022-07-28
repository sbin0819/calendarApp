import React from 'react';
import useOnClickOutside from 'lib/useOnClickOutside';
import useCalendarActions from '@store/calendar/useCalendarActions';
import { nanoid } from '@reduxjs/toolkit';

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
        ref={ref}
        style={{
          position: 'relative',
          top: offset.y + 'px',
          left: 348 + +offset.width * colIdx + 'px',
          background: '#a2c2d8',
          width: offset.width + 'px',
          height: '35px',
          zIndex: 10,
          borderRadius: '4px',
          boxShadow: '2px 4px #888888',
        }}
      >
        <div className="text-[10px] pl-3 pt-[1px]">제목없음</div>
        <div className="text-[10px] pl-3">{`${offset.startTime} ~ ${offset.endTime}`}</div>
      </div>
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
  const { createEvent } = useCalendarActions();
  const createEventSlot = () => {
    createEvent({
      key: offset.date,
      data: {
        id: nanoid(),
        startTime: offset.startTime,
        endTime: offset.endTime,
        title: offset.startTime + '입니다',
        description: '상세내역',
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'event',
      },
    });
    onClose();
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
            <div>오전 2:30</div>
            <div>~</div>
            <div>오전 3:30</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center h-[44px] gap-4 px-[16px]">
        <div>옵션 더보기</div>
        <div onClick={createEventSlot}>저장</div>
      </div>
    </div>
  );
};

export default EventSlotModal;

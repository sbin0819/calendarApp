import React from 'react';
import useOnClickOutside from 'lib/useOnClickOutside';

// 금토일은 왼쪽
//
const EventSlotModal = ({ colIdx, offset, onClose }: any) => {
  const ref = React.useRef<any>();
  useOnClickOutside(ref, () => {
    onClose();
  });
  console.log(offset);
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
        <div className="text-[10px] pl-3">1시 ~ 2시</div>
      </div>
      <div
        style={{
          position: 'relative',
          top: +offset.y - 150 + 'px',
          left: 348 + +offset.width + 15 + +offset.width * colIdx + 'px',
          width: '448px',
          height: '515px',
          zIndex: 10,
          background: 'white',
          border: '1px solid #888888',
        }}
        ref={ref}
      >
        <div>
          <div className="p-6 space-y-6"></div>
        </div>
      </div>
    </div>
  );
};

export default EventSlotModal;

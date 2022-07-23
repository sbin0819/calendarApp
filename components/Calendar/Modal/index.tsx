import React from 'react';
import useOnClickOutside from 'lib/useOnClickOutside';

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
          left: 348 + offset.width * colIdx + 'px',
          background: 'gold',
          width: offset.width + 'px',
          height: '35px',
          zIndex: 10,
        }}
      >
        <div className="text-xs">제목없음</div>
      </div>
      <div
        style={{
          position: 'relative',
          top: +offset.y - 150 + 'px',
          left: 500 + offset.width * colIdx + 'px',
          width: '448px',
          height: '515px',
          zIndex: 10,
          background: 'white',
          border: '1px solid #000',
        }}
        ref={ref}
      >
        <div>
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSlotModal;

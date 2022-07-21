import React from 'react';
import useOnClickOutside from 'lib/useOnClickOutside';

const EventSlotModal = ({ coordinate, onClose }: any) => {
  const ref = React.useRef<any>();
  useOnClickOutside(ref, () => {
    onClose();
  });
  return (
    <div
      // 테일윈드에서 템퍼럴 리터럴이 지원되지 않음
      //   className={`relative top-[${coordinate.y}] p-4 w-[200px] h-[300px] overflow-scroll`}
      style={{
        position: 'relative',
        width: '200px',
        height: '300px',
        top: coordinate.y + 'px',
      }}
      ref={ref}
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new
            consumer privacy laws for its citizens, companies around the world
            are updating their terms of service agreements to comply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventSlotModal;

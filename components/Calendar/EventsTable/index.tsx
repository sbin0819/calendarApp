import React from 'react';
import moment from 'moment';
import SampleModal from '../Modal';
import useOnClickOutside from 'lib/useOnClickOutside';

const EventsTable = () => {
  const currYYMMDD = '2022-01-17';
  const weekDays = [
    '2022-01-17',
    '2022-01-18',
    '2022-01-19',
    '2022-01-20',
    '2022-01-21',
    '2022-01-22',
    '2022-01-23',
  ];
  const weekDaysWithMarkedEventsData = [
    {
      '2022-01-17': [
        {
          id: 123121,
          startTime: '00:00',
          endTime: '01:00',
          title: '테스트',
          description: '상세내역',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1222313121,
          startTime: '02:00',
          endTime: '03:00',
          title: '테스트',
          description: '상세내역',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    { '2022-01-18': [] },
    {
      '2022-01-19': [
        {
          id: 1222313121,
          startTime: '12:00',
          endTime: '13:00',
          title: '테스트',
          description: '상세내역',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      '2022-01-20': [
        {
          id: 12223131214,
          startTime: '04:00',
          endTime: '05:00',
          title: '테스트',
          description: '상세내역',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    { '2022-01-21': [] },
    { '2022-01-22': [] },
    { '2022-01-23': [] },
  ];

  return (
    <div className="flex-1 min-w-[800px] overflow-x-scroll">
      <EventWeekHeader />
      <div className="flex h-[calc(100vh-144px)] overflow-y-scroll">
        <EventTimeBorder />
        <div className="flex-1 grid grid-cols-7">
          {weekDaysWithMarkedEventsData.map((date, idx) =>
            Object.entries(date).map(([date, markedEvents]) => (
              <React.Fragment key={date}>
                <EventVerticalSlot
                  colIdx={idx}
                  date={date}
                  markedEvents={markedEvents}
                  // onClick={onClickEventSlot}
                />
              </React.Fragment>
            )),
          )}
        </div>
      </div>
    </div>
  );

  function EventWeekHeader() {
    return (
      <div className="flex" role="presentation">
        <div className="flex w-[92px] items-end">GMT+09</div>
        <div
          role="columnheader"
          className="flex-1 grid grid-cols-7 h-[84px] border-t-[1px] border-b-[1px]"
        >
          <div className="border-l-[1px] border-r-[1px]">
            <div>월</div>
            <div>17</div>
          </div>
          <div className="border-r-[1px]">
            <div>화</div>
            <div>18</div>
          </div>
          <div className="border-r-[1px]">
            <div>수</div>
            <div>19</div>
          </div>
          <div className="border-r-[1px]">
            <div>목</div>
            <div>20</div>
          </div>
          <div className="border-r-[1px]">
            <div>금</div>
            <div>21</div>
          </div>
          <div className="border-r-[1px]">
            <div>토</div>
            <div>17</div>
          </div>
          <div className="">
            <div>일</div>
            <div>17</div>
          </div>
        </div>
      </div>
    );
  }

  function EventTimeBorder() {
    return (
      <div className="flex flex-col">
        <div className="flex-1  w-[92px]">
          <div className="h-full">
            {[...Array(24).keys()].map((_, i) => (
              <div
                className={
                  'relative flex justify-center ml-[80px] h-[40px]  pr-[calc(100vw-348px)]  border-b-[1px] border-red-300'
                  // ?? window 사이즈에 따라 pr 값 변경
                }
                key={i}
              >
                {i !== 0 && (
                  <span className="absolute top-[-12px] left-[-40px]">
                    {i}시
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

function EventVerticalSlot({ date, markedEvents, colIdx }: any) {
  const stepY = React.useRef(148);
  const [markedEventsElement, setMarkedEventsElement] = React.useState<any>([]);
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [offset, setOffset] = React.useState({
    x: '0',
    y: '0',
    width: '0',
    time: 0,
    date: '',
  });
  const onOpenModal = () => {
    setIsShowModal(true);
  };
  const onCloseModal = () => {
    setIsShowModal(false);
  };

  const selectedSlotFilterY = React.useCallback((coordinateY) => {
    const rangeY = [...Array(24).keys()].map((_, i) => ({
      y: '' + (i * 40 + stepY.current),
      time: i,
    }));
    let c = -1;
    while (true) {
      c++;
      if (+rangeY[c].y >= coordinateY) {
        return rangeY[c - 1];
      }
    }
  }, []);

  const onClickEventSlot =
    (openModalCb: () => void) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      // current width 정보
      const width = e.currentTarget?.offsetWidth;
      const date = e.currentTarget.getAttribute('data-datekey');
      setOffset((prev) => ({
        ...prev,
        x: `${e.clientX}`,
        ...selectedSlotFilterY(e.clientY),
        width: `${width}`,
        date: date || '',
      }));
      openModalCb();
    };

  const onHandleEventSlot = onClickEventSlot(onOpenModal);

  React.useEffect(() => {
    if (markedEvents.length > 0) {
      const markedElements = markedEvents.map((el) => {
        const height =
          (+el.endTime.slice(0, 2) - +el.startTime.slice(0, 2)) * 40;
        const top = +el.startTime.slice(0, 2) * 40;
        console.log(top);
        return (
          <div
            key={el.id}
            className={`absolute bg-[#a2c2d8] w-full rounded-md`}
            style={{
              top: `${top}px`,
              height: `${height}px`,
            }}
          >
            <div className="text-[10px] pl-3 pt-[1px]">{el.title}</div>
            <div className="text-[10px] pl-3">
              {el.startTime} ~ {el.endTime}
            </div>
          </div>
        );
      });
      setMarkedEventsElement(markedElements);
    }
  }, [markedEvents]);
  return (
    <React.Fragment>
      <div className="relative border-r-[1px]">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 h-[960px]"
          data-datekey={date}
          onClick={onHandleEventSlot}
        />
        {isShowModal && (
          <SampleModal colIdx={colIdx} offset={offset} onClose={onCloseModal} />
        )}
        <div className="realtive">
          {markedEventsElement.length > 0 && markedEventsElement}
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventsTable;

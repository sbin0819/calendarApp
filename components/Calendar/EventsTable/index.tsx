import React from 'react';
import moment from 'moment';
import { CreateModal, UpdateModal } from '../Modal';
import useCalendar from '@store/calendar/useCalendar';
import type { SlotType } from 'store/calendar';
import useWindowSize from 'lib/useWindowSize';
import useCalendarActions from '@store/calendar/useCalendarActions';
import ModalProvider from '../Modal/ModalProvider';

const EventsTable = () => {
  const { selectedWeek, allEventData } = useCalendar();

  const [weekDaysWithMarkedEventsData, setWeekDaysWithMarkedEventsData] =
    React.useState<SlotType[]>([]);
  React.useEffect(() => {
    const weekDaysWithMarkedEventsData = selectedWeek.map((week) => {
      if (allEventData[week]) {
        return { [week]: allEventData[week] };
      } else {
        return { [week]: [] };
      }
    });
    setWeekDaysWithMarkedEventsData(
      weekDaysWithMarkedEventsData as SlotType[] | [],
    );
  }, [allEventData, selectedWeek]);

  return (
    <div className="flex-1 min-w-[800px] overflow-x-scroll">
      <EventWeekHeader />
      <div className="flex h-[calc(100vh-144px)] overflow-y-scroll">
        <EventTimeBorder />
        <div className="flex-1 grid grid-cols-7">
          {weekDaysWithMarkedEventsData.map((date, idx) =>
            Object.entries(date).map(([date, markedEvents]) => {
              return (
                <React.Fragment key={date}>
                  <EventVerticalSlot
                    colIdx={idx}
                    date={date}
                    markedEvents={markedEvents}
                  />
                </React.Fragment>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );

  function EventWeekHeader() {
    const { selectedWeek } = useCalendar();
    const getDay = (key: string) => {
      const dayObj = {
        '1': '월',
        '2': '화',
        '3': '수',
        '4': '목',
        '5': '금',
        '6': '토',
        '0': '일',
      };
      return dayObj[key];
    };
    return (
      <div className="flex" role="presentation">
        <div className="flex w-[92px] items-end">GMT+09</div>
        <div
          role="columnheader"
          className="flex-1 grid grid-cols-7 h-[84px] border-t-[1px] border-b-[1px]"
        >
          {selectedWeek?.map((date) => (
            <div className="border-l-[1px] border-r-[1px]" key={date}>
              <div>{getDay('' + moment(date).day())}</div>
              <div>{moment(date).format('D')}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function EventTimeBorder() {
    const { width } = useWindowSize();
    return (
      <div className="flex flex-col">
        <div className="flex-1  w-[92px]">
          <div className="h-full">
            {[...Array(24).keys()].map((_, i) => (
              <div
                className={`relative flex justify-center ml-[80px] h-[40px] border-b-[1px]`}
                style={{ width: `${width - 340}px` }}
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
  const { updateSelectedSlot } = useCalendarActions();
  const [modalType, setModalType] = React.useState('default');
  const stepY = React.useRef(148);
  const [markedEventsElement, setMarkedEventsElement] = React.useState<any>([]);
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [offset, setOffset] = React.useState({
    x: '0',
    y: '0',
    width: '0',
    time: 0,
    startTime: '',
    endTime: '',
    date: '',
    min: 0,
  });
  const onOpenModal = () => {
    setIsShowModal(true);
  };
  const onCloseModal = () => {
    setIsShowModal(false);
  };

  const getStartTimeAndEndTime = (time) => {
    const onFixedFormat = (t: number) => {
      return t < 10 ? '0' + t : t;
    };
    const fixedStartTime = onFixedFormat(Math.floor(time / 2));
    const fixedEndTime = onFixedFormat(Math.floor(time / 2 + 1));
    const min = time * 30;
    if (time % 2 === 1) {
      return {
        startTime: `${fixedStartTime}:30`,
        endTime: `${fixedEndTime}:30`,
        min,
      };
    } else {
      return {
        startTime: `${fixedStartTime}:00`,
        endTime: `${fixedEndTime}:00`,
        min,
      };
    }
  };
  const selectedSlotFilterY = React.useCallback((coordinateY) => {
    const rangeY = [...Array(48).keys()].map((_, i) => ({
      y: '' + (i * 20 + stepY.current),
      time: i,
      ...getStartTimeAndEndTime(i),
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
      console.log(date);
      setOffset((prev) => ({
        ...prev,
        x: `${e.clientX}`,
        ...selectedSlotFilterY(e.clientY),
        width: `${width}`,
        date: date || '',
      }));
      setModalType('default');
      openModalCb();
    };

  const onClickEventSlot2 =
    (openModalCb: () => void) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    (data: SlotType) => {
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
      updateSelectedSlot({ selectedSlot: { ...data } });
      setModalType('update');
      openModalCb();
    };

  const onHandleCreateEventSlot = onClickEventSlot(onOpenModal);
  const onHandleUpdateEventSlot = onClickEventSlot2(onOpenModal);

  //! include time에 대해서 ui를 재설정 할 필요가 있음
  React.useEffect(() => {
    if (markedEvents.length > 0) {
      const markedElements = markedEvents.map((el) => {
        const height =
          (+el.endTime.slice(0, 2) - +el.startTime.slice(0, 2)) * 40;
        const top =
          +el.startTime.slice(-2) === 0
            ? +el.startTime.slice(0, 2) * 40
            : +el.startTime.slice(0, 2) * 40 + 20;
        return (
          <div
            key={el.id}
            className={`absolute bg-[#a2c2d8] w-full rounded-md overflow-hidden cursor-pointer`}
            style={{
              top: `${top}px`,
              height: `${height}px`,
            }}
            onClick={(event) => onHandleUpdateEventSlot(event)(el)}
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
          onClick={onHandleCreateEventSlot}
        />
        {isShowModal && modalType === 'default' ? (
          <ModalProvider offset={offset}>
            <CreateModal
              colIdx={colIdx}
              offset={offset}
              onClose={onCloseModal}
            />
          </ModalProvider>
        ) : (
          isShowModal &&
          modalType === 'update' && (
            <UpdateModal
              colIdx={colIdx}
              offset={offset}
              onClose={onCloseModal}
            />
          )
        )}
        <div className="realtive">
          {markedEventsElement.length > 0 && markedEventsElement}
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventsTable;

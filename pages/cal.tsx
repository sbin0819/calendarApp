import React from 'react';
import type { NextPage } from 'next';

const Header = () => {
  return <div className="flex p-[8px] h-[64px] items-center">Header</div>;
};

const SideNavigation = () => {
  return (
    <div className="min-w-[256px] w-[256px] h-[100vh] bg-slate-200">
      {/* <Calendar /> */}
    </div>
  );
};

const SlotBody = () => {
  const header = React.useCallback(
    () => (
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
    ),
    [],
  );
  const currYYMM = '2022-1';
  const weekDays = ['17', '18', '19', '20', '21', '22', '23'];
  return (
    <div className="flex-1 min-w-[800px] overflow-x-scroll">
      {header()}
      {/* 40*24 */}
      <div className="flex h-[calc(100vh-144px)] overflow-y-scroll">
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
        {/* <div className="bg-slate-100 w-[8px]" /> */}
        <div className="flex-1 grid grid-cols-7">
          <div className="relative border-r-[1px]">
            {/* 추가 작업 필요 */}
            <div
              className="absolute top-0 bottom-0 left-0 right-0"
              onClick={(e) => {
                e.stopPropagation();
                console.log('x:', e.clientY);
                console.log('y:', e.clientY);
              }}
            />
            <div className="realtive"></div>
            {/* {[...Array(24).keys()].map((_, i) => (
              <div
                className="flex flex-col justify-center h-[40px] border-l-[1px] border-b-[1px] time-slot-group"
                key={i}
              >
                <div className="time-slot"></div>
                <div className="time-slot"></div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Header />
      <div className="flex">
        <SideNavigation />
        <SlotBody />
      </div>
    </div>
  );
};

export default Home;

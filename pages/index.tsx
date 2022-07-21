import React from 'react';
import type { NextPage } from 'next';
import Calendar from '@components/Calendar';

const Header = () => {
  return <div className="flex p-[8px] h-[64px] items-center">Header</div>;
};

const SideNavigation = () => {
  return (
    <div className="w-[256px] h-[100vh] bg-slate-200">
      <Calendar />
    </div>
  );
};

const SlotBody = () => {
  const header = React.useCallback(
    () => (
      <div className="flex" role="presentation">
        <div className="flex w-[84px] items-end">GMT+09</div>
        <div
          role="columnheader"
          className="flex-1 grid grid-cols-7 h-[84px] border border-b-[#ddd]"
        >
          <div>
            <div>월</div>
            <div>17</div>
          </div>
          <div>
            <div>화</div>
            <div>18</div>
          </div>
          <div>
            <div>수</div>
            <div>19</div>
          </div>
          <div>
            <div>목</div>
            <div>20</div>
          </div>
          <div>
            <div>금</div>
            <div>21</div>
          </div>
          <div>
            <div>토</div>
            <div>17</div>
          </div>
          <div>
            <div>월</div>
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
    <div className="flex-1">
      {header()}
      {/* 40*24 */}
      <div className="flex h-[calc(100vh-144px)] overflow-scroll">
        <div className="flex flex-col">
          <div className="flex-1 w-[84px] bg-purple-50">
            <div className="h-full">
              {[...Array(24).keys()].map((_, i) => (
                <div
                  className="relative flex justify-center h-[40px] border border-b-red-200  "
                  key={i}
                >
                  {i !== 0 && (
                    <span className="relative top-[-11px]">{i}시</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-slate-100 w-[8px]" />
        <div className="flex-1 grid grid-cols-7">
          <div className="relative">
            {/* 추가 작업 필요 */}
            {/* <div className="absolute top-0 bottom-0 left-0 right-0" /> */}
            {[...Array(24).keys()].map((_, i) => (
              <div
                className="flex flex-col justify-center h-[40px] border border-b-[#f7f7f7] time-slot-group"
                key={i}
              >
                <div className="time-slot">hi</div>
                <div className="time-slot">hi</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="h-[100vh] overflow-hidden">
      <Header />
      <div className="flex">
        <SideNavigation />
        <SlotBody />
      </div>
    </div>
  );
};

export default Home;

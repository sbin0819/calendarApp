import React from 'react';
import type { NextPage } from 'next';
import { Header, Calendar, EventsTable } from '@components/Calendar';

const SideNavigation = () => {
  return (
    <div className="min-w-[256px] w-[256px] h-[100vh] bg-slate-200">
      <Calendar />
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Header />
      <div className="flex">
        <SideNavigation />
        <EventsTable />
      </div>
    </div>
  );
};

export default Home;

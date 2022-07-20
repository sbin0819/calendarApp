import type { NextPage } from 'next';
import Calendar from '@components/Calendar';

const Home: NextPage = () => {
  return (
    <div className="flex">
      <div className="w-[256px] h-[100vh] bg-slate-200">
        <Calendar />
      </div>
      <div className="flex-1 bg-green-200"></div>
    </div>
  );
};

export default Home;

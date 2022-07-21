import React from 'react';

const about = () => {
  return (
    <div className="relative w-full h-[100vh] bg-slate-300">
      <div className="h-10 bg-purple-50">a</div>
      <div className="h-10 bg-purple-100">a</div>
      <div className="ab">
        <div className="relative  bg-red-100 h-[400px] overflow-scroll">
          <div>
            {[...Array(40).keys()].map((_, i) => (
              <div className="h-40 bg- border border-blue-700" key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;

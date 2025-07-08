import React, { Suspense } from 'react';
import DashboardPage from './page';
import { BarLoader } from 'react-spinners';

const DashboardLayout = () => {
  return (
    <div className="px-5 ">
      <h1 className="text-6xl font-bold mb-5 text-left" style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #6b7280 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Dashboard
      </h1>
      {/* will show a fallback indicator / a loding indicator*/}
      <Suspense fallback ={<BarLoader className="mt-4" width ={"100%"} colour ="#808080"/>}
      >
        <DashboardPage />
      </Suspense>
      
      
    </div>
  );
};

export default DashboardLayout;
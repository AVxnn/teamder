'use client';

import React from 'react';

const FullPageLoader = () => {
  return (
    <main className="relative bg-gradient-to-tr from-[#05060F] to-[#0F1231] h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
      <h1 className="absolute left-1/2 transform top-4 -translate-x-1/2 text-[32px]">
        Teamder
      </h1>
      <div className="!px-6 rounded-4xl overflow-hidden h-max">
        <span className="loader"></span>
      </div>
    </main>
  );
};

export default FullPageLoader;

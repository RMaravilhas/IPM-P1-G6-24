import React from 'react';

const Divider: React.FC = () => (
  <div className="flex gap-5 justify-between items-center self-center mt-4 max-w-full text-center whitespace-nowrap w-[328px]">
    <div className="shrink-0 self-stretch my-auto h-px border border-black border-solid w-[133px]" />
    <div className="self-stretch">ou</div>
    <div className="shrink-0 self-stretch my-auto h-px border border-black border-solid w-[133px]" />
  </div>
);

export default Divider;
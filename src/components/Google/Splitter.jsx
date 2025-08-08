import React from "react";

const Splitter = () => {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="border-t border-gray-300 w-[10%]" />
      <span className="px-2 text-sm text-gray-350">or</span>
      <div className="border-t border-gray-300 w-[10%]" />
    </div>
  );
};

export default Splitter;

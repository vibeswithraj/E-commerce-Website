import React from "react";

const Loader = ({w_full}) => {
  return (
    <div className={`w-full flex justify-center items-center ${w_full}`}>
      <div className="w-16 h-16 flex justify-center items-center rounded-full border-4 border-r-gray-400 animate-spin"></div>
    </div>
  );
};

export default Loader;

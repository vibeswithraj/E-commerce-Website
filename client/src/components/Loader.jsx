import React from "react";
import ReactLoading from 'react-loading';

const Loader = ({w_full}) => {
  return (
    <div className={`w-full flex justify-center items-center ${w_full}`}>
        <ReactLoading type="bars" color={"lightgray"} height={'10%'} width={'10%'} />
      {/*<div className="w-16 h-16 flex justify-center items-center rounded-full border-4 border-r-gray-400 animate-spin"></div>*/}
    </div>
  );
};

export default Loader;

import React from "react";
import ReactLoading from 'react-loading';

const Loader = ({col_span_3,color}) => {
  return (
    <div className={`w-full flex justify-center items-center ${col_span_3}`}>
        <ReactLoading type="bars" color={color} height={'10%'} width={'10%'} />
      {/*<div className="w-16 h-16 flex justify-center items-center rounded-full border-4 border-r-gray-400 animate-spin"></div>*/}
    </div>
  );
};

export default Loader;

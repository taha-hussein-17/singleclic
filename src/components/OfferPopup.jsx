import React, { useState } from 'react';

const OfferPopup = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 w-24 h-24 bg-black text-white text-[10px] flex flex-col items-center justify-center rounded-full shadow-lg z-50">
      <span className="text-center leading-tight text-xs font-semibold font-bold text-[15px]">Get<br />5%<br />Off</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-0 right-0 text-black text-lg opacity-70 font-bold hover:opacity-100 rounded-full bg-white w-6 h-6 flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  );
};

export default OfferPopup;

import React from 'react';

const TopBar = ({ category }) => {
  return (
    <div className="w-full">
      {/* Navbar */}
      <div className="flex items-center justify-center gap-6 text-[12px] font-medium py-3 border-b text-gray-800">
        {[
          'NEW IN',
          'SHOP BY',
          'WOMEN',
          'MEN',
          'DESIGNERS',
          'CLOTHING',
          'SHOES',
          'BAGS',
          'ACCESSORIES',
          'JEWELLERY',
        ].map((item, index) => (
          <div key={index} className="cursor-pointer hover:underline">
            {item} <span className="text-xs">▼</span>
          </div>
        ))}
      </div>

      {/* Dynamic category bar */}
      <div className="bg-black text-white text-center py-2 text-sm font-semibold">
        ← {category}
      </div>
    </div>
  );
};

export default TopBar;

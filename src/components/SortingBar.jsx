import { FaThLarge, FaTh, FaThList } from 'react-icons/fa';

const SortingBar = ({ sortOrder, setSortOrder, itemsPerPage, setItemsPerPage, view, setView }) => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-700 mb-6">
      {/* Show */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">Show :</span>
        {[50, 100, 150].map((num) => (
          <span
            key={num}
            onClick={() => setItemsPerPage(num)}
            className={`cursor-pointer hover:underline ${
              itemsPerPage === num ? 'font-bold text-black' : 'text-gray-500'
            }`}
          >
            {num}
          </span>
        ))}
      </div>

      {/* View Options */}
      <div className="flex items-center gap-2 px-10 py-3">
        <button
          onClick={() => setView('grid')}
          className={view === 'grid' ? 'text-black' : 'text-gray-400'}
        >
          <FaThLarge size={18} />
        </button>
        <button
          onClick={() => setView('grid-compact')}
          className={view === 'grid-compact' ? 'text-black' : 'text-gray-400'}
        >
          <FaTh size={18} />
        </button>
        <button
          onClick={() => setView('list')}
          className={view === 'list' ? 'text-black' : 'text-gray-400'}
        >
          <FaThList size={18} />
        </button>
      </div>

      {/* Sort By */}
      <select
        className="border-none focus:outline-none font-semibold cursor-pointer"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">Sort by</option>
        <option value="low">Price (low to high)</option>
        <option value="high">Price (high to low)</option>
      </select>
    </div>
  );
};

export default SortingBar;

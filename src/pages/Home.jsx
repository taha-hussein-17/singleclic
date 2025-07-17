import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import TopBar from "../components/TopBar";
import SortingBar from "../components/SortingBar";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState("default");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [view, setView] = useState('grid'); // New state for view mode

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory.toLowerCase()
      );
    }

    filtered = filtered.filter((p) => p.price <= maxPrice);

    if (sortOrder === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [selectedCategory, maxPrice, sortOrder, allProducts]);

  if (loading) return <div className="p-10">Loading products...</div>;
  if (error) return <div className="p-10 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen  p-6">
      <TopBar category={selectedCategory} />

      <div className="text-sm text-gray-500 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="text-sm text-gray-500">
            Home /{" "}
            <span className="text-black font-medium">
              {selectedCategory[0].toUpperCase() + selectedCategory.slice(1)}
            </span>
          </div>

         <SortingBar
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
  itemsPerPage={itemsPerPage}
  setItemsPerPage={setItemsPerPage}
  view={view}
  setView={setView}
/>

        </div>
      </div>

      <div className="flex gap-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white p-4 rounded shadow-sm ">
          <h2 className="font-semibold mb-2">Categories</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            {[
              "All",
              "men's clothing",
              "women's clothing",
              "electronics",
              "jewelery",
            ].map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer ${
                  selectedCategory === cat ? "text-indigo-600 font-bold" : ""
                }`}
              >
                {cat[0].toUpperCase() + cat.slice(1)}
              </li>
            ))}
          </ul>

          <h2 className="font-semibold mt-6 mb-2">Filter by Price</h2>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm mt-2 text-gray-600">Up to ${maxPrice}</p>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm">{products.length} products</p>
           
          </div>

          <div
    className={`${
    view === 'list'
      ? 'flex flex-col gap-4'
      : view === 'grid-compact'
      ? 'grid grid-cols-2 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
  }`}
>
  {products.slice(0, itemsPerPage).map((product) => (
    <ProductCard key={product.id} product={product} view={view} />
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default Home;

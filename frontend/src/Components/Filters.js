import React, { useState } from "react";
import { Filter, X } from "lucide-react";

const FilterComponent = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleApplyFilter = () => {
    onFilter({
      category: selectedCategory,
      inStockOnly: inStockOnly,
    });
  };

  const handleReset = () => {
    setSelectedCategory("");
    setInStockOnly(false);
    onFilter({});
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters((prev) => !prev)}
        className="flex items-center bg-yellow-400 text-black px-4 py-2 border border-gray-300 rounded-lg hover:bg-yellow-500"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-bold">Filter Options</h3>
            <button onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded-lg py-2 px-3"
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Availability */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="ml-2">In Stock Only</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-500 border rounded-lg hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
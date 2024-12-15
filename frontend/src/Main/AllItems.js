import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import FilterComponent from '../Components/Filters';
import Pagination from '../Components/Pagination';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const itemsPerPage = 30; // 30 items per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=0'); // Fetch all products
        if (response.ok) {
          const data = await response.json();
          setItems(data.products);
          setFilteredItems(data.products.slice(0, itemsPerPage)); // Initial page items
        }
      } catch (error) {
        console.error("Error Fetching Products", error);
      }
    };
    fetchItems();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = items;

    // Search filtering
    if (searchTerm) {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      results = results.filter((item) => item.category === filters.category);
    }
    if (filters.inStockOnly) {
      results = results.filter((item) => item.stock > 0);
    }

    // Pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilteredItems(results.slice(start, end));
  }, [searchTerm, items, currentPage, filters]);

  // Handle Pagination
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 mt-[60px]">
        <div className="container mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-8 flex justify-between items-center">
            <div className="relative flex-grow mr-4">
              <SearchBar
                placeholder="Search products..."
                value={searchTerm}
                onSearch={(value) => {
                  setSearchTerm(value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <FilterComponent
              categories={[...new Set(items.map((item) => item.category))]}
              onFilter={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
            />
          </div>
          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">No items found.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
          />
        </div>
      </div>
    </>
  );
}

export default AllItems;
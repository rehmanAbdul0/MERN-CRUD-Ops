import React, { useEffect, useState } from 'react';
import ProductDetailsButton from '../Components/ProductDetailsButton';
import Navbar from '../Components/Navbar';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingBag, 
  Tag, 
  Box, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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

  // Search and filter functionality
  useEffect(() => {
    const results = items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [searchTerm, items, currentPage]);

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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-8 flex justify-between items-center">
            <div className="relative flex-grow mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">No items found.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold truncate">{item.title}</h2>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-5 w-5 mr-1" fill="currentColor" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-blue-500" />
                        <span>${item.price}</span>
                      </div>
                      <div className="flex items-center">
                        <Box className="h-4 w-4 mr-2 text-green-500" />
                        <span>Stock: {item.stock}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span 
                        className={`flex items-center px-2 py-1 rounded-full text-xs ${item.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                      {/* <button 
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        View Details
                      </button> */}
                      <ProductDetailsButton product={item} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllItems;
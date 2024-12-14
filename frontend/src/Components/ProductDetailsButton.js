import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetailsButton = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
    // console.log('Product ID:',product.id);
    
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleViewDetails}
        className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 text-gray-700"
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        View Details
      </button>
    </>
  );
};

export default ProductDetailsButton;
import React from "react";
import { Star, Tag, Box, CheckCircle2 } from "lucide-react";
import ProductDetailsButton from "./ProductDetailsButton";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-contain rounded-t-lg"
        />
        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold truncate">{product.title}</h2>
          <div className="flex items-center text-yellow-500">
            <Star className="h-5 w-5 mr-1" fill="currentColor" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-blue-500" />
            <span>${product.price}</span>
          </div>
          <div className="flex items-center">
            <Box className="h-4 w-4 mr-2 text-green-500" />
            <span>Stock: {product.stock}</span>
          </div>
        </div>

        {/* Stock Status and Details Button */}
        <div className="flex justify-between items-center">
          <span
            className={`flex items-center px-2 py-1 rounded-full text-xs ${
              product.stock > 0
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
          <ProductDetailsButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { Star, Box, Truck, ShieldCheck, Percent, ArrowLeft, Gift, CircleUser } from "lucide-react";
import Navbar from '../Components/Navbar';
import EditProductButton from '../Components/EditProductModal';
import DeleteProductButton from '../Components/DeleteProductButton';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data);
          setSelectedImage(data.thumbnail);
        }
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">Loading Product Details...</p>
        </div>
      </div>
    );

  const discountedPrice = (
    productDetails.price * (1 - productDetails.discountPercentage / 100)
  ).toFixed(2);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 mt-[50px]">
      <div className="container mx-auto px-4 py-8 lg:px-10 xl:px-20">
        <div className="grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Image Section */}
          <div className="relative">
            <motion.img
              src={selectedImage || productDetails.thumbnail}
              alt={productDetails.title}
              className="w-full h-[500px] object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center shadow-md">
              {/* <Percent className="w-4 h-4 mr-1" /> */}
              {productDetails.discountPercentage}% OFF
            </div>

            {/* Product Gallery Thumbnails */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-4">
              {productDetails.images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === img 
                      ? 'border-green-500' 
                      : 'border-transparent hover:border-green-300'
                  }`}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-8 space-y-6">
            {/* Category and Rating */}
            <div className="flex justify-between items-center">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase text-xs font-semibold tracking-wide">
                {productDetails.category}
              </span>
              <div className="flex items-center text-yellow-500 space-x-1">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-gray-700">
                  {productDetails.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              {productDetails.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {productDetails.description}
            </p>

            {/* Pricing Section */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-green-600">
                ${discountedPrice}
              </span>
              <span className="line-through text-gray-400 text-lg">
                ${productDetails.price}
              </span>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3">
                <Box className="text-blue-500 w-8 h-8" />
                <div>
                  <h4 className="font-semibold text-gray-700">Stock</h4>
                  <p className="text-blue-800">{productDetails.stock} units</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
                <Truck className="text-green-500 w-8 h-8" />
                <div>
                  <h4 className="font-semibold text-gray-700">Brand</h4>
                  <p className="text-green-800">{productDetails.brand}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition transform hover:scale-[1.02]">
                <ShieldCheck className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 transition transform hover:scale-[1.02]"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Back to Products</span>
              </button>
            </div>
            {/* Edit & Delete Button */}
            <div className="flex space-x-4 pt-4">
            <EditProductButton productDetails={productDetails} setProductDetails={setProductDetails} />
            <DeleteProductButton 
              productId={productDetails.id}
              productTitle={productDetails.title}
            />
            </div>
          </div>
        </div>
          {/* New Additional Section */}
        <div className="mt-5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Warranty & Protection */}
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <ShieldCheck className="mx-auto w-16 h-16 text-blue-500 mb-4" />
              <h3 className="font-bold text-xl text-gray-800 mb-2">Warranty Protection</h3>
              <p className="text-gray-600">{productDetails.warrantyInformation}</p>
              <p className="text-sm text-gray-500 mt-2">Comprehensive coverage for your product</p>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Truck className="mx-auto w-16 h-16 text-green-500 mb-4" />
              <h3 className="font-bold text-xl text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-gray-600">{productDetails.shippingInformation}</p>
              <p className="text-sm text-gray-500 mt-2">Free shipping on orders over $100</p>
            </div>

            {/* Gift Option */}
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Gift className="mx-auto w-16 h-16 text-purple-500 mb-4" />
              <h3 className="font-bold text-xl text-gray-800 mb-2">Gift Wrapping</h3>
              <p className="text-gray-600">Personal Touch</p>
              <p className="text-sm text-gray-500 mt-2">Add a special gift message</p>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-12 bg-white rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
              <div className="flex items-center text-yellow-500 space-x-1">
                <Star className="w-6 h-6 fill-current" />
                <span className="font-bold text-gray-700 text-lg">
                  {productDetails.rating.toFixed(1)} / 5
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {productDetails.reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-200 rounded-full mr-4 flex items-center justify-center">
                        <CircleUser className="w-6 h-6 text-gray-500"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 fill-current ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetailsPage;
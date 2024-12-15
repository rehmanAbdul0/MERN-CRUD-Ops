import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Edit, 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Tag, 
  ShoppingBag, 
  DollarSign, 
  Percent, 
  Box, 
  BarChart2, 
  ShieldCheck
} from 'lucide-react';

const UploadProductPage = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    stock: '',
    tags: [],
    brand: '',
    sku: '',
    weight: '',
    dimensions: {
      width: '',
      height: '',
      depth: ''
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
    minimumOrderQuantity: '',
    thumbnail: null,
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('dimensions.')) {
      const dimensionKey = name.split('.')[1];
      setProductData((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimensionKey]: value
        }
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'thumbnail') {
      setProductData((prev) => ({
        ...prev,
        thumbnail: files[0]
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag && !productData.tags.includes(newTag)) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setProductData((prev) => ({
        ...prev,
        category: newCategory
      }));
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === 'dimensions') {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === 'thumbnail') {
        if (productData[key]) {
          formData.append(key, productData[key]);
        }
      } else if (key === 'images') {
        productData[key].forEach((image) => {
          formData.append('images', image);
        });
      } else if (key === 'tags') {
        formData.append(key, productData[key].join(','));
      } else {
        formData.append(key, productData[key]);
      }
    });

    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      setSuccess('Product added successfully!');
      console.log('Product added:', result);

      setProductData({
        title: '',
        description: '',
        category: '',
        price: '',
        discountPercentage: '',
        stock: '',
        tags: [],
        brand: '',
        sku: '',
        weight: '',
        dimensions: {
          width: '',
          height: '',
          depth: ''
        },
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: '',
        returnPolicy: '',
        minimumOrderQuantity: '',
        thumbnail: null,
        images: []
      });
    } catch (err) {
      setError('Error adding product. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 mt-[50px]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center mb-8">
            <Upload className="w-10 h-10 text-blue-600 mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">Upload New Product</h1>
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center mb-2 text-gray-700">
                  <Edit className="w-5 h-5 mr-2 text-blue-500" />
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleInputChange}
                  className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label className="flex items-center mb-2 text-gray-700">
                  <ShoppingBag className="w-5 h-5 mr-2 text-green-500" />
                  Category
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={(e) => {
                    if (e.target.value === 'add-new') {
                      setIsAddingCategory(true);
                    } else {
                      setProductData((prev) => ({ ...prev, category: e.target.value }));
                      setIsAddingCategory(false);
                    }
                  }}
                  className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="add-new">+ Add New Category</option>
                </select>
                {isAddingCategory && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                      placeholder="Enter new category"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Add Category
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center mb-2 text-gray-700">
                <Edit className="w-5 h-5 mr-2 text-purple-500" />
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="w-full border-2 border-blue-100 rounded-lg p-3 h-32 focus:border-blue-500 transition"
                placeholder="Describe your product"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center mb-2 text-gray-700">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  placeholder="Product price"
                  required
                />
              </div>
              <div>
                <label className="flex items-center mb-2 text-gray-700">
                  <Percent className="w-5 h-5 mr-2 text-red-500" />
                  Discount %
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={productData.discountPercentage}
                  onChange={handleInputChange}
                  className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  placeholder="Discount percentage"
                />
              </div>
              <div>
                <label className="flex items-center mb-2 text-gray-700">
                  <Box className="w-5 h-5 mr-2 text-blue-500" />
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleInputChange}
                  className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  placeholder="Available stock"
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center mb-2 text-gray-700">
                <Tag className="w-5 h-5 mr-2 text-purple-500" />
                Product Tags
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-grow border-2 border-blue-100 rounded-l-lg p-3 focus:border-blue-500 transition"
                  placeholder="Add tags"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {productData.tags.map(tag => (
                  <div 
                    key={tag} 
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center mb-2 text-gray-700">
                <ImageIcon className="w-5 h-5 mr-2 text-green-500" />
                Product Images
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'thumbnail')}
                    className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Additional Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'images')}
                    className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center mb-2 text-gray-700">
                  <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
                  Dimensions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    name="dimensions.width"
                    value={productData.dimensions.width}
                    onChange={handleInputChange}
                    placeholder="Width"
                    className="border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  />
                  <input
                    type="number"
                    name="dimensions.height"
                    value={productData.dimensions.height}
                    onChange={handleInputChange}
                    placeholder="Height"
                    className="border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  />
                  <input
                    type="number"
                    name="dimensions.depth"
                    value={productData.dimensions.depth}
                    onChange={handleInputChange}
                    placeholder="Depth"
                    className="border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center mb-2 text-gray-700">
                  <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
                  Warranty Information
                </label>
                <input
                  type="text"
                  name="warrantyInformation"
                  value={productData.warrantyInformation}
                  onChange={handleInputChange}
                  placeholder="Warranty details"
                  className="w-full border-2 border-blue-100 rounded-lg p-3 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white px-12 py-4 rounded-full hover:bg-blue-700 transition transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                <Save className="w-6 h-6 mr-2" />
                Upload Product
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default UploadProductPage;
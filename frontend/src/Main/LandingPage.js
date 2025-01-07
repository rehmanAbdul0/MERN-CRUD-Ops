import React from 'react';
import { 
  ShoppingCart, 
  Database, 
  BarChart, 
  Edit3, 
  PlusCircle, 
  Trash2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const LandingPage = () => {
  const features = [
    {
      icon: <PlusCircle className="w-12 h-12 text-blue-500" />,
      title: "Create Products",
      description: "Easily add new products with comprehensive details and images."
    },
    {
      icon: <Database className="w-12 h-12 text-green-500" />,
      title: "Manage Inventory",
      description: "Track product quantities, availability, and store locations."
    },
    {
      icon: <Edit3 className="w-12 h-12 text-yellow-500" />,
      title: "Update Information",
      description: "Modify product details quickly and efficiently."
    },
    {
      icon: <Trash2 className="w-12 h-12 text-red-500" />,
      title: "Remove Products",
      description: "Remove discontinued or out-of-stock items with ease."
    }
  ];

  // Button component implementation
  const Button = ({ children, variant = 'default', size = 'medium', className, ...props }) => {
    const baseStyles = 'px-4 py-2 rounded-md focus:outline-none transition-all duration-300';

    const variantStyles = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
      ghost: 'text-blue-600 hover:bg-blue-200',
    };

    const sizeStyles = {
      small: 'text-sm py-1 px-3',
      medium: 'text-base py-2 px-4',
      large: 'text-lg py-3 px-6',
    };

    return (
      <button 
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} 
        {...props}
      >
        {children}
      </button>
    );
  };

  // Card component implementation
  const Card = ({ children, className }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="flex justify-center mb-4">{children}</div>
  );

  const CardContent = ({ children }) => (
    <div className="text-center">{children}</div>
  );

  const CardTitle = ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-800">{children}</h3>
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 mt-[50px]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <ShoppingCart className="w-20 h-20 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Product Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your inventory management with our comprehensive CRUD 
            operations platform. Easily create, read, update, and delete 
            product information across multiple stores.
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/products">
              <Button size="lg" className="shadow-md">
                View Products
              </Button>
            </Link>
            <Link to="/create">
              <Button variant="outline" size="lg" className="shadow-md">
                Add New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                {feature.icon}
              </CardHeader>
              <CardContent>
                <CardTitle>{feature.title}</CardTitle>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Preview */}
        <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Inventory Insights
              </h2>
              <p className="text-gray-600 mt-2">
                Get real-time analytics and reporting
              </p>
            </div>
            <BarChart className="w-16 h-16 text-purple-500" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600">200+</h3>
              <p className="text-gray-600">Total Products</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-green-600">15</h3>
              <p className="text-gray-600">Store Locations</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-red-600">5</h3>
              <p className="text-gray-600">Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
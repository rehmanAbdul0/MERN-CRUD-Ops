import React, { useState } from 'react';
import { 
  Home, 
  Plus, 
  List, 
  Menu, 
  Package // Added products icon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { 
      icon: <Home className="mr-2" />, 
      label: 'Home', 
      href: '/' 
    },
    { 
      icon: <Plus className="mr-2" />, 
      label: 'Create', 
      href: '/create' 
    },
    { 
      icon: <List className="mr-2" />, 
      label: 'Read', 
      href: '/products' 
    }
  ];

  // Custom Button component
  const Button = ({ children, className, onClick, variant = 'default', size = 'medium' }) => {
    const baseStyles = 'px-4 py-2 rounded-md focus:outline-none transition-colors';

    const variantStyles = {
      default: 'bg-gray-700 text-white hover:bg-gray-800',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
      ghost: 'text-gray-700 hover:bg-gray-200',
    };

    const sizeStyles = {
      small: 'text-sm py-1 px-3',
      medium: 'text-base py-2 px-4',
      large: 'text-lg py-3 px-6',
    };

    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      >
        {children}
      </button>
    );
  };

  // Custom Navigation Menu components
  const NavigationMenu = ({ children }) => (
    <nav className="flex space-x-4">{children}</nav>
  );

  const NavigationMenuList = ({ children }) => <div className="flex space-x-4">{children}</div>;

  const NavigationMenuItem = ({ children }) => <div>{children}</div>;

  return (
    <nav className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Products Icon */}
          <div className="flex items-center">
            <Package className="mr-2 text-white" size={34} /> {/* Products Icon */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
            >
              CRUD App
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link to={item.href}>
                      <Button 
                        variant="ghost" 
                        className="flex items-center text-white hover:bg-gray-600"
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  to={item.href}
                  className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
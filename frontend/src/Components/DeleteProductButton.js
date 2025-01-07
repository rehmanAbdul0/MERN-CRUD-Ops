import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {AlertDialog} from '../Components/UI/AlertDialog'
import {AlertDialogAction} from '../Components/UI/AlertAction'
import {AlertDialogCancel} from '../Components/UI/AlertCancel'
import {AlertDialogContent} from '../Components/UI/AlertContent'
import {AlertDialogDescription} from '../Components/UI/AlertDescription'
import {AlertDialogFooter} from '../Components/UI/AlertFooter'
import {AlertDialogHeader} from '../Components/UI/AlertHeader'
import {AlertDialogTitle} from '../Components/UI/AlertTitle'
import {AlertDialogTrigger} from '../Components/UI/AlertTrigger'
import { useNavigate } from 'react-router-dom';

const DeleteProductButton = ({ productId, productTitle }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Product deleted:', data);
        // Navigate back to products page after successful deletion
        navigate('/products');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // You could add toast notification here for error handling
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="w-full mt-4 bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDeleting}
        >
          <Trash2 className="w-5 h-5" />
          <span>{isDeleting ? 'Deleting...' : 'Delete Product'}</span>
        </button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete "{productTitle}". This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductButton;
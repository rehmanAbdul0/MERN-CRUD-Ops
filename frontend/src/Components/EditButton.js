import React from 'react';
import { Pencil } from 'lucide-react';

const EditButton = ({ productId, onClick }) => {
  return (
    <button
      className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      // style={{ backgroundColor: '#FEC001' }}
      onClick={() => onClick(productId)}
    >
      <Pencil className="w-5 h-5" />
      Edit Product
    </button>
  );
};

export default EditButton;